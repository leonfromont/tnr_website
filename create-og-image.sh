#!/bin/bash

# Script to create Open Graph image at optimal 1200x630px dimensions
# This resizes to fit within the dimensions and adds padding (no cropping)

INPUT_IMAGE="images/hero-home.jpg"
OUTPUT_IMAGE="images/og-image.jpg"
TARGET_WIDTH=1200
TARGET_HEIGHT=630

echo "Creating Open Graph image..."
echo "Input: $INPUT_IMAGE"
echo "Output: $OUTPUT_IMAGE"
echo "Target dimensions: ${TARGET_WIDTH}x${TARGET_HEIGHT}px"

# Use ImageMagick to resize to fit within dimensions and add background padding
# -resize with > only shrinks if larger, maintaining aspect ratio
# -background sets the padding color (white or your brand color)
# -gravity center centers the image
# -extent adds padding to reach target dimensions
convert "$INPUT_IMAGE" \
    -resize "${TARGET_WIDTH}x${TARGET_HEIGHT}" \
    -background "#F5F1ED" \
    -gravity center \
    -extent "${TARGET_WIDTH}x${TARGET_HEIGHT}" \
    -quality 85 \
    "$OUTPUT_IMAGE"

if [ $? -eq 0 ]; then
    echo "✓ Successfully created $OUTPUT_IMAGE"
    echo ""
    echo "Image details:"
    identify "$OUTPUT_IMAGE"
    echo ""
    echo "File size: $(du -h "$OUTPUT_IMAGE" | cut -f1)"
    echo ""
    echo "Next steps:"
    echo "1. Review the image to ensure the crop looks good"
    echo "2. Update your HTML meta tags to use: $OUTPUT_IMAGE"
else
    echo "✗ Error creating image"
    exit 1
fi
