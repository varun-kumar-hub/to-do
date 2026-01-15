from PIL import Image
import os

# Target File
file_path = r"d:/to do/public/backgrounds/gyomei.png"

try:
    img = Image.open(file_path)
    print(f"Original Size: {img.size}")
    
    # Rotate 180 degrees to fix upside down
    img = img.rotate(180, expand=True)
    
    img.save(file_path)
    print(f"Rotated 180 degrees and saved to {file_path}")
    
except Exception as e:
    print(f"Error: {e}")
