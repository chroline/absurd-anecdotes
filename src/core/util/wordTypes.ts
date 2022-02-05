/**
 * Since madlibs-api provides blanks that don't directly match the format
 * supported by words-aas, `wordTypes` maps potential madlibs-api blanks to the
 * word types supported by words-aas.
 */
export const wordTypes: Record<string, string> = {
  adjective: "adjective",
  adverb: "adverb",
  animal: "animal",
  verb: "verb",
  noun: "noun",
  "verb ending in 'ing'": "gerund",
  "plural noun": "pluralNoun",
};
