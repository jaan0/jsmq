# JSMQ Web Development Service - Design Guidelines

## Design Approach: Reference-Based (Stripe + Vercel)

**Primary References:** Stripe's landing page for professional service presentation and smooth animations; Vercel's design system for futuristic aesthetics and clean card-based layouts.

**Design Philosophy:** Modern, futuristic web service platform with seamless e-commerce integration, emphasizing professionalism and technological sophistication.

---

## Color System

**Primary:** `hsl(342 85.11% 52.55%)` - Vibrant pink for CTAs, accents, and interactive elements  
**Secondary:** `hsl(0 0% 76.86%)` - Neutral grey for secondary text and borders  
**Background:** `hsl(0 0% 94.12%)` - Light background for overall page  
**Text:** `hsl(0 0% 10.2%)` - Dark text for primary content  
**Card:** `hsl(0 0% 98.82%)` - White cards for content containers  
**Accent:** `hsl(9, 75%, 61%)` - Orange for badges and highlights

---

## Typography

**Font Family:** Poppins (all weights via Google Fonts)

**Hierarchy:**
- Hero Headline: 3.5rem (56px) / Bold / Line-height 1.1
- Section Headers: 2.5rem (40px) / SemiBold / Line-height 1.2
- Card Titles: 1.5rem (24px) / SemiBold / Line-height 1.3
- Body Text: 1rem (16px) / Regular / Line-height 1.6
- Small Text/Badges: 0.875rem (14px) / Medium / Line-height 1.4

---

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20 for consistent rhythm

**Container Strategy:**
- Full-width sections with inner `max-w-7xl` container
- Content sections: `py-20` desktop, `py-12` mobile
- Card spacing: `p-6` to `p-8`

**Grid System:**
- Service cards: 3 columns desktop (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Portfolio: 2-3 columns with varied heights (masonry-inspired)
- Features: 4 columns for icon-based features

---

## Component Library

### Hero Section
- Full viewport height (90vh) with gradient background overlay
- Large hero image showing modern workspace/technology
- Centered headline with primary CTA
- Floating elements (geometric shapes) with subtle parallax
- Blurred background for CTA buttons placed over hero image

### Navigation
- Fixed transparent navbar with blur effect on scroll
- Logo left, navigation center, CTA button right
- Smooth scroll anchors to sections
- Mobile: Hamburger menu with full-screen overlay

### Service Cards
- White card background with 0.8rem border radius
- Hover: Lift effect (translateY -8px) with enhanced shadow
- Eye-catching badges: Top-right corner, vibrant pink/orange background
- Card structure: Icon/image → Title → Description → Price → CTA
- Gradient border accent on hover

### Portfolio Grid
- Masonry-style layout with varied card heights
- Full-bleed project images with gradient overlay
- Hover: Zoom image + reveal project details
- Quick view modal on click

### Contact Popup
- Modal overlay with blur backdrop
- Centered form card with modern shadows
- Form fields: Name, Email, Service Interest (dropdown), Message
- Floating labels with smooth animation
- Primary button for submit

### Admin Dashboard
- Sidebar navigation (dark theme contrasting main site)
- Data tables for orders with status indicators
- Card-based stats overview (total orders, revenue, pending)
- CRUD interfaces for services and portfolio items

### Payment Selection Interface
- Large selectable payment method cards
- Icons for PayPal, Bank Transfer, NayaPay, SadaPay
- Accordion for detailed instructions per method
- File upload component for payment proof
- Order summary sidebar

---

## Visual Effects

**Shadows:**
- Cards: `0 4px 6px rgba(0,0,0,0.07)` default
- Hover: `0 12px 24px rgba(0,0,0,0.12)`
- Modals: `0 20px 40px rgba(0,0,0,0.15)`

**Gradients:**
- Hero background: Linear gradient from vibrant pink to deep purple
- Section dividers: Subtle radial gradients
- Card highlights: Pink to orange gradient on badges

**Animations:** Minimal, smooth transitions (0.3s ease)
- Card hover transforms
- Form field focus states
- Smooth scroll between sections
- NO distracting infinite animations

---

## Images

**Hero Section:** Large, high-quality image of modern web development workspace (dual monitors, code editor, sleek desk setup). Full-width, behind gradient overlay.

**Service Cards:** Icon-based (use Heroicons for consistency) - no images needed

**Portfolio:** Project screenshots/mockups showcasing completed websites - 6-9 projects minimum

**About Section:** Team photo or professional workspace image

---

## Section Structure

1. **Hero:** Bold headline, subheadline, dual CTAs, hero image
2. **Services:** 6-9 service packages in card grid with badges
3. **Portfolio:** 6-9 projects in masonry grid
4. **About:** Company story, team, values (2-column layout)
5. **Contact:** Simple text + CTA to open popup form
6. **Footer:** Logo, quick links, social icons, payment methods accepted

---

## Responsive Behavior

- Desktop (1024px+): Full multi-column layouts
- Tablet (768px): 2-column grids, adjusted spacing
- Mobile (<768px): Single column, stacked elements, larger touch targets (min 44px)