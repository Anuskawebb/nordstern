# Frontend - Redesigned Pages

This folder contains redesigned dashboard pages using the **landing page aesthetics** from the Mizu Pay application.

## Design System Applied

All pages in this folder inherit the design language from the landing page (`/anchor-template/anchor-client/app/login/page.tsx`) and are styled using the same:

### Colors
- **Primary Brand**: Soft purple (`#ab9ff2`) with darker variants (`#8b7ee0`, `#6f5fd6`)
- **Surfaces**: Clean whites, light grays (`#f2f4f3`, `#eaeeec`)
- **Text**: Deep ink (`#0b0b0b`), muted gray (`#5b5b5b`), faint (`#9a9a9a`)
- **Semantic**: Success, warning, danger, info with their respective background tints

### Typography
- **Font Family**: Inter (sans-serif)
- **Headings**: Bold, larger tracking for premium feel
- **Body**: Regular weight, 1.4-1.6 line-height for readability

### Visual Elements
- **Rounded corners**: Consistent 16px (`--radius-xl`) on all cards and buttons
- **Shadows**: Subtle shadows for depth: `0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)`
- **Spacing**: Generous padding and gaps for breathing room
- **Borders**: Soft gray borders (`#e6e9e8`) for subtle definition

### Soft Animations
- **Fade-up**: Entry animation (0.4s ease)
- **Hover effects**: Smooth transitions on buttons, cards, and interactive elements
- **Scale transforms**: Subtle scaling on icons and interactive components
- **Color transitions**: Smooth color changes on hover states

## Pages Redesigned

### 1. **home.tsx** - Dashboard Home
Enhanced welcome screen with:
- Elegant greeting section with larger typography
- KYC verification card with improved visibility
- Enhanced stat tiles with better icon styling
- Improved action cards with hover shadow effects
- Recent activity section with smooth interactions
- Sidebar checklist for onboarding tasks
- Today's rate card with refined styling

### 2. **overview.tsx** - Overview Dashboard
Complete overview with:
- Clear page hierarchy and section headers
- Key metrics displayed prominently
- Quick action buttons with distinct colors
- Market overview section with analytics placeholder
- Portfolio snapshot card
- Account status verification panel
- Responsive grid layout (mobile-first)

### 3. **verify.tsx** - Identity Verification
Verification flow redesigned with:
- Clear step-by-step verification process
- Security information panel
- Partner attribution (DiDit, NordStern, Stellar)
- FAQ section for common questions
- Enhanced button states (idle, processing, completed)
- Clean, professional layout
- Trust-building visual hierarchy

### 4. **transactions.tsx** - Transaction History
Transaction management page featuring:
- Transaction statistics at the top
- Search functionality with icon
- Filter buttons (All, Buy, Sell)
- Enhanced transaction list with visual indicators
- Status badges with icons
- Empty state with helpful messaging
- Responsive hover effects
- Pagination controls

## Component Usage

All pages use the existing component library:
- `Card` / `CardBody` - Container elements
- `Badge` - Status indicators
- `StatTile` - Key metric displays
- `Button` - Interactive elements
- `Skeleton` - Loading states
- `SectionHeader` - Section titles

## Styling Approach

All pages follow Tailwind CSS patterns with:
- Custom theme tokens from `/anchor-client/app/globals.css`
- Responsive breakpoints (sm, lg, xl)
- Soft animations and transitions
- Accessibility-first components
- Text balance for optimal line breaks

## Key Design Principles

1. **Consistency**: All pages follow the same color palette and typography
2. **Hierarchy**: Clear visual hierarchy through sizing, weight, and color
3. **Soft Interactions**: Smooth animations and gentle hover states
4. **Whitespace**: Generous spacing for a premium feel
5. **Icons**: Lucide React icons with consistent sizing and colors
6. **Responsiveness**: Mobile-first design that scales beautifully

## Integration Notes

To integrate these pages into the main application:

1. Copy the page content to the respective routes in `anchor-template/anchor-client/app/(app)/`
2. Ensure all imports from `@/components`, `@/lib`, etc. remain consistent
3. Keep the existing functionality - only the styling has been updated
4. The design system automatically inherits from the global CSS

## Color Reference

| Element | Color | Hex |
|---------|-------|-----|
| Brand Primary | Purple | #ab9ff2 |
| Brand Strong | Darker Purple | #8b7ee0 |
| Brand Deep | Deepest Purple | #6f5fd6 |
| Canvas | White | #ffffff |
| Surface | Light Gray | #f2f4f3 |
| Line | Border Gray | #e6e9e8 |
| Ink | Dark Text | #0b0b0b |
| Muted | Medium Gray | #5b5b5b |
| Faint | Light Gray | #9a9a9a |

## Notes

- All original functionality is preserved - only styling has been enhanced
- The pages use the same API calls and data fetching patterns as the original
- Animations are subtle and performant (no janky transitions)
- All interactive elements have proper hover and focus states
