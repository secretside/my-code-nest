import { describe, expect, test } from "vitest";
import {
  toJavanese,
  toSundanese,
  toMakassar,
  toBalinese,
  getUnsupportedLetters,
} from "./aksaraConverter";
import { getConversionConfidence } from "./aksaraDictionary";

describe("aksaraConverter", () => {
  describe("Javanese", () => {
    test("ba", () => {
      expect(toJavanese("ba")).toBe("\u{A9A7}");
    });
    test("ke", () => {
      expect(toJavanese("ke")).toBe("\u{A98F}\u{A9BA}");
    });
    test("ko", () => {
      expect(toJavanese("ko")).toBe("\u{A98F}\u{A9BA}\u{A9B4}");
    });
    test("sate", () => {
      expect(toJavanese("sate")).toBe("\u{A9B1}\u{A9A0}\u{A9BA}");
    });
    test("wangsul", () => {
      expect(toJavanese("wangsul")).toBe(
        "\u{A9AE}\u{A994}\u{A9C0}\u{A9B1}\u{A9B8}\u{A9AD}\u{A9C0}",
      );
    });
  });

  describe("Sundanese", () => {
    test("ba", () => {
      expect(toSundanese("ba")).toBe("\u{1B98}");
    });
    test("ke", () => {
      expect(toSundanese("ke")).toBe("\u{1B8A}\u{1BA8}");
    });
    test("ko", () => {
      expect(toSundanese("ko")).toBe("\u{1B8A}\u{1BA7}");
    });
    test("sate", () => {
      expect(toSundanese("sate")).toBe("\u{1B9E}\u{1B92}\u{1BA8}");
    });
    test("wangsul", () => {
      expect(toSundanese("wangsul")).toBe(
        "\u{1B9D}\u{1B8D}\u{1BAA}\u{1B9E}\u{1BA5}\u{1B9C}\u{1BAA}",
      );
    });
  });

  describe("Makassar", () => {
    test("ba", () => {
      expect(toMakassar("ba")).toBe("\u{1A05}");
    });
    test("ke", () => {
      expect(toMakassar("ke")).toBe("\u{1A00}\u{1A19}");
    });
    test("ko", () => {
      expect(toMakassar("ko")).toBe("\u{1A00}\u{1A1A}");
    });
    test("sate", () => {
      expect(toMakassar("sate")).toBe("\u{1A14}\u{1A08}\u{1A19}");
    });
    test("wangsul", () => {
      expect(toMakassar("wangsul")).toBe("\u{1A13}\u{1A02}\u{1A14}\u{1A18}\u{1A12}");
    });
  });

  test("whitespace/multi-word preservation", () => {
    const input = "ba ke";
    const jv = toJavanese(input);
    const su = toSundanese(input);
    const mk = toMakassar(input);
    // Expect space preserved between converted words
    expect(jv).toBe("\u{A9A7} \u{A98F}\u{A9BA}");
    expect(su).toBe("\u{1B98} \u{1B8A}\u{1BA8}");
    expect(mk).toBe("\u{1A05} \u{1A00}\u{1A19}");
  });

  test("getConversionConfidence returns rule-based for unknown words", () => {
    // Assuming dictionary is empty currently
    expect(getConversionConfidence("unknownword", "javanese")).toBe("rule-based");
    expect(getConversionConfidence("ba", "javanese")).toBe("rule-based"); // if not in dict
  });

  describe("getUnsupportedLetters", () => {
    test("returns unsupported letters for Javanese", () => {
      expect(getUnsupportedLetters("zaman", "javanese")).toEqual(["z"]);
      expect(getUnsupportedLetters("fajar", "javanese")).toEqual(["f"]);
      expect(getUnsupportedLetters("xerus", "javanese")).toEqual(["x"]);
      expect(getUnsupportedLetters("qatar", "javanese")).toEqual(["q"]);
      expect(getUnsupportedLetters("vase", "javanese")).toEqual(["v"]);
      // multiple unsupported letters
      expect(getUnsupportedLetters("zxvfq", "javanese")).toEqual(["f", "q", "v", "x", "z"]);
      // no unsupported letters
      expect(getUnsupportedLetters("bakti", "javanese")).toEqual([]);
    });

    test("returns empty array for Sundanese (supports f/v/z/kh/sy)", () => {
      expect(getUnsupportedLetters("fajar", "sundanese")).toEqual([]);
      expect(getUnsupportedLetters("zaman", "sundanese")).toEqual([]);
      expect(getUnsupportedLetters("xerus", "sundanese")).toEqual([]);
      expect(getUnsupportedLetters("qatar", "sundanese")).toEqual([]);
      expect(getUnsupportedLetters("vase", "sundanese")).toEqual([]);
      expect(getUnsupportedLetters("khody", "sundanese")).toEqual([]); // kh is digraph, but k and h are supported
      expect(getUnsupportedLetters("syair", "sundanese")).toEqual([]); // sy digraph, s and y supported
    });

    test("returns unsupported letters for Makassar", () => {
      expect(getUnsupportedLetters("zaman", "makassar")).toEqual(["z"]);
      expect(getUnsupportedLetters("fajar", "makassar")).toEqual(["f"]);
      expect(getUnsupportedLetters("xerus", "makassar")).toEqual(["x"]);
      expect(getUnsupportedLetters("qatar", "makassar")).toEqual(["q"]);
      expect(getUnsupportedLetters("vase", "makassar")).toEqual(["v"]);
      expect(getUnsupportedLetters("zxvfq", "makassar")).toEqual(["f", "q", "v", "x", "z"]);
      expect(getUnsupportedLetters("bakti", "makassar")).toEqual([]);
    });
  });
});
describe("getUnsupportedLetters - Balinese", () => {
  test("returns unsupported letters for Balinese", () => {
    expect(getUnsupportedLetters("zaman", "balinese")).toEqual(["z"]);
    expect(getUnsupportedLetters("fajar", "balinese")).toEqual(["f"]);
    expect(getUnsupportedLetters("xerus", "balinese")).toEqual(["x"]);
    expect(getUnsupportedLetters("qatar", "balinese")).toEqual(["q"]);
    expect(getUnsupportedLetters("vase", "balinese")).toEqual(["v"]);
    // multiple unsupported letters
    expect(getUnsupportedLetters("zxvfq", "balinese")).toEqual(["f", "q", "v", "x", "z"]);
    // no unsupported letters
    expect(getUnsupportedLetters("bakti", "balinese")).toEqual([]);
  });
});
