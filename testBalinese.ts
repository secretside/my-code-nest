import { toBalinese } from "./src/lib/aksaraConverter.ts";
const word = "katam";
const out = toBalinese(word);
console.log("Output:", out);
console.log(
  "Codepoints:",
  [...out].map((c) => c.codePointAt(0).toString(16).toUpperCase()).join(" "),
);
