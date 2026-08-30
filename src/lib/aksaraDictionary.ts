// Dictionary override layer for aksara transliteration.
//
// POLICY: an entry only belongs here if its codepoints have been individually
// verified against the Unicode character database. A wrong entry is worse than
// no entry, because it silently overrides the rule-based converter with
// confident-looking garbage.
//
// The previous dictionary (frontend/lib/aksaraDictionary.ts) contained
// cross-contaminated data and has been quarantined below rather than trusted:
//   'sunda'.makassar    = 'ᨔᨘᮔᨉᨊᮌ'  -> contains U+1B94 (SUNDANESE LETTER NA)
//                                        and U+1B8C (SUNDANESE LETTER GA)
//                                        inside a Lontara field.
//   'santoso'.makassar  = 'ᨔᮊᨈᮺᨔᮧᨚ' -> contains U+1B8A / U+1BBA / U+1BA7
//                                        (Sundanese) inside a Lontara field.
//   'santoso'.javanese  = 'ꦱꦤꦠꦺꦱꦾ'   -> ends in YA, drops the final -so.
//   'budi'.javanese     = 'ꦧꦸꦝꦶ'      -> uses DDA (ꦝ, dha) where plain DA (ꦢ) is
//                                        correct for "di".
//   'jakarta'           -> was already commented out as corrupted upstream.
// None of these are re-exported; they exist only as a record of what was wrong.

export type ScriptKey = "javanese" | "sundanese" | "makassar" | "balinese";

/**
 * Verified overrides. Empty on purpose: no entry has been independently
 * verified yet, so the rule-based converter is authoritative for every word.
 * Add entries here only with a codepoint-level check.
 */
export const aksaraDictionary: Record<string, Partial<Record<ScriptKey, string>>> = {};

/**
 * Known-bad legacy entries, kept for traceability. NEVER used at runtime.
 */
export const unverifiedLegacyEntries = [
  "budi",
  "santoso",
  "sunda",
  "jawa",
  "makassar",
  "jakarta",
] as const;

export function getConversionConfidence(
  word: string,
  script: ScriptKey,
): "verified" | "rule-based" {
  const clean = word.toLowerCase().trim();
  return aksaraDictionary[clean]?.[script] ? "verified" : "rule-based";
}

export function lookupDictionary(word: string, script: ScriptKey): string | undefined {
  return aksaraDictionary[word.toLowerCase().trim()]?.[script];
}
