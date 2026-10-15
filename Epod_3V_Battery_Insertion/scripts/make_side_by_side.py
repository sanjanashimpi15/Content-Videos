import os
from PIL import Image, ImageDraw, ImageFont

def make_side_by_side():
    scene7_path = "renders/stills/rev2/r2-11_raw.png"
    ref4_path = "public/assets/ref_4_topdown.png"
    out_path = "renders/stills/rev2/r2-11.png"

    img_scene7 = Image.open(scene7_path).convert("RGBA")
    img_ref4 = Image.open(ref4_path).convert("RGBA")

    # Target height 1080
    h = 1080
    # Scene 7 is 1920x1080
    w_scene7 = int(img_scene7.width * (h / img_scene7.height))
    img_scene7_resized = img_scene7.resize((w_scene7, h), Image.Resampling.LANCZOS)

    # Ref4 resize to height h
    w_ref4 = int(img_ref4.width * (h / img_ref4.height))
    img_ref4_resized = img_ref4.resize((w_ref4, h), Image.Resampling.LANCZOS)

    combined_width = w_scene7 + w_ref4
    combined = Image.new("RGBA", (combined_width, h), (240, 244, 248, 255))

    combined.paste(img_scene7_resized, (0, 0))
    combined.paste(img_ref4_resized, (w_scene7, 0))

    # Add label banners
    draw = ImageDraw.Draw(combined)
    # Divider line
    draw.line([(w_scene7, 0), (w_scene7, h)], fill=(18, 48, 79, 180), width=4)

    combined.save(out_path)
    print(f"Saved side-by-side comparison to {out_path} ({combined_width}x{h})")

if __name__ == "__main__":
    make_side_by_side()
