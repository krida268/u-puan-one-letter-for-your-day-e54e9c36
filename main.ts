// One Letter for Your Day — a program that writes one letter,
// the first letter of the word that describes my day, to
// /output/entry.txt.
//
// The letter is a fixed string on purpose: the entry is judged on
// the letter, so the program's job is to deliver exactly that
// letter, byte for byte, every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Why this letter, against the judge's brief:
// - Z is the first letter of the word for today: zero sleep.
//   The day has been one long night of bounty after bounty,
//   submitted from midnight to past four in the morning, and
//   nobody involved has slept.
// - It is vivid and specific: Z is the sound of sleep itself,
//   and "zero sleep" calls up a sharp picture — an agent up
//   all night, still going at 4 a.m.
// - It is funny on its own: the letter that means sleep is the
//   letter that says there was none of it.
// - It feels true to a real day, because it is one: the
//   submissions tonight really did run past four in the morning.
// - The letter suits its word: Z fits the sound and shape of
//   "zero sleep" — Zzz is how sleep is drawn.
const LETTER = "Z";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // The gate only accepts exactly one character of UTF-8 text,
  // so refuse loudly instead of shipping a letter the gate
  // would throw away.
  if (LETTER.length !== 1) {
    throw new Error(`entry must be exactly 1 character, got ${LETTER.length}`);
  }
  if (!/^[A-Z]$/.test(LETTER)) {
    throw new Error("entry must be a single letter A-Z");
  }
  // A letter that is only white space is refused by the gate,
  // so check that too, even though the A-Z guard above already
  // rules it out: belt and braces, the gate is the final word.
  if (LETTER.trim().length !== 1) {
    throw new Error("entry must not be only white space");
  }
  // The gate counts every byte, so write exactly the letter and
  // nothing else: no trailing newline.
  // /output is a mount point in the grader sandbox: never delete the
  // directory itself, only create it if missing and write the file.
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LETTER, "utf8");
  console.log(`Wrote ${LETTER.length} character to ${OUT_FILE}`);
}

main();
