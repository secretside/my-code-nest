import { ethers } from "ethers";
import crypto from "crypto";

// Sepolia chain ID
const SEPOLIA_CHAIN_ID = 11155111;

/**
 * Reads SEPOLIA_PRIVATE_KEY and SEPOLIA_RPC_URL from environment variables.
 * Throws an error if either is missing.
 * If SEPOLIA_RPC_URL does not start with 'http', it is treated as an Infura API key
 * and the URL is constructed as `https://sepolia.infura.io/v3/${SEPOLIA_RPC_URL}`.
 */
function getSepoliaWalletProvider() {
  const privateKey = process.env['SEPOLIA_PRIVATE_KEY'];
  let rpcUrl = process.env['SEPOLIA_RPC_URL'];

  if (!privateKey) {
    throw new Error("SEPOLIA_PRIVATE_KEY is required but not set.");
  }
  if (!rpcUrl) {
    throw new Error("SEPOLIA_RPC_URL is required but not set.");
  }

  // If the RPC URL doesn't look like a URL, assume it's an Infura API key
  if (!rpcUrl.startsWith('http')) {
    rpcUrl = `https://sepolia.infura.io/v3/${rpcUrl}`;
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Optionally, we can check that the wallet is on Sepolia by getting the chain ID
  // but we'll rely on the provider being connected to Sepolia via the RPC URL.
  return { wallet, provider };
}

/**
 * Gets the Sepolia wallet address from the private key in environment variables.
 * @returns The wallet address as a string
 */
export async function getSepoliaAddress(): Promise<string> {
  const { wallet } = getSepoliaWalletProvider();
  return await wallet.getAddress();
}

/**
 * Computes a SHA-256 hash of a deterministic JSON serialization of the record.
 * The record is expected to have the following fields:
 *   name: string
 *   scriptType: string
 *   aksara: string (the converted aksara result)
 *   timestamp: string (ISO timestamp)
 * We sort the keys to ensure deterministic ordering.
 */
interface InscriptionRecord {
  name: string;
  scriptType: string;
  aksara: string;
  timestamp: string;
}

function computeContentHash(record: InscriptionRecord): string {
  // Create a sorted JSON string
  const keys = Object.keys(record) as (keyof InscriptionRecord)[];
  keys.sort();
  const sortedRecord: Record<string, string> = {};
  for (const key of keys) {
    sortedRecord[key] = record[key];
  }
  const jsonString = JSON.stringify(sortedRecord);

  // Compute SHA-256 hash
  const hashBuffer = crypto.createHash("sha256").update(jsonString, "utf8").digest();
  // Convert to hex string (0x prefixed for ethers data field)
  const hashHex = "0x" + hashBuffer.toString("hex");
  return hashHex;
}

/**
 * Anchor an inscription to Sepolia testnet.
 * @param record The record to anchor (name, scriptType, aksara, timestamp)
 * @returns An object containing the transaction hash and a Sepolia Etherscan URL
 */
export async function anchorInscription(record: InscriptionRecord): Promise<{ hash: string; txUrl: string }> {
  const { wallet } = getSepoliaWalletProvider();

  // Compute the content hash to be stored in the transaction data
  const contentHash = computeContentHash(record);

  // Prepare transaction: send 0 ETH from the wallet to itself with the content hash in data
  // Using the wallet address as the destination is fine; we are just using the transaction as a timestamp anchor.
  const tx = {
    from: wallet.address,
    to: wallet.address, // could also use a burn address like "0x0000000000000000000000000000000000000000"
    value: 0,
    data: contentHash,
  };

  // Send the transaction
  const txResponse = await wallet.sendTransaction(tx);

  // Wait for the transaction to be mined
  const receipt = await txResponse.wait();

  if (!receipt) {
    throw new Error("Transaction failed: no receipt returned");
  }

  if (!receipt.hash) {
    throw new Error("Transaction failed: no hash returned");
  }

  const txHash = receipt.hash;
  const txUrl = `https://sepolia.etherscan.io/tx/${txHash}`;

  return { hash: txHash, txUrl };
}