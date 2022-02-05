import { wordTypes } from "~core/util/wordTypes";

export default async function fetchFieldValues(blanks: string[]) {
  const adjustedFields = [...blanks];

  adjustedFields.forEach((blanks, i) => {
    const wordType = wordTypes[blanks];
    if (wordType) {
      adjustedFields[i] = "$" + wordType;
    } else {
      adjustedFields[i] = "*";
    }
  });

  const { phrase } = await (
    await fetch("https://words-aas.vercel.app/api/" + adjustedFields.join(" "))
  ).json();

  return phrase.split(" ").map((word: string) => {
    if (word === "*") return "";
    return word;
  });
}
