/**
 * Latin -> Aksara transliteration (Javanese, Sundanese, Lontara/Makassar).
 *
 * CODEPOINT ORDER RULE (do not "fix" this the other way):
 * In Brahmic scripts, left-side dependent vowel signs (Javanese taling U+A9BA,
 * Sundanese panaelaeng U+1BA6, ...) are STORED AFTER the base consonant, in
 * pronunciation order. Their visual placement to the left of the consonant is
 * produced by the font's OpenType shaping engine, not by reordering the stored
 * text. See Unicode Technical Note #47 "Implementing Javanese" and The Unicode
 * Standard, South and Southeast Asian Scripts (Javanese / Sundanese blocks).
 *
 * Every codepoint below was checked against the Unicode Character Database
 * (unicodedata name lookup over U+A980..U+A9DF, U+1B80..U+1BBF, U+1A00..U+1A1F).
 */

import { lookupDictionary } from "./aksaraDictionary";
import type { ScriptKey } from "./aksaraDictionary";

export { getConversionConfidence } from "./aksaraDictionary";
export type { ScriptKey } from "./aksaraDictionary";

/**
 * Returns distinct unsupported Latin letters (a-z) found in the input for the given script.
 * A letter is considered unsupported if the script's consonant table has no single-letter entry for it.
 * For Sundanese, this always returns an empty array because its table includes f, v, z, q, x.
 */
export function getUnsupportedLetters(text: string, script: ScriptKey): string[] {
  const lower = text.toLowerCase();
  let table: ScriptTable;
  switch (script) {
    case "javanese":
      table = javanese;
      break;
    case "sundanese":
      table = sundanese;
      break;
    case "makassar":
      table = makassar;
      break;
    case "balinese":
      table = balinese;
      break;
    default:
      const _exhaustive: never = script;
      table = { consonants: {}, vowelSigns: {}, independentVowels: {}, virama: "" };
  }
  const supported = new Set<string>();
  // consonants single letters
  for (const [key] of Object.entries(table.consonants)) {
    if (key.length === 1) supported.add(key);
  }
  // vowelSigns single letters
  for (const [key] of Object.entries(table.vowelSigns)) {
    if (key.length === 1) supported.add(key);
  }
  // independentVowels single letters
  for (const [key] of Object.entries(table.independentVowels)) {
    if (key.length === 1) supported.add(key);
  }
  const unsupported = new Set<string>();
  for (const ch of lower) {
    if (/[a-z]/.test(ch) && !supported.has(ch)) {
      unsupported.add(ch);
    }
  }
  return Array.from(unsupported).sort();
}

/* ------------------------------------------------------------------ */
/* Generic syllabifier                                                 */
/* ------------------------------------------------------------------ */

interface ScriptTable {
  /** Latin consonant (or digraph) -> base letter with inherent /a/. */
  consonants: Record<string, string>;
  /** Latin vowel -> dependent vowel sign, stored AFTER the base letter. */
  vowelSigns: Record<string, string>;
  /** Word-initial / standalone vowel -> full independent syllable. */
  independentVowels: Record<string, string>;
  /** Virama-like killer appended to a consonant with no following vowel. */
  virama: string;
}

const sortedKeys = (o: Record<string, string>) =>
  Object.keys(o).sort((a, b) => b.length - a.length);

function matchAt(text: string, i: number, keys: string[]): string | null {
  for (const k of keys) if (text.startsWith(k, i)) return k;
  return null;
}

function convertWord(word: string, t: ScriptTable): string {
  const cKeys = sortedKeys(t.consonants);
  const vKeys = sortedKeys(t.vowelSigns);
  const ivKeys = sortedKeys(t.independentVowels);

  let out = "";
  let i = 0;
  while (i < word.length) {
    const c = matchAt(word, i, cKeys);
    if (c) {
      const base = t.consonants[c] as string;
      i += c.length;
      const v = matchAt(word, i, vKeys);
      if (v) {
        // [consonant, vowel-sign] — sign stored after the base letter.
        out += base + (t.vowelSigns[v] as string);
        i += v.length;
      } else if (word.startsWith("a", i)) {
        out += base; // inherent /a/, no sign
        i += 1;
      } else {
        out += base + t.virama; // dead consonant
      }
      continue;
    }

    const iv = matchAt(word, i, ivKeys);
    if (iv) {
      out += t.independentVowels[iv] as string;
      i += iv.length;
      continue;
    }

    out += word[i];
    i += 1;
  }
  return out;
}

/** Applies the converter per word while preserving all whitespace runs. */
function transliterate(
  text: string,
  script: "javanese" | "sundanese" | "makassar" | "balinese",
  t: ScriptTable,
): string {
  return text
    .toLowerCase()
    .split(/(\s+)/)
    .map((chunk) => {
      if (chunk === "" || /^\s+$/.test(chunk)) return chunk;
      return lookupDictionary(chunk, script) ?? convertWord(chunk, t);
    })
    .join("");
}

/* ------------------------------------------------------------------ */
/* Javanese (U+A980..U+A9DF)                                           */
/* ------------------------------------------------------------------ */

const JV_PANGKON = "\uA9C0"; // JAVANESE PANGKON
const JV_TALING = "\uA9BA"; // JAVANESE VOWEL SIGN TALING
const JV_TARUNG = "\uA9B4"; // JAVANESE VOWEL SIGN TARUNG
const JV_HA = "\uA9B2"; // JAVANESE LETTER HA

const javanese: ScriptTable = {
  consonants: {
    dh: "\uA99D", // DDA
    th: "\uA99B", // TTA
    ny: "\uA99A", // NYA
    ng: "\uA994", // NGA
    h: JV_HA,
    n: "\uA9A4", // NA
    c: "\uA995", // CA
    r: "\uA9AB", // RA
    k: "\uA98F", // KA
    d: "\uA9A2", // DA
    t: "\uA9A0", // TA
    s: "\uA9B1", // SA
    w: "\uA9AE", // WA
    l: "\uA9AD", // LA
    p: "\uA9A5", // PA
    j: "\uA997", // JA
    y: "\uA9AA", // YA
    m: "\uA9A9", // MA
    g: "\uA992", // GA
    b: "\uA9A7", // BA
  },
  vowelSigns: {
    i: "\uA9B6", // WULU
    u: "\uA9B8", // SUKU
    e: JV_TALING, // TALING
    o: JV_TALING + JV_TARUNG, // TALING + TARUNG
  },
  // Modern Javanese orthography reserves aksara swara (U+A984 etc.) for
  // proper nouns/loanwords; the everyday construction for a word-initial vowel
  // is the HA carrier plus the matching vowel sign. We use the HA carrier.
  independentVowels: {
    a: JV_HA,
    i: JV_HA + "\uA9B6",
    u: JV_HA + "\uA9B8",
    e: JV_HA + JV_TALING,
    o: JV_HA + JV_TALING + JV_TARUNG,
  },
  virama: JV_PANGKON,
};

export const toJavanese = (text: string): string => transliterate(text, "javanese", javanese);

/* ------------------------------------------------------------------ */
/* Sundanese (U+1B80..U+1BBF)                                          */
/* ------------------------------------------------------------------ */
/*
 * Verified rarangkén (previous mappings were wrong — see report):
 *   U+1BA4 VOWEL SIGN PANGHULU     -> i
 *   U+1BA5 VOWEL SIGN PANYUKU      -> u
 *   U+1BA6 VOWEL SIGN PANAELAENG   -> é   (left-side, stored AFTER consonant)
 *   U+1BA7 VOWEL SIGN PANOLONG     -> o
 *   U+1BA8 VOWEL SIGN PAMEPET      -> e (pepet /ə/)
 *   U+1BA9 VOWEL SIGN PANEULEUNG   -> eu
 *   U+1BAA SIGN PAMAAEH            -> vowel killer
 * Previously the code used U+1B92 (LETTER TA) for "i", U+1BAA (PAMAAEH) for
 * "u", U+1BAE (LETTER KHA) as a sign, and U+1BB5 (DIGIT FIVE) for "eu".
 */

const SU_PAMAAEH = "\u1BAA";

const sundanese: ScriptTable = {
  consonants: {
    ng: "\u1B8D",
    ny: "\u1B91",
    kh: "\u1BAE", // LETTER KHA (a letter, correct here)
    sy: "\u1BAF", // LETTER SYA
    k: "\u1B8A",
    q: "\u1B8B",
    g: "\u1B8C",
    c: "\u1B8E",
    j: "\u1B8F",
    z: "\u1B90",
    t: "\u1B92",
    d: "\u1B93",
    n: "\u1B94",
    p: "\u1B95",
    f: "\u1B96",
    v: "\u1B97",
    b: "\u1B98",
    m: "\u1B99",
    y: "\u1B9A",
    r: "\u1B9B",
    l: "\u1B9C",
    w: "\u1B9D",
    s: "\u1B9E",
    x: "\u1B9F",
    h: "\u1BA0",
  },
  vowelSigns: {
    eu: "\u1BA9", // PANEULEUNG (before single 'e' so it wins the longest match)
    i: "\u1BA4", // PANGHULU
    u: "\u1BA5", // PANYUKU
    e: "\u1BA8", // PAMEPET (ASCII "e" = pepet in Sundanese Latin orthography)
    o: "\u1BA7", // PANOLONG
  },
  independentVowels: {
    eu: "\u1B89", // LETTER EU
    a: "\u1B83", // LETTER A
    i: "\u1B84", // LETTER I
    u: "\u1B85", // LETTER U
    e: "\u1B88", // LETTER E (pepet)
    o: "\u1B87", // LETTER O
  },
  virama: SU_PAMAAEH,
};

export const toSundanese = (text: string): string => transliterate(text, "sundanese", sundanese);

/* ------------------------------------------------------------------ */
/* Lontara / Makassar (Buginese block U+1A00..U+1A1F)                  */
/* ------------------------------------------------------------------ */
/*
 * Lontara has no virama in common use: a syllable-final consonant is simply
 * not written. We therefore emit nothing for a dead consonant rather than
 * inventing a killer sign.
 */

const makassar: ScriptTable = {
  consonants: {
    ngka: "\u1A03", // LETTER NGKA
    mpa: "\u1A07", // LETTER MPA
    nra: "\u1A0B", // LETTER NRA
    nca: "\u1A0F", // LETTER NYCA
    ng: "\u1A02",
    ny: "\u1A0E",
    k: "\u1A00",
    g: "\u1A01",
    p: "\u1A04",
    b: "\u1A05",
    m: "\u1A06",
    t: "\u1A08",
    d: "\u1A09",
    n: "\u1A0A",
    c: "\u1A0C",
    j: "\u1A0D",
    y: "\u1A10",
    r: "\u1A11",
    l: "\u1A12",
    w: "\u1A13", // LETTER VA (used for /w/)
    s: "\u1A14",
    h: "\u1A16",
  },
  vowelSigns: {
    i: "\u1A17",
    u: "\u1A18",
    e: "\u1A19",
    o: "\u1A1A",
  },
  independentVowels: {
    a: "\u1A15", // LETTER A
    i: "\u1A15\u1A17",
    u: "\u1A15\u1A18",
    e: "\u1A15\u1A19",
    o: "\u1A15\u1A1A",
  },
  virama: "", // unwritten final consonant
};

/* ------------------------------------------------------------------ */
/* Balinese (U+1B00..U+1BFF)                                          */
/* ------------------------------------------------------------------ */
/*
 * Simplifications (matching the pattern of existing scripts):
 * 1. No true gantungan/stacked conjunct forms for consonant clusters — use
 *    visible adeg-adeg (virama) + the next consonant's normal glyph, the
 *    same pattern already used for Javanese pangkon. Traditional orthography
 *    uses subjoined stacking here.
 * 2. No tedung/vowel-length distinction (ā/ī/ū vs a/i/u) — Latin input is
 *    treated as always short vowels.
 * 3. Only the core 18 consonants are supported; any Latin letter without a
 *    mapping (this will include z, x, v, q, f — same situation as
 *    Javanese/Makassar) should fall through to the existing
 *    getUnsupportedLetters() mechanism.
 */

const balinese: ScriptTable = {
  consonants: {
    k: "ᬓ",
    g: "ᬕ",
    ng: "ᬗ",
    c: "ᬘ",
    j: "ᬚ",
    ny: "ᬜ",
    t: "ᬢ",
    d: "ᬤ",
    n: "ᬦ",
    p: "ᬧ",
    b: "ᬩ",
    m: "ᬫ",
    y: "ᬬ",
    r: "ᬭ",
    l: "ᬮ",
    w: "ᬯ",
    s: "ᬲ",
    h: "ᬳ",
  },
  vowelSigns: {
    i: "ᬶ", // Ulu
    u: "ᬸ", // Suku
    e: "ᬾ", // Taling
    o: "ᭀ", // Taling Tedung
  },
  independentVowels: {
    a: "ᬅ", // Akara
    i: "ᬇ", // Ikara
    u: "ᬉ", // Ukara
    e: "ᬏ", // Ekara
    o: "ᬑ", // Okara
  },
  virama: "᭄", // Adeg Adeg
};

export const toBalinese = (text: string): string => transliterate(text, "balinese", balinese);

export const toMakassar = (text: string): string => transliterate(text, "makassar", makassar);

/** Debug helper: hex codepoint dump of a string. */
export const codepoints = (s: string): string[] =>
  [...s].map((c) => (c.codePointAt(0) as number).toString(16));
