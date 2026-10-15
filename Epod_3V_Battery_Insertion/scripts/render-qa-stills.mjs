import { execSync } from "child_process";
import * as fs from "fs";

const stills = [
  { name: "qa-01", frame: 100, desc: "empty holder (Scene 1)" },
  { name: "qa-02", frame: 302, desc: "battery alone, printed side up (Scene 2)" },
  { name: "qa-03", frame: 758, desc: "battery above holder, entering (Scene 4 start)" },
  { name: "qa-04", frame: 828, desc: "battery aligned, target ring green (Scene 4 end)" },
  { name: "qa-05", frame: 993, desc: "battery just touching rim z~1 (Scene 5)" },
  { name: "qa-06", frame: 1013, desc: "battery halfway in z~0.5 (Scene 5)" },
  { name: "qa-07", frame: 1031, desc: "battery almost seated z~0.1 (Scene 5)" },
  { name: "qa-08", frame: 1275, desc: "battery fully seated, SECURED label (Scene 6)" },
  { name: "qa-09", frame: 1540, desc: "final view matching REF-4 (Scene 7)" },
];

fs.mkdirSync("renders/stills", { recursive: true });

for (const item of stills) {
  const outPath = `renders/stills/${item.name}.png`;
  console.log(`Rendering ${item.name} (${item.desc}) at frame ${item.frame}...`);
  execSync(
    `npx remotion still Epod3VBatteryInsertion ${outPath} --frame=${item.frame} --log=warn`,
    { stdio: "inherit" }
  );
  console.log(`✓ Completed ${item.name}`);
}

console.log("\nAll 9 QA stills rendered successfully!");
