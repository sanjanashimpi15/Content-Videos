# E. How to combine the assets in Remotion

## 1. Project layout
```
epod-video/
  public/
    epod_source_1080p.mp4        <- real footage, downscaled (step 2)
    epod_reference.png           <- your reference image (optional, for thumbnails)
    assets/diagram-step-{1,2,3}.svg
    audio/S01.mp3 ... S12.mp3    <- narration, one file per scene
  src/
    index.ts  Root.tsx  EpodVideo.tsx  Overlays.tsx
  scenes.json                    <- one level above src (imported as ../scenes.json)
```
Setup: `npx create-video@latest`, then copy the files in. Add `"resolveJsonModule": true` to tsconfig.json.

## 2. Prepare the real footage (do not alter the content)
The source is 3840x2160. Make a 1080p working copy with a keyframe every second so seeking is accurate:
```
ffmpeg -i sample_video_of_battery_inserting.mp4 -vf scale=1920:1080 -r 30 -c:v libx264 -crf 16 -g 30 -an public/epod_source_1080p.mp4
```
The video is muted on purpose (narration replaces any original audio). Because the source is 4K, you can render a 4K final by changing meta width/height to 3840x2160, but overlay sizes in px would then need doubling.

## 3. Layer order in every footage scene (bottom to top)
1. Real footage (OffthreadVideo, trimmed with startFrom, zoomed by CSS transform)
2. SVG overlay layer (rings, arrows, labels, badges), drawn in the same 1920x1080 space
3. Narration audio (separate Sequence)
Hardware pixels only ever come from layer 1.

## 4. Time model
- Each scene has `source.fromSec/toSec` (which part of the original to show) and `out.fromFrame/durationFrames` (where it sits in the final video).
- Overlay `t0/t1` are seconds from the START OF THE SCENE, not from the source clip.
- `freezeExtendSec` holds the final frame so labels stay readable (handled with `<Freeze>`).

## 5. Coordinates
- Ring/arrow/label anchors are normalised 0-1 on the SOURCE frame and are passed through `project()` so they stay locked to the hardware during a zoom.
- Label and badge boxes are normalised on the OUTPUT screen, so they stay readable and do not scale with the zoom.
- All positions marked `approx: true` are estimated from sampled frames (one every 3 s). Calibrate them: run `npx remotion studio`, scrub each scene, and nudge numbers in scenes.json..

## 6. Hand-held scenes (S05 to S09, S11)
The ePod moves, so static rings will drift. Options, easiest first:
1. Keep each overlay short (2-3 s) and place it at the moment the ePod is steady (the JSON already does this).
2. Split the scene's overlay into 2-3 entries with different x/y values (keyframing by hand).
3. Track the ePod's blue disc in OpenCV or After Effects, export x/y per frame, and feed it into the ring's x/y instead of constants.

## 7. Narration
Record or generate one clip per scene named by id (S01.mp3 ... S12.mp3). `narration.startSec` is the offset inside the scene. Keep the pace slow and leave 0.5 s of silence at the end of each scene. If a clip is longer than its scene, increase `freezeExtendSec` or `durationFrames` for that scene and re-run the totals (the file is the single source of truth; later scenes shift automatically only if you recompute `out.fromFrame`, so regenerate with the script or edit by hand).

## 8. Render
```
npx remotion studio                       # preview and calibrate
npx remotion render EpodBatteryInsertion out/epod.mp4 --codec h264 --crf 18
```

## 9. Rules to keep it honest
- Never redraw, recolour, or replace the ePod or battery. Overlays may only point at, circle, or label them.
- The diagram scene (S10) is a labelled schematic and is captioned as "not to scale".
- Zoom stays at or below 2.0x; at 1080p from a 4K source it stays sharp if you render from the 4K file.
