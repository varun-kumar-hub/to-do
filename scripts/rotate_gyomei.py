from PIL import Image
import os

# Source and Destination
source_path = r"C:/Users/cvaru/.gemini/antigravity/brain/3a948cb1-4563-4880-8a27-31aa1faa6345/uploaded_image_0_1768485198773.png"
dest_path = r"d:/to do/public/backgrounds/gyomei.png"

try:
    img = Image.open(source_path)
    # Rotate 90 degrees clockwise to make it landscape (assuming it's a sideways portrait)
    # Or -90 (270) depending on orientation. Usually sideways phone photos need -90.
    # Let's try rotating to fit 16:9 
    
    width, height = img.size
    print(f"Original Size: {width}x{height}")
    
    if height > width:
        print("Image is Portrait. Rotating...")
        # Rotate 90 degrees (Top becomes Right)
        img = img.rotate(270, expand=True) 
    
    # Resize to standard if needed, or just save
    # Let's verify new size
    print(f"New Size: {img.size}")
    
    img.save(dest_path)
    print(f"Saved to {dest_path}")
    
except Exception as e:
    print(f"Error: {e}")
