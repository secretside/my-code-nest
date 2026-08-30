import { toBalinese, codepoints } from "./src/lib/aksaraConverter.js";

const input = "katam";
const output = toBalinese(input);
console.log("Input:", input);
console.log("Output:", output);
console.log(
  "Codepoints:",
  codepoints(output)
    .map((c) => "U+" + c.padStart(4, "0"))
    .join(" "),
);

// Also test 'kam' (ka + m with virama)
const input2 = "kam";
const output2 = toBalinese(input2);
console.log("\nInput:", input2);
console.log("Output:", output2);
console.log(
  "Codepoints:",
  codepoints(output2)
    .map((c) => "U+" + c.padStart(4, "0"))
    .join(" "),
);

// Test 'ka' (just ka)
const input3 = "ka";
const output3 = toBalinese(input3);
console.log("\nInput:", input3);
console.log("Output:", output3);
console.log(
  "Codepoints:",
  codepoints(output3)
    .map((c) => "U+" + c.padStart(4, "0"))
    .join(" "),
);
