# Asset Preparation Notes: Epod_3V_Battery_Insertion

## Sources
1. **REF-3 Hero Plate (Oblique Perspective)**:
   - Extracted from original high-resolution photographic plate (`image25.png`, 839x563 px, RGBA).
   - Features the green battery ePod V1 with empty holder, dual spring contacts, terminal housing, and the Duracell CR 2032 3V coin cell floating above with a downward guide arrow.
2. **REF-4 Final Seated Match (Top-Down Plate)**:
   - Extracted from `image26.png` and `battery-epod.png` (449x700 px, RGBA).
   - Shows the battery fully inserted, oriented horizontally with P on the left and N on the right.

## Processed Assets in `public/assets/`
1. `ref_3_hero.png`:
   - Original oblique reference plate showing floating battery and arrow.
2. `ref_4_topdown.png`:
   - Original top-down reference plate.
3. `epod_body_oblique.png` (1240x566 px):
   - PCB + connectors + labels ("P", "N", "BATTERY", "ePod v1", "EMISO", mascot) + empty holder interior (dual contact prongs, floor markings, walls).
   - The floating battery and downward arrow were cropped out.
   - Background keyed out to clean alpha (0% white halo).
   - Upscaled 2x using Lanczos resampling for sub-pixel sharpness on 1080p canvas.
4. `battery_top_face.png` (480x390 px):
   - Cropped directly from REF-3 floating coin cell.
   - Preserves exact authentic Duracell text (`+`, `CR 2032`, `DURACELL`, `CHHOTA POWER`, `MADE IN CHINA 3V`, child safety icon) and metallic surface reflection.
   - Clean transparent alpha around the perimeter.
   - Upscaled 2x via Lanczos.
5. `battery_top_face_circle.png` (520x520 px):
   - Circular top-down crop from REF-4 for orthogonal and top-down views.
6. `holder_front_wall_mask.png` (1240x566 px):
   - The front/lower curved lip of the black battery holder that renders in front of the battery's lower edge when seated.
7. `holder_back_wall.png` (1240x566 px):
   - The rear wall and notched "ears" of the holder, rendered behind the battery.
8. `locking_strip.png` (1240x566 px):
   - Isolated black terminal housing and metal contact strip at the P-side (left) of the holder for highlight emphasis in Scene 6.
9. `epod_body_topdown_inserted.png` (1400x898 px):
   - Rotated 90° CCW so P is at left and N is at right, with clean alpha, matching REF-4 final composition.
