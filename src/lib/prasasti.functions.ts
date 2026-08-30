import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { anchorInscription } from "./blockchain";

// Dev-time warning if token missing
if (typeof process !== "undefined" && process.env && !process.env["SANITY_API_TOKEN"]) {
  console.warn("[dev] SANITY_API_TOKEN missing – prasasti writes will fail.");
}

export const savePrasasti = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const schema = z.object({
      name: z.string().min(1),
      message: z.string(),
      scriptType: z.string(),
    });
    return schema.parse(data);
  })
  .handler(async ({ data }) => {
    const token = process.env["SANITY_API_TOKEN"];
    if (!token) {
      console.warn("SANITY_API_TOKEN missing — prasasti not persisted.");
      throw new Error("SANITY_API_TOKEN missing");
    }

    const { createClient } = await import("@sanity/client");
    const writeClient = createClient({
      projectId: process.env["SANITY_PROJECT_ID"] || "25x1yw4c",
      dataset: process.env["SANITY_DATASET"] || "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

    // Build record for anchoring (deterministic order)
    const record = {
      name: data.name,
      scriptType: data.scriptType,
      aksara: data.message,
      timestamp: new Date().toISOString(),
    };

    // Anchor to Sepolia testnet
    const { hash: txHash, txUrl } = await anchorInscription(record);

    const result = await writeClient.create({
      _type: "prasasti",
      name: data.name,
      message: data.message,
      scriptType: data.scriptType,
      txHash,
      txUrl,
      timestamp: new Date().toISOString(),
    });

    return { saved: true as const, id: result._id, txHash, txUrl };
  });