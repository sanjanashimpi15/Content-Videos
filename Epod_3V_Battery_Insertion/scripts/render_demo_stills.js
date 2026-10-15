const path = require("path");
const fs = require("fs");
const { bundle } = require("@remotion/bundler");
const { renderStill, selectComposition } = require("@remotion/renderer");

async function main() {
  console.log("Bundling Remotion project for demo stills...");
  const entryPoint = path.resolve(__dirname, "../src/index.ts");
  const bundled = await bundle({
    entryPoint,
    webpackOverride: (config) => config,
  });
  console.log("Bundle completed:", bundled);

  const compositionId = "BlueEpodReplacementDemo";
  const composition = await selectComposition({
    serveUrl: bundled,
    id: compositionId,
  });

  console.log("Composition selected:", composition.id, `${composition.width}x${composition.height}`, `${composition.durationInFrames} frames`);

  const outDir = path.resolve(__dirname, "../renders/stills/demo");
  fs.mkdirSync(outDir, { recursive: true });

  const framesToRender = [
    { frame: 0, name: "demo_000_hover.png", desc: "Start (oblique hover)" },
    { frame: 50, name: "demo_050_approach.png", desc: "Oblique approach descent" },
    { frame: 95, name: "demo_095_tilt.png", desc: "3D perspective tilt transition" },
    { frame: 130, name: "demo_130_inserting.png", desc: "Top-down insertion into socket" },
    { frame: 180, name: "demo_180_seated.png", desc: "Seated in blue ePod socket" },
  ];

  for (const item of framesToRender) {
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

  console.log("All demo stills rendered successfully!");
}

main().catch((err) => {
  console.error("Render error:", err);
  process.exit(1);
});
