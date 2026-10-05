const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');
const musicMetadata = require('music-metadata');

const scenes = [
  {
    file: 'scene-01.mp3',
    text: "These are jumper wires, with red and black wires used for making circuit connections."
  },
  {
    file: 'scene-02.mp3',
    text: "This is the LED Red ePod, featuring a red LED with P and N connection terminals."
  },
  {
    file: 'scene-03.mp3',
    text: "This is the three-volt Battery ePod, powered by a coin-cell battery, with P and N terminals."
  },
  {
    file: 'scene-04.mp3',
    text: "Position the Battery ePod on the left and the LED ePod on the right, with both P terminals facing upward."
  },
  {
    file: 'scene-05.mp3',
    text: "Connect one end of the red jumper wire to the P terminal of the Battery ePod, guide the wire across, and insert the connector into the P terminal of the LED ePod."
  },
  {
    file: 'scene-06.mp3',
    text: "Both ePods are now connected, with the jumper wire firmly seated in place."
  }
];

async function run() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("en-IN-NeerjaNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const outDir = path.join(__dirname, '..', 'public', 'audio');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const s of scenes) {
    const dest = path.join(outDir, s.file);
    console.log(`Generating ${s.file}...`);
    const { audioStream } = tts.toStream(s.text, { rate: "-3%" });
    await new Promise((resolve, reject) => {
      const fileStream = fs.createWriteStream(dest);
      audioStream.pipe(fileStream);
      audioStream.on('error', reject);
      fileStream.on('finish', resolve);
      fileStream.on('error', reject);
    });
    const metadata = await musicMetadata.parseFile(dest);
    console.log(`Saved ${s.file}: duration = ${metadata.format.duration?.toFixed(2)}s`);
  }
  console.log("All narration files generated successfully!");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
