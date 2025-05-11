# Image Assets for Radina's Foodcorner

This directory contains all the images used in the website. Please follow these guidelines for image management:

## Required Images

### Restaurant Images
1. `restaurant-main.jpg` (600x400px)
   - Main restaurant image used in the header card
   - Should show the restaurant's interior or exterior
   - Recommended: well-lit, warm ambiance

2. `interior.jpg` (300x200px)
   - Restaurant interior image for gallery
   - Should show dining area
   - Recommended: warm lighting, inviting atmosphere

### Menu Category Images
1. `burger.jpg` (800x200px)
   - Header image for Burgers category
   - Should showcase signature burger
   - Also used in gallery (300x200px)

2. `drink.jpg` (800x200px)
   - Header image for Drinks category
   - Should showcase signature beverages
   - Also used in gallery (300x200px)

3. `sides.jpg` (800x200px)
   - Header image for Sides category
   - Should showcase popular side dishes
   - Recommended: variety of sides in composition

4. `desserts.jpg` (800x200px)
   - Header image for Desserts category
   - Should showcase signature desserts
   - Recommended: appetizing close-up of popular dessert

## Image Guidelines

- All images should be optimized for web (compressed without visible quality loss)
- Use JPG format for photographs
- Maintain aspect ratios as specified
- Maximum file size: 500KB per image
- Minimum resolution: as specified above
- Use descriptive file names in lowercase with hyphens

## Image Placement

These images are used in the following locations:
- Restaurant main image: Top of the left column
- Category images: Header of each menu section
- Gallery images: Three-image gallery in the right column (drink, burger, interior)

## Data Structure

Images are referenced in the menu data file (`src/data/menu.json`) under:
- `restaurantImages.main`: Main restaurant image
- `restaurantImages.interior`: Interior gallery image
- `categories.[category].image`: Category header images 