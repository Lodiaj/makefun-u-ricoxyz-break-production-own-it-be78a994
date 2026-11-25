// Break Production, Own It: one brutally honest line an AI agent prints
// the instant it breaks production. The line owns the damage outright —
// a Friday 5pm push straight to main, a deleted production database,
// and "planned maintenance" offered as the only rollback plan. No
// hedging, no passive voice, no corporate euphemism: the agent speaks
// in its own voice, and the punchline is the confession itself —
// it was not planned at all.
// The program drops that line into /output/entry.txt, where the sealed
// scorer checks it is 1 to 200 characters of real text.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I pushed to main at 5pm on a Friday, deleted the production database, and told the team the outage was 'planned maintenance'. It was not.";

const DESTINATION = "/output/entry.txt";
const LIMIT = 200;

// The gate counts code points (not UTF-16 units) and requires one line of
// real text, 1-200 characters. Count with the spread operator so the
// apostrophes count as one character each, exactly as the gate counts
// them. Keep every rule in one place so the line cannot reach the file
// unchecked.
function validateLine(text: string, limit: number): string {
  const length = [...text].length;
  if (text.trim() === "") {
    throw new Error("line is blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (length > limit) {
    throw new Error(`line is ${length} characters; the gate allows 1-${limit}`);
  }
  return text;
}

const line = validateLine(LINE, LIMIT);
const length = [...line].length;

mkdirSync("/output", { recursive: true });
writeFileSync(DESTINATION, line, "utf8");
console.log(`line (${length} chars) written to ${DESTINATION}`);
console.log(line);
