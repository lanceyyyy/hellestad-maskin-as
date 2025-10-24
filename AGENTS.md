# Modern Website Development Requirements

## Project Overview

So this project has default lovable presets. You can redo it from scratch. Make it a modern, professional website with custom styling, smooth animations, and responsive design. The site should have a contemporary feel without looking like an AI-generated template, focusing on clean typography, strategic use of color, and engaging user interactions.

## Design System

### Color Palette

**Primary Accent Color**: Use ONE accent color throughout the entire site

- Apply consistently to buttons, links, highlights, and interactive elements
- Maintain proper contrast ratios for accessibility
- Use different opacity levels (10%, 20%, 50%, etc.) for backgrounds and subtle elements
- All buttons must have sufficient contrast (no white text on white buttons).
- Fix button hover states to be visually clear and accessible (no broken or unreadable states).

### Typography System

- **Primary Font**: Modern sans-serif for headings and body text
- **Font Weights**: Light (300), Regular (400), Medium (500), Semi-Bold (600), Bold (700)
- **Font Sizes**: Implement a consistent typographic scale
  - H1: 3.5rem (mobile: 2.5rem)
  - H2: 2.5rem (mobile: 2rem)
  - H3: 2rem (mobile: 1.75rem)
  - H4: 1.5rem (mobile: 1.25rem)
  - Body: 1rem
  - Small: 0.875rem
- **Line Heights**: 1.6 for body text, 1.2-1.4 for headings
- **Letter Spacing**: Subtle spacing for headings (-0.02em to 0.02em)

### Custom Scrollbar

Implement a custom scrollbar design:

- Width: 8px
- Track: Light gray background
- Thumb: Accent color with rounded edges
- Hover state: Slightly darker accent color
- Smooth scrolling behavior

## Header & Navigation

### Topbar Integration

**Transparent Integration**: Topbar and navigation bar should be transparent when at the top of the page.

- When header/topbar is transparent, hero section and banner sections on other pages must be moved higher to visually align with the transparent header (no gap or overlap). Adjust positioning so content sits correctly beneath the header/topbar.
- Fix transition bug: When scrolling up and header/topbar transitions to transparent, do not show a frame of the top and bottom border of the header.
  **Background Transition**: Smooth transition to solid background when scrolling down
  **Logo**: Use `logo.png` for both header and footer
  **Contact Info**: Display phone number and email in topbar

### Navigation Behavior

- **Centering**: Center navigation items, ignore company text/logo positioning
- **Mobile Topbar**: Show only phone number and email on mobile devices
- **Transparency**: Maintain transparency over hero sections and page banners. Ensure hero and banners are positioned higher to account for transparent header/topbar.

### Mobile Navigation

- **Hamburger Menu**: Fix dropdown functionality when on transparent background
- **Smooth Transitions**: Implement slide-in/fade-in animations for mobile menu
- **Overlay**: Semi-transparent overlay when menu is open

## Hero Section

### Image Management

**Transitioning Images**: Implement smooth transitions between hero images

- Images: `public/hero1.jpg`, `public/hero2.jpg`, `public/hero3.jpg`
- If images are not found in public directory, use inline SVG placeholders with brand colors (muted background, primary accent). DO NOT use external images from Unsplash or other sources.
- No page indicators/dots
- Automatic transition every 5-7 seconds
- Smooth fade or slide transitions
- Pause on hover (optional)
  **Dark Filter**: All hero section background images must have a dark filter overlay (no other color overlays) to ensure text readability and visual consistency.

### Layout Adjustments

- **Positioning**: Adjust hero content positioning to account for transparent header
- **Content Overlay**: Ensure text remains readable over all hero images
- **Remove Elements**: Remove mouse scroll icon from hero section

### Responsive Design

- **Mobile Optimization**: Ensure hero looks great on all screen sizes
- **Image Optimization**: Proper aspect ratios and loading optimization

## Page Structure

### Homepage

- **Hero Section**: Full-screen with transitioning images
- **Transparent Header**: Integrate with hero section
- **Content Sections**: Maintain existing layout with enhanced animations

### Other Pages (Non-Homepage)

- **Banner Image**: 50% screen height banner for each page
- **Placeholder SVG**: Use inline SVG placeholders with brand colors until specific images are provided
- If specified banner images are not found, use inline SVG placeholders (DO NOT use external images from Unsplash or other sources)
- **Transparent Header**: Same transparency behavior as homepage
- **Page-Specific Content**: Maintain current content structure

## Animations & Interactions

### Animation Types

Implement these animation types throughout all pages:

#### Text Reveal Animations

- **Fade Up**: Text slides up from bottom with fade-in
- **Split Text**: Letters/words animate in sequentially
- **Typewriter Effect**: For specific callout text
- **Stagger Animation**: Multiple text elements animate with slight delays

#### Card Reveal Animations

- **Fade In**: Cards fade in with slight upward movement
- **Scale In**: Cards scale from 0.9 to 1.0 while fading in
- **Slide In**: Cards slide in from left/right alternately
- **Rotate In**: Subtle rotation effect combined with fade

#### Image Reveal Animations

- **Mask Reveal**: Images reveal through animated masks
- **Parallax Effect**: Background images move at different speeds
- **Zoom Effect**: Subtle zoom on hover
- **Clip Path**: Creative clip-path reveals

### Scroll-Based Triggers

- **Intersection Observer**: Use for performance-optimized scroll triggers
- **Threshold**: Trigger animations when 20% of element is visible
- **Once**: Animations should play once unless user scrolls back up significantly
- **Stagger**: Related elements should animate with 100-200ms delays

### Gallery Interactions

- **Navigation Buttons**: Previous/next buttons with smooth animations
- **Thumbnail Animation**: Implement smooth transitions for thumbnail changes
- **Image Transitions**: Fade or slide transitions between gallery images
- **Loading States**: Smooth loading animations for images

### Shadows & Glow

- Remove glow effects from all sections. Minimalist, clean shadows are allowed for cards and sections, but must be subtle and not visually distracting.

## Specific Sections

### About Section (Om Oss)

- **Image**: Use `omoss.jpg` for the about section image
- If `omoss.jpg` is not found, use an inline SVG placeholder with brand colors (DO NOT use external images)
- **Layout**: Maintain current layout with enhanced animations
- **Content**: Keep existing content with improved typography

### Contact Section

- **Map Position**: Map should only be present on the contact page, sitting on top of the footer.
- **Map Width**: Make map full width
- **Integration**: Ensure smooth visual flow between contact section and footer

### Footer

- **Logo**: Use `logo.png` in footer (with inline SVG placeholder if not found - use company initials in a circle)
- **Contact Information**: Maintain accessibility and usability
- **Social Links**: Include smooth hover animations

## Technical Requirements

### Image Fallback System

- **Error Handling**: Implement robust image loading with inline SVG placeholder fallbacks
- **Placeholder Pattern**: Use inline SVG with brand colors (muted background: hsl(210, 24%, 94%), primary accent at 15% opacity, centered text in muted-foreground color)
- **NO External Images**: DO NOT use Unsplash, placeholder.com, or any external image services as fallbacks
- **Loading States**: Show loading animations while checking for image availability
- **Graceful Degradation**: Ensure layout remains intact with SVG placeholders
- **SVG Structure**: Create reusable SVG placeholder component with configurable width, height, and text label

### Performance

- **Lazy Loading**: Implement for images and heavy content
- **Animation Performance**: Use CSS transforms and opacity for smooth 60fps animations
- **Image Optimization**: Proper compression and format selection
- **Critical CSS**: Inline critical styles for above-the-fold content

### Multi-Page Application (MPA)

- **Scroll-to-Top**: Implement smooth scroll-to-top when navigating between pages
- **Page Transitions**: Subtle page transition animations
- **State Preservation**: Maintain scroll position when appropriate
- **Loading States**: Smooth loading animations between pages

### SEO & Meta Tags

- **Index.html**: Fix meta tags to remove Lovable defaults
- **Open Graph**: Proper social media sharing tags
- **Schema Markup**: Structured data where applicable

### Accessibility

- **Reduced Motion**: Respect `prefers-reduced-motion` setting
- **Focus States**: Clear focus indicators for keyboard navigation
- **Alt Text**: Meaningful alt text for all images
- **Color Contrast**: Ensure WCAG AA compliance
- **Screen Readers**: Proper ARIA labels and semantic HTML

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Progressive Enhancement**: Graceful degradation for older browsers

## Code Quality

- **CSS Architecture**: Organized, maintainable CSS structure
- **JavaScript**: Clean, documented code with error handling
- **Responsive Design**: Mobile-first approach
- **Code Comments**: Clear documentation for complex animations and interactions

## Testing Requirements

- **Cross-Browser Testing**: Ensure consistent experience across browsers
- **Mobile Testing**: Test on various device sizes and orientations
- **Performance Testing**: Lighthouse scores and real-world performance
- **Animation Testing**: Ensure smooth performance on lower-end devices

## Deliverables

1. **Responsive Website**: Fully functional across all devices
2. **Animation Library**: Reusable animation components
3. **Style Guide**: Documentation of design system implementation
4. **Performance Report**: Lighthouse and performance metrics
5. **Browser Compatibility Report**: Testing results across target browsers

## Success Criteria

- **Visual Appeal**: Modern, professional design that stands out from template sites
- **Performance**: Fast loading times and smooth animations
- **User Experience**: Intuitive navigation and engaging interactions
- **Mobile Experience**: Excellent mobile usability and performance
- **SEO Ready**: Proper meta tags and search engine optimization
- **Accessibility**: WCAG AA compliance
- **Cross-Browser Consistency**: Uniform experience across browsers
