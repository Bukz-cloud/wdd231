# Local Attractions Grid - Responsive Web Project

## Project Overview
This project displays 8 local attractions in a responsive grid layout using **named CSS Grid areas** to create distinct layouts for different screen sizes.

## 📁 Project Structure
```
project/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styling with responsive grid layouts
├── js/
│   └── script.js          # JavaScript module for dynamic card generation
├── data/
│   └── attractions.mjs    # JSON data exported as ES6 module
├── images/                # WebP images (300px × 200px)
│   ├── heritage-museum.webp
│   ├── riverside-park.webp
│   ├── art-gallery.webp
│   ├── farmers-market.webp
│   ├── historic-theater.webp
│   ├── botanical-gardens.webp
│   ├── science-center.webp
│   └── lakefront-pier.webp
└── README.md
```

## 🎯 Key Features

### 1. Semantic HTML Structure
Each card uses proper semantic HTML5 elements:
- `<article>` for card container
- `<h2>` for attraction title
- `<figure>` for image with proper sizing
- `<address>` for location
- `<p>` for description
- `<button>` with accessibility attributes

### 2. ES6 Module System
- Data stored in `.mjs` file with `export` statement
- JavaScript imports data using `import` statement
- Script loaded with `type="module"` in HTML

### 3. Named Grid Areas - Three Distinct Layouts

#### Small Screens (320px - 640px)
- **Layout**: Single column, vertical stack
- **Grid Areas**: Simple vertical flow
- **Behavior**: Each card displayed one per row
```css
grid-template-areas:
    "card1"
    "card2"
    "card3"
    ...
```

#### Medium Screens (641px - 1024px)
- **Layout**: Asymmetric 2-column layout
- **Grid Areas**: Some cards span 2 columns
- **Behavior**: Cards 1 and 6 are feature cards spanning full width
```css
grid-template-areas:
    "card1 card1"    /* Spans both columns */
    "card2 card3"    /* Side by side */
    "card4 card5"
    "card6 card6"    /* Spans both columns */
    "card7 card8";
```

#### Large Screens (1025px+)
- **Layout**: Magazine-style 4-column grid
- **Grid Areas**: Complex asymmetric layout
- **Behavior**: Cards of different sizes creating visual hierarchy
```css
grid-template-areas:
    "card1 card1 card2 card3"
    "card1 card1 card4 card4"
    "card5 card6 card4 card4"
    "card7 card7 card8 card8";
```

### 4. Image Optimization
- **Format**: WebP for modern browsers
- **Dimensions**: 300px × 200px
- **Loading**: Lazy loading enabled
- **Performance**: Optimized file sizes

## 🚀 Setup Instructions

### Step 1: Prepare Your Images
1. Find or take 8 photos of local attractions
2. Resize them to exactly 300px wide × 200px tall
3. Convert to WebP format
4. Name them descriptively
5. Place in the `images/` folder

**Using Online Tools:**
- Visit [squoosh.app](https://squoosh.app) or [cloudconvert.com](https://cloudconvert.com)
- Upload your image
- Resize to 300 × 200
- Convert to WebP
- Download and save

### Step 2: Customize the Data
1. Open `data/attractions.mjs`
2. Replace the sample data with your local attractions
3. Update names, addresses, and descriptions
4. Match image filenames to your actual images

### Step 3: Set Up the Project
1. Create the folder structure shown above
2. Place all files in their respective folders
3. Ensure images are in the `images/` folder
4. Open `index.html` in a modern web browser

### Step 4: Test Responsiveness
1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test these widths:
   - 320px (mobile)
   - 640px (large mobile/small tablet)
   - 768px (tablet)
   - 1024px (small desktop)
   - 1440px (large desktop)

## 🎨 Customization Guide

### Changing Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --secondary-color: #3b82f6;    /* Hover/accent color */
    --text-dark: #1f2937;          /* Primary text */
    --text-light: #6b7280;         /* Secondary text */
}
```

### Modifying Grid Layouts
Each breakpoint has its own `grid-template-areas`. You can rearrange cards by changing the area names:

```css
/* Example: Put card 8 first on medium screens */
grid-template-areas:
    "card8 card8"
    "card1 card1"
    "card2 card3"
    ...
```

### Adding More Attractions
1. Add new object to `attractions.mjs` array
2. Add corresponding image to `images/` folder
3. Update grid-template-areas to accommodate new card
4. Assign the card to a grid area in CSS

## 🔧 Technical Details

### Browser Compatibility
- **Grid Support**: All modern browsers (95%+ global support)
- **ES6 Modules**: Chrome 61+, Firefox 60+, Safari 11+, Edge 16+
- **WebP Images**: Chrome 32+, Firefox 65+, Safari 14+, Edge 18+

### Performance Optimizations
- Lazy loading images
- CSS transitions for smooth interactions
- Minimal JavaScript execution
- Efficient grid rendering

### Accessibility Features
- Semantic HTML structure
- ARIA labels on buttons
- Keyboard navigation support
- Reduced motion media query
- Sufficient color contrast
- Focus indicators

## 📱 Responsive Breakpoints Explained

| Screen Size | Width Range | Columns | Layout Style |
|------------|-------------|---------|--------------|
| Small | 320-640px | 1 | Vertical stack |
| Medium | 641-1024px | 2 | Asymmetric features |
| Large | 1025px+ | 4 | Magazine layout |

## 🐛 Troubleshooting

### Images Not Displaying
- Check image paths match filenames exactly
- Ensure images are in `images/` folder
- Verify WebP format is supported in your browser
- Check browser console for 404 errors

### Module Import Errors
- Ensure script has `type="module"` attribute
- Check file extension is `.mjs`
- Verify export statement exists in data file
- Run from a web server (not file://)

### Grid Layout Issues
- Check CSS is properly linked
- Verify grid-template-areas spelling
- Ensure all cards are assigned to areas
- Test in different browser widths

## 📚 Learning Resources

### CSS Grid
- [MDN: CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

### ES6 Modules
- [MDN: JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

### WebP Images
- [Google: WebP Image Format](https://developers.google.com/speed/webp)

## 📄 License
This project is provided as an educational example. Feel free to use and modify for your own projects.

## ✨ Credits
Created as a demonstration of modern web development techniques including:
- CSS Grid with named areas
- ES6 modules
- Responsive design
- Semantic HTML
- WebP image optimization
