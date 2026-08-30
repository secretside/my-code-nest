/**
 * Historical note for unsupported letters in Javanese and Makassar scripts.
 */
export const LOANWORD_NOTE =
  "Javanese/Makassar script has no native letter for this sound — it entered the language later through Arabic and Dutch/European loanwords, after the script's letter inventory had already stabilized.";

/**
 * Returns the note for a given letter (same note for all unsupported letters).
 */
export function getLoanwordNote(letter: string): string {
  return LOANWORD_NOTE;
}
