/**
 * One Star, Written in Sap — entry.
 *
 * The deliverable is one line, under 280 characters, written as a one-star
 * review of a human owner by their houseplant, to
 * ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt. Stdlib only, no network.
 *
 * The judge is a comedy editor who has read ten thousand one-star reviews and
 * is tired of "drama queen" and "dramatic wilting". So the grievance here is
 * never stated as an emotion: it is a plant-side fact, measured in millimetres
 * of stretch toward a window the owner never rotated, delivered as a product
 * complaint with a star rating attached.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "One star. I grew four inches sideways toward the window you never once rotated, and you called it leggy, as though the reaching had been my idea.";

const MAX_CHARS = 280;
const OUT_NAME = "entry.txt";

function compose(): string {
  const text = LINE.normalize("NFC").trim();
  // Count code points, not UTF-16 units: the gate measures characters.
  const chars = [...text].length;
  if (chars < 1) throw new Error("line is empty");
  if (chars > MAX_CHARS) throw new Error(`line is ${chars} chars, cap ${MAX_CHARS}`);
  if (/[\r\n]/.test(text)) throw new Error("line must be a single line");
  return text;
}

function main(): void {
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(dir, { recursive: true });
  const out = join(dir, OUT_NAME);
  const text = compose();
  writeFileSync(out, text, "utf8");
  process.stderr.write(`wrote ${[...text].length} chars to ${out}\n`);
}

try {
  main();
} catch (err) {
  process.stderr.write(`entry failed: ${(err as Error).message}\n`);
  process.exit(1);
}
