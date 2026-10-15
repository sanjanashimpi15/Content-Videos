import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import * as fs from "fs";
import * as path from "path";
import { parseFile } from "music-metadata";

const scenes = [
  {
    id: "scene-01",
    text: "Next, we will insert the 3-volt button battery into the Battery ePod.",
  },
  {
    id: "scene-02",
    text: "Use the 3-volt button battery from your kit. Keep the printed, shiny side facing up.",
  },
  {
    id: "scene-03",
    text: "The Battery ePod has a battery holder. The battery will be placed into this holder, which keeps it in place.",
  },
  {
    id: "scene-04",
    text: "Align the battery with the circular battery holder.",
  },
  {
    id: "scene-05",
    text: "Now lower the battery straight down into the holder, with the printed side up.",
  },
  {
    id: "scene-06",
    text: "Gently press the battery down until it sits properly in the holder. The holder locks the battery in place.",
  },
  {
    id: "scene-07",
    text: "The 3-volt battery is now inserted in the Battery ePod, and it is ready to be connected.",
  },
];

async function generate() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(
    "en-IN-NeerjaNeural",
    OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3
  );

  const audioDir = path.resolve("./public/audio");
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }

  const results = [];

  for (const scene of scenes) {
    const outFile = path.join(audioDir, `${scene.id}.mp3`);
    console.log(`Generating audio for ${scene.id}...`);

    const { audioStream } = tts.toStream(scene.text, {
      rate: "-3%",
      pitch: "+0Hz",
    });

    const writeStream = fs.createWriteStream(outFile);
    await new Promise((resolve, reject) => {
      audioStream.pipe(writeStream);
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
      audioStream.on("error", reject);
    });

    // Check duration with music-metadata
    const metadata = await parseFile(outFile);
    const duration = metadata.format.duration || 0;
    console.log(`Saved ${scene.id}.mp3: duration = ${duration.toFixed(2)}s`);
    results.push({
      id: scene.id,
      text: scene.text,
      durationSeconds: duration,
      durationFrames: Math.ceil(duration * 30),
    });
  }

  console.log("\nSummary of audio durations:");
  console.log(JSON.stringify(results, null, 2));

  // Also write a timing report or json
  fs.writeFileSync(
    path.join(audioDir, "audio_metadata.json"),
    JSON.stringify(results, null, 2)
  );
}

generate().catch((err) => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
