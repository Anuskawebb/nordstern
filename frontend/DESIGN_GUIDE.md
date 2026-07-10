# Design Guide - Landing Page Aesthetic Applied

This document outlines the design system applied across all redesigned dashboard pages.

## Visual Language

### Color Palette

```
Primary Brand Purples:
  - #ab9ff2 (Primary Brand)
  - #8b7ee0 (Strong)
  - #6f5fd6 (Deep)
  - #f4f2fd (Tint 50)
  - #e9e5fb (Tint 100)

Neutrals:
  - #ffffff (Canvas/White)
  - #f2f4f3 (Surface)
  - #eaeeec (Surface-2)
  - #e6e9e8 (Line/Border)
  - #d1d5db (Line Strong)

Text:
  - #0b0b0b (Ink/Primary Text)
  - #5b5b5b (Muted)
  - #9a9a9a (Faint)
  - #1a1530 (Brand Ink - on purple backgrounds)

Semantic:
  - Success:   #059669 (text) / #d1fae5 (bg)
  - Warning:  #b45309 (text) / #fef3c7 (bg)
  - Danger:   #dc2626 (text) / #fee2e2 (bg)
  - Info:     #4f46e5 (text) / #e0e7ff (bg)
```

### Typography

**Font**: Inter (via Next.js web fonts)

**Font Sizes & Weights**:
- **H1**: 36px-48px, Bold (900), tracking-tight
- **H2**: 24px-28px, Bold (700), tracking-tight
- **H3**: 18px-20px, Semibold (600)
- **Body**: 14px-16px, Regular (400), 1.4-1.6 line-height
- **Small**: 12px-13px, Regular (400)
- **Extra Small**: 10px-11px, Medium (500), uppercase, tracking-wide

### Spacing & Radius

**Border Radius**: 16px (--radius-xl) on all major elements

**Spacing Scale** (Tailwind):
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

**Gap/Padding**: 
- Cards: 1.5rem (24px) / 1.25rem (20px)
- Buttons: 0.625rem (10px) horizontal
- Lists: 1rem (16px) vertical

### Shadows

**Card Shadow** (subtle depth):
```
0 1px 2px rgba(0, 0, 0, 0.04),
0 4px 12px rgba(0, 0, 0, 0.02)
```

**Hover Shadow** (enhanced):
```
0 1px 2px rgba(0, 0, 0, 0.04),
0 8px 24px rgba(0, 0, 0, 0.04)
```

## Component Patterns

### Button States

**Primary Button** (Brand Purple):
- Background: `bg-brand` (#ab9ff2)
- Hover: `hover:bg-brand-strong` (#8b7ee0)
- Text: `text-brand-ink` (dark text on purple)
- Height: 44px-48px (h-11 to h-12)
- Border-radius: 12px-16px (rounded-xl to rounded-2xl)

**Secondary Button** (Border):
- Background: `bg-canvas` or `bg-surface`
- Border: `border-line` (#e6e9e8)
- Hover: `hover:bg-surface` + subtle border change
- Text: `text-ink`

**Icon Button**:
- Size: 40px-48px (h-10 to h-12, w-10 to w-12)
- Background: `bg-brand/12` (transparent purple)
- Icon: `text-brand-deep`

### Card Components

**Base Card**:
- Background: `bg-canvas` or `bg-surface`
- Border: `border-line`
- Border-radius: `rounded-2xl`
- Shadow: Card shadow above
- Padding: 24px-32px

**Card Body**: 
- Padding: 20px-24px
- Space between elements: 16px gap

**Hover Card**:
- Transition: all 300ms ease
- Border-color: `border-brand/40`
- Shadow: Enhanced hover shadow
- Background: Slight tint change

### Icon Styling

**Icon Container**:
- Size: 40px-48px (h-10 to h-12, w-10 to w-12)
- Background: `bg-brand/12` (purple tint)
- Border-radius: `rounded-xl` (12px)
- Icon size: 16px-20px (h-4 to h-5, w-4 to w-5)
- Icon color: `text-brand-deep` or semantic color

**Icon in Button**:
- Gap: 8px-10px from text
- Size: 16px (h-4, w-4)
- Color: Inherit from button text

### Badge/Status

**Badge Component**:
- Padding: 4px-8px horizontal, 2px-4px vertical
- Font size: 11px-12px
- Font weight: 500-600
- Border-radius: 6px-8px
- Use semantic tone colors

### Input/Form Fields

**Input Styling**:
- Height: 44px (h-11)
- Border: `border-line`
- Padding: 12px-16px
- Border-radius: `rounded-xl`
- Focus: `focus:border-brand focus:ring-1 focus:ring-brand/30`
- Placeholder: `text-faint`

**Form Layout**:
- Spacing: 12px between inputs
- Label: 12px, font-medium, text-muted, uppercase, tracking-wide
- Help text: 12px, text-muted

## Animation Principles

### Fade Up (Page Entry)
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
animation: fadeUp 0.4s ease both;
```

### Hover Transitions

**Button Hover**:
```
transition-all duration-200 ease
hover:shadow-lg
```

**Icon Hover**:
```
transition-transform duration-200
group-hover:translate-x-0.5 (for arrows)
group-hover:scale-110 (for icons)
```

**Color Transitions**:
```
transition-colors duration-200
hover:text-brand
hover:bg-surface
```

### Focus States

All interactive elements should have:
- Visible focus ring: `focus:ring-2 focus:ring-brand focus:ring-offset-2`
- Clear visual feedback
- Smooth transition to focus state

## Layout Patterns

### Grid System

**Desktop (lg screens)**:
- Main content: 2/3 width
- Sidebar: 1/3 width
- Gap: 24px

**Tablet (md screens)**:
- Single column for most sections
- Grid columns stack

**Mobile (sm screens)**:
- Full width, single column
- Reduced padding

### Stat Tiles

- 3 columns on desktop
- 2 columns on tablet
- 1 column on mobile
- Gap: 16px
- Height: auto (content-driven)

### Card Lists

- Divide rows with `divide-y divide-line`
- Hover: `hover:bg-surface/60` or `hover:bg-brand/5`
- Padding: 16px vertical, 20px horizontal

## Responsive Breakpoints

```
sm: 640px   (tablet)
md: 768px   (small desktop)
lg: 1024px  (desktop)
xl: 1280px  (large desktop)
```

## Accessibility

- Minimum text size: 14px (body)
- Line height: 1.4-1.6 for readability
- Color contrast: WCAG AA compliant
- Focus visible on all interactive elements
- ARIA labels on icons
- Semantic HTML: buttons, links, sections
- Alt text on all images

## Implementation Checklist

- [ ] Use `fade-up` class for page-level animations
- [ ] Apply `transition-all` for smooth interactions
- [ ] Use Tailwind semantic classes over arbitrary values
- [ ] Maintain 16px base grid for spacing
- [ ] Keep shadows consistent
- [ ] Use brand colors from theme tokens
- [ ] Test focus states for accessibility
- [ ] Verify mobile responsiveness
- [ ] Check color contrast ratios
- [ ] Apply `text-balance` to headings

## Design QA Checklist

- [ ] All text uses correct typography scale
- [ ] All elements use theme color tokens
- [ ] All buttons have hover and focus states
- [ ] All cards have consistent shadows
- [ ] All icons are properly colored and sized
- [ ] All spacing uses the Tailwind scale
- [ ] All border-radius is consistent (16px)
- [ ] All animations are smooth and under 400ms
- [ ] Mobile layout flows naturally
- [ ] All interactive elements are 44px+ touch targets
