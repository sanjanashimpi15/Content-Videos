const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const fs = require('fs');
const path = require('path');
const musicMetadata = require('music-metadata');

const scenes = [
  {
    id: 'scene-01',
    file: 'scene-01.mp3',
    text: 'First, we have the DC motor. The propeller will be fitted onto the shaft of the motor.'
  },
  {
    id: 'scene-02',
    file: 'scene-02.mp3',
    text: 'Next, take the blue propeller and identify the opening at its center.'
  },
  {
    id: 'scene-03',
    file: 'scene-03.mp3',
    text: 'Align the center of the propeller with the shaft of the DC motor.'
  },
  {
    id: 'scene-04',
    file: 'scene-04.mp3',
    text: 'Carefully slide the center hub of the propeller onto the motor shaft until it is firmly in place.'
  },
  {
    id: 'scene-05',
    file: 'scene-05.mp3',
    text: 'The propeller is now fitted onto the DC motor shaft.'
  }
];

async function run() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("en-IN-NeerjaNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const outDir = path.join(__dirname, '..', 'public', 'audio');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const timings = {};

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
    const duration = metadata.format.duration || 4.0;
    const durationInFrames = Math.ceil(duration * 30);
    console.log(`Saved ${s.file}: duration = ${duration.toFixed(2)}s (${durationInFrames} frames)`);

    timings[s.id] = {
      file: s.file,
      text: s.text,
      durationSeconds: duration,
      durationInFrames: durationInFrames
    };
  }

  const timingsFile = path.join(outDir, 'timings.json');
  fs.writeFileSync(timingsFile, JSON.stringify(timings, null, 2));
  console.log(`Timings written to ${timingsFile}`);
  console.log("All narration files generated successfully!");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
