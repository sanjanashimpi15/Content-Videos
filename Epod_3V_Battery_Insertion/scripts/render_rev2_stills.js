const path = require("path");
const { bundle } = require("@remotion/bundler");
const { renderStill, selectComposition } = require("@remotion/renderer");

async function main() {
  console.log("Bundling Remotion project...");
  const entryPoint = path.resolve(__dirname, "../src/index.ts");
  const bundled = await bundle(entryPoint);
  console.log("Bundle completed:", bundled);

  const compositionId = "Epod3VBatteryInsertion";
  const composition = await selectComposition({
    serveUrl: bundled,
    id: compositionId,
  });

  const stills = [
    { name: "r2-02.png", frame: 798, desc: "Scene 4 aligned, overlay OFF" },
    { name: "r2-03.png", frame: 967, desc: "End of 5B (closest oblique approach)" },
    { name: "r2-04.png", frame: 977, desc: "5C early (t ~ 0.25)" },
    { name: "r2-05.png", frame: 985, desc: "5C mid (t ~ 0.5, blur peak)" },
    { name: "r2-06.png", frame: 996, desc: "5C late (t ~ 0.85)" },
    { name: "r2-07.png", frame: 1003, desc: "5D start (top-down, scale 1.12)" },
    { name: "r2-08.png", frame: 1023, desc: "5D mid (scale ~ 1.05)" },
    { name: "r2-09.png", frame: 1078, desc: "5D end (scale ~ 1.00, seated)" },
    { name: "r2-10.png", frame: 1270, desc: "Scene 6 SECURED" },
    { name: "r2-11_raw.png", frame: 1626, desc: "Scene 7 final frame" },
  ];

  const outDir = path.resolve(__dirname, "../renders/stills/rev2");

  for (const item of stills) {
    const outPath = path.join(outDir, item.name);
    console.log(`Rendering [${item.name}] at frame ${item.frame} (${item.desc})...`);
    await renderStill({
      composition,
      serveUrl: bundled,
      output: outPath,
      frame: item.frame,
    });
    console.log(`Saved ${outPath}`);
  }

  console.log("All stills rendered successfully!");
}

main().catch((err) => {
  console.error("Render failed:", err);
  process.exit(1);
});
