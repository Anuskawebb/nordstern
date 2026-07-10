# Integration Guide - Using Redesigned Pages

This guide explains how to integrate the redesigned pages into your main Mizu Pay application.

## Quick Start

### Option 1: Direct Copy (Recommended)

1. **Backup existing pages** (if needed)
2. **Copy page content** to the main application:
   ```
   frontend/pages/home.tsx → anchor-template/anchor-client/app/(app)/home/page.tsx
   frontend/pages/overview.tsx → anchor-template/anchor-client/app/(app)/overview/page.tsx (if route exists)
   frontend/pages/verify.tsx → anchor-template/anchor-client/app/(app)/verify/page.tsx
   frontend/pages/transactions.tsx → anchor-template/anchor-client/app/(app)/transactions/page.tsx
   ```

3. **Verify imports** - All pages use the same import paths:
   - `@/components/customer-context`
   - `@/components/brand-context`
   - `@/components/ui`
   - `@/lib/anchor`
   - `@/lib/customer`
   - `@/lib/api`
   - `@/lib/format`
   - `@/components/ecosystem`

4. **Test each page** in your local dev environment

### Option 2: Gradual Rollout

- Deploy one page at a time
- Monitor user interactions
- Gather feedback
- Roll out remaining pages

## Design System Requirements

### CSS Foundation

The redesigned pages use the existing design system in `/anchor-template/anchor-client/app/globals.css`:

```css
@theme {
  /* Colors - Already defined */
  --color-brand: #ab9ff2;
  --color-brand-strong: #8b7ee0;
  --color-brand-deep: #6f5fd6;
  /* ... all other colors defined */
  
  /* Fonts - Already configured */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  
  /* Animations - Already available */
  @keyframes fadeUp { ... }
  .fade-up { ... }
}
```

**No CSS changes needed!** - The design system is already in place.

### Component Library

All components used are from the existing UI library:

| Component | Location | Used In |
|-----------|----------|---------|
| `Card` / `CardBody` | `@/components/ui` | All pages |
| `Badge` | `@/components/ui` | All pages |
| `Button` | `@/components/ui` | All pages |
| `StatTile` | `@/components/ui` | Home, Overview |
| `SectionHeader` | `@/components/ui` | Home, Verify |
| `Skeleton` | `@/components/ui` | All pages |
| `Input` | `@/components/ui` | Transactions (search) |

**No new components needed!** - Using existing UI components.

## File Structure

After integration, your structure will look like:

```
anchor-template/anchor-client/
├── app/
│   ├── (app)/
│   │   ├── home/
│   │   │   └── page.tsx          (✨ Updated with new design)
│   │   ├── overview/
│   │   │   └── page.tsx          (✨ New or updated)
│   │   ├── verify/
│   │   │   └── page.tsx          (✨ Updated with new design)
│   │   ├── transactions/
│   │   │   └── page.tsx          (✨ Updated with new design)
│   │   └── ...other pages...
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx              (Keep as is - landing page)
│   └── globals.css               (Keep as is - design system)
├── components/
│   ├── ui.tsx                    (Keep as is)
│   ├── brand-context.tsx         (Keep as is)
│   ├── customer-context.tsx      (Keep as is)
│   └── ...other components...
└── ...rest of app...
```

**Original landing page preserved!** - The login page remains unchanged in the main app.

## Development Workflow

### Before Integration

1. **Review each page** in this folder:
   - `home.tsx` - Dashboard home
   - `overview.tsx` - Overview dashboard
   - `verify.tsx` - Identity verification
   - `transactions.tsx` - Transaction history

2. **Check the design guide** (`DESIGN_GUIDE.md`) for styling patterns

3. **Verify all dependencies** are available in the main app

### During Integration

1. **Copy one page at a time**
   ```bash
   cp frontend/pages/home.tsx anchor-template/anchor-client/app/(app)/home/page.tsx
   ```

2. **Update imports** if needed (usually not required)

3. **Test locally**:
   ```bash
   cd anchor-template/anchor-client
   npm run dev
   ```

4. **Verify functionality**:
   - Navigation works
   - Data loads correctly
   - Buttons are clickable
   - Responsive design works on mobile

### After Integration

1. **Remove old styling** if there's any conflicting CSS

2. **Deploy to staging** for QA testing

3. **Gather user feedback**

4. **Deploy to production**

## Feature Preservation

All pages preserve 100% of the original functionality:

### home.tsx (Dashboard Home)
- ✅ Welcome message with user's first name
- ✅ Buy/Sell buttons (verification-gated)
- ✅ KYC verification card
- ✅ Stat tiles (holdings, this month, rate)
- ✅ Quick action cards (Buy/Sell)
- ✅ Recent activity list
- ✅ Get started checklist
- ✅ Today's rate card

### overview.tsx (Overview Dashboard)
- ✅ Dashboard header
- ✅ KYC verification gate
- ✅ Key metrics (holdings, volume, rate)
- ✅ Quick actions (Buy/Sell)
- ✅ Market overview section
- ✅ Portfolio snapshot
- ✅ Account status verification

### verify.tsx (Identity Verification)
- ✅ Verification steps display
- ✅ Why verify section
- ✅ Verify button with states (idle, processing, completed)
- ✅ Security information panel
- ✅ Partner attribution (DiDit, NordStern, Stellar)
- ✅ FAQ section
- ✅ Provider trust signals

### transactions.tsx (Transaction History)
- ✅ Transaction statistics
- ✅ Search functionality
- ✅ Filter buttons (All, Buy, Sell)
- ✅ Transaction list with status
- ✅ Empty state messaging
- ✅ Pagination controls
- ✅ Link to individual transactions

## Styling Changes Only

**100% of functionality is identical** - Only styling has been enhanced:

### What Changed (Visual Only)
- Larger, more premium typography
- Softer shadows and improved depth
- Enhanced hover effects and transitions
- Better icon styling with background containers
- Improved spacing and breathing room
- Softer purple accent colors
- Better status/badge styling
- Refined button shapes and sizes

### What Stayed the Same (100% Functionality)
- All API calls and data fetching
- All logic and state management
- All routing and navigation
- All conditional rendering
- All props and component structure
- All error handling

## Customization

### To adjust colors:
1. Edit `/anchor-template/anchor-client/app/globals.css`
2. Modify the `@theme` section
3. All pages will automatically use the new colors

### To adjust spacing:
1. Use Tailwind's spacing scale
2. Maintain the 16px grid system
3. Keep gap/padding consistent with other pages

### To adjust animations:
1. Modify animation duration (typically 200-400ms)
2. Keep transitions smooth and professional
3. Ensure accessibility (prefers-reduced-motion)

## Testing Checklist

- [ ] Page loads without errors
- [ ] All data displays correctly
- [ ] Buttons navigate to correct routes
- [ ] Conditional rendering works (verified/unverified)
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Hover effects work on interactive elements
- [ ] Icons load and display correctly
- [ ] Colors match the design system
- [ ] Loading states (Skeleton) display
- [ ] Empty states display with correct messaging
- [ ] Links work and navigate correctly
- [ ] All imports resolve without errors
- [ ] Performance is acceptable (no lag)
- [ ] Accessibility features work (focus, keyboard navigation)

## Troubleshooting

### "Module not found" errors
- Verify all `@/` imports are correct
- Check that `components`, `lib` directories exist
- Ensure `tsconfig.json` has correct path mappings

### Styling looks different
- Verify `globals.css` is loaded in root layout
- Check that Tailwind is properly configured
- Ensure the design tokens are defined in `@theme`

### Components not rendering
- Check that all UI components are exported from `@/components/ui`
- Verify all context providers are in place
- Check browser console for errors

### Data not loading
- Verify API endpoints are accessible
- Check that user is authenticated
- Verify Redux/Context state is properly initialized

## Performance Considerations

- Pages use React 19 best practices
- All list rendering uses keys
- Skeleton components for loading states
- Lazy loading where appropriate
- No unnecessary re-renders
- Smooth animations (GPU-accelerated)

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: iOS Safari, Chrome Mobile

## Next Steps

1. **Copy the pages** to your main app
2. **Test locally** with your development server
3. **Review the design** with your team
4. **Deploy to staging** for QA
5. **Gather feedback** from users
6. **Deploy to production** with confidence

## Support

For questions about:
- **Design system**: See `DESIGN_GUIDE.md`
- **Page structure**: See `README.md`
- **Integration**: See this file
- **Original functionality**: See the original page implementations

All redesigned pages maintain 100% backward compatibility with the existing application!
