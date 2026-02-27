# SpaceGen Aviation - Space Theme & Animations Guide

Complete guide to the modern space-themed design with Framer Motion animations.

## Design System

### Color Palette (Deep Space Theme)

```
Primary (Electric Cyan):      #00d9ff  - Buttons, highlights, primary actions
Secondary (Hot Pink):          #ff006e  - Accents, secondary elements
Accent (Space Gold):           #ffd700  - Tertiary buttons, badges
Background (Deep Space):       #0a0e27  - Main background
Card Background (Space Blue):  #0f1438  - Cards, modals
Text (Light):                  #e8eef7  - Primary text
Text (Muted):                  #94a3b8  - Secondary text
Border:                        #1e293b  - Borders, dividers
```

### Usage
- **Cyan**: Call-to-action buttons, links, primary interactive elements
- **Pink**: Secondary actions, hover states, accent highlights
- **Gold**: Awards, achievements, special highlights
- **Deep Blue**: Backgrounds, creating depth and space effect

---

## Animation Components

### 1. Animated Stars (`components/animations/animated-stars.tsx`)

Twinkling star field that fills the background.

**Usage:**
```tsx
<AnimatedStars count={100} />
```

**Props:**
- `count`: Number of stars (default: 100)

**Features:**
- Random positions and sizes
- Twinkling animation with varying speeds
- Smooth opacity changes

---

### 2. Space Background (`components/animations/space-background.tsx`)

Animated gradient background with moving orbs and grid overlay.

**Usage:**
```tsx
<SpaceBackground />
```

**Features:**
- Three animated gradient orbs (blue, cyan, purple)
- Grid overlay for tech aesthetic
- Full viewport coverage
- Fixed position for parallax effect

---

### 3. Floating Planets (`components/animations/floating-planets.tsx`)

Animated planet-like spheres with glowing effects.

**Usage:**
```tsx
<FloatingPlanets />
```

**Features:**
- 4 pre-configured planets
- Smooth floating animation
- Gradient color effects
- Opacity variations

---

### 4. Glowing Button (`components/animations/glowing-button.tsx`)

Button component with neon glow and hover effects.

**Usage:**
```tsx
<GlowingButton variant="primary" size="lg">
  Click Me
  <ArrowRight className="ml-2" />
</GlowingButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'accent'
- `size`: 'sm' | 'md' | 'lg'
- `onClick`: Click handler
- `children`: Button content

**Variants:**
- **Primary (Cyan)**: Main CTAs
- **Secondary (Pink)**: Secondary actions
- **Accent (Gold)**: Tertiary/special actions

---

### 5. Text Reveal (`components/animations/text-reveal.tsx`)

Character-by-character text animation for headings.

**Usage:**
```tsx
<TextReveal delay={0.2} duration={1}>
  Your Sky Awaits
</TextReveal>
```

**Props:**
- `delay`: Initial delay in seconds
- `duration`: Animation duration per character
- `children`: Text to animate

---

### 6. Parallax Section (`components/animations/parallax-section.tsx`)

Section with parallax scroll effect.

**Usage:**
```tsx
<ParallaxSection offset={50}>
  <div>Content that parallaxes</div>
</ParallaxSection>
```

**Props:**
- `offset`: Parallax distance in pixels
- `children`: Content to parallax

---

## Page Structure

### Hero Section (`hero-space.tsx`)

Main landing section with:
- Space background + animated stars + floating planets
- Gradient text heading
- CTA buttons with glow effects
- Statistics cards
- Scroll indicator animation
- Right-side feature card with parallax

### About Section (`about-modern.tsx`)

Highlights with:
- Feature cards with gradient icons
- Company statistics
- Achievement highlights
- Left-right grid layout

### Programs Section (`programs-modern.tsx`)

Program cards with:
- Program details and pricing
- Feature lists
- CTA buttons
- "Popular" badge for featured program

### Features Section (`features-modern.tsx`)

Feature showcase with:
- Feature grid with icons
- Benefit section
- Statistics cards
- Glow effects on hover

### CTA Section (`cta-modern.tsx`)

Final call-to-action with:
- Gradient background
- Contact information cards
- Multiple CTA options
- Contact form links

---

## Using Framer Motion

### Basic Animation
```tsx
import { motion } from 'framer-motion';

<motion.div
  animate={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>
```

### Hover Effects
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click Me
</motion.button>
```

### Scroll Animations
```tsx
import { useScroll, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

<motion.div style={{ y }}>Parallax Content</motion.div>
```

---

## Customization Guide

### Change Color Scheme

Edit `/app/globals.css`:

```css
:root {
  --primary: #00d9ff;      /* Change cyan */
  --secondary: #ff006e;    /* Change pink */
  --accent: #ffd700;       /* Change gold */
  --background: #0a0e27;   /* Change background */
}
```

### Adjust Animation Speed

Edit component files and modify `transition` values:

```tsx
// Faster
transition={{ duration: 0.3 }}

// Slower
transition={{ duration: 1.5 }}

// Custom easing
transition={{ 
  duration: 0.8, 
  ease: [0.33, 0.66, 0.66, 1] 
}}
```

### Change Star Count

```tsx
<AnimatedStars count={150} />  // More stars
```

### Modify Planet Positions

Edit `floating-planets.tsx`:

```tsx
const planets: Planet[] = [
  { 
    size: 120, 
    top: '10%',    // Change position
    left: '10%',
    ...
  },
];
```

---

## Performance Optimization

### 1. Reduce Animation Complexity
```tsx
// Use will-change for better performance
<motion.div style={{ willChange: 'transform' }}>
```

### 2. Lazy Load Heavy Animations
```tsx
import dynamic from 'next/dynamic';

const AnimatedHero = dynamic(
  () => import('@/components/sections/hero-space'),
  { loading: () => <div>Loading...</div> }
);
```

### 3. Disable Animations on Mobile
```tsx
import { useMediaQuery } from 'react-responsive';

const isMobile = useMediaQuery({ maxWidth: 768 });

{!isMobile && <AnimatedStars />}
```

---

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Optimized (animations reduced on mobile)

---

## Common Issues & Solutions

### Stars not visible
- Check `AnimatedStars` count value
- Verify z-index is correct
- Check opacity values

### Animations janky
- Reduce animation complexity
- Use `transform` instead of `x/y`
- Optimize re-renders
- Check for console errors

### Performance issues
- Reduce number of animated elements
- Use `will-change` CSS property
- Implement lazy loading
- Profile with Chrome DevTools

---

## File Structure

```
components/
├── animations/
│   ├── animated-stars.tsx
│   ├── space-background.tsx
│   ├── floating-planets.tsx
│   ├── glowing-button.tsx
│   ├── text-reveal.tsx
│   └── parallax-section.tsx
└── sections/
    ├── hero-space.tsx
    ├── about-modern.tsx
    ├── programs-modern.tsx
    ├── features-modern.tsx
    └── cta-modern.tsx
```

---

## Dependencies

```json
{
  "framer-motion": "^11.0.3"
}
```

No additional dependencies needed! Framer Motion handles all animations.

---

## Tips & Tricks

### 1. Stagger Animations
```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
```

### 2. Infinite Animations
```tsx
animate={{
  rotate: 360,
}}
transition={{
  duration: 2,
  repeat: Infinity,
  repeatType: 'loop',
}}
```

### 3. Gesture Animations
```tsx
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.9 }}
whileFocus={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)' }}
```

---

## Resources

- [Framer Motion Docs](https://www.framer.com/motion)
- [Animation Best Practices](https://web.dev/animations-guide/)
- [Color Theory](https://www.interaction-design.org/literature/article/color-theory-for-designers)

---

**Version**: 1.0.0 | **Last Updated**: Feb 2026
