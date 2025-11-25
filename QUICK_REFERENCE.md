# Quick Reference

## Commands

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server (http://localhost:3000)
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint

# Git
git add .               # Stage changes
git commit -m "msg"     # Commit changes
git push                # Push to remote
git pull                # Pull from remote
```

## File Locations

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main portfolio builder page |
| `src/app/layout.tsx` | Root layout with metadata |
| `src/app/globals.css` | Global styles |
| `src/components/ResumeUpload.tsx` | Resume upload component |
| `src/components/PortfolioPreview.tsx` | Portfolio preview component |
| `src/store/portfolioStore.ts` | State management (Zustand) |
| `src/lib/resumeParser.ts` | Resume parsing logic |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `next.config.js` | Next.js configuration |
| `tsconfig.json` | TypeScript configuration |

## Tailwind Classes

```html
<!-- Sizing -->
<div class="w-full h-screen p-4 m-2 gap-4">

<!-- Colors -->
<div class="bg-netflix-black text-netflix-red border-netflix-lighter">

<!-- Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex items-center justify-between">

<!-- Effects -->
<div class="glass-effect hover-scale text-gradient">

<!-- Animations -->
<div class="animate-scaleIn animate-fadeIn animate-shimmer">
```

## Component Props

### ResumeUpload
```typescript
interface ResumeUploadProps {
  onResumeProcessed: (data: ResumeData) => void;
}
```

### PortfolioPreview
```typescript
interface PortfolioPreviewProps {
  initialData: ResumeData;
  isPreviewMode?: boolean;
  onComplete?: (data: ResumeData) => void;
}
```

## Data Structure

```typescript
interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  headline: string;
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  skills: string[];
  education: Array<{
    school: string;
    degree: string;
    field: string;
    year: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    link: string;
    image: string;
  }>;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}
```

## Framer Motion

```tsx
import { motion } from 'framer-motion';

// Basic animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Hover effect
<motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Click me
</motion.button>

// Stagger children
<motion.div variants={containerVariants}>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

## Zustand Store

```typescript
import { usePortfolioStore } from '@/store/portfolioStore';

// In components
const { resumeData, setResumeData, updateResumeData } = usePortfolioStore();

// Update data
updateResumeData({ fullName: 'New Name' });

// Clear data
usePortfolioStore.getState().clearResumeData();
```

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Module not found | `npm install` |
| Styles not loading | Check `tailwind.config.ts` paths |
| Build fails | `rm -rf .next && npm run build` |
| Git conflicts | `git fetch && git rebase origin/main` |

## Keyboard Shortcuts (VS Code)

| Shortcut | Action |
|----------|--------|
| `Cmd+S` | Save file |
| `Cmd+Shift+P` | Command palette |
| `Cmd+/` | Toggle comment |
| `Alt+↑` | Move line up |
| `Alt+↓` | Move line down |
| `Cmd+D` | Select word |
| `Cmd+Shift+L` | Select all occurrences |

## Browser DevTools

```javascript
// Console commands
localStorage.clear()              // Clear cache
document.body.style.zoom = 1.5    // Zoom page
console.log(JSON.stringify(obj))  // Pretty print

// React DevTools
// - Find component
// - View props
// - Track updates
```

## Deployment Checklist

- [ ] Build succeeds (`npm run build`)
- [ ] No console errors
- [ ] Images optimized
- [ ] Environment variables set
- [ ] Production mode tested
- [ ] Mobile responsive tested
- [ ] Analytics configured
- [ ] SEO meta tags added
- [ ] Error handling in place
- [ ] Performance optimized

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Zustand](https://github.com/pmndrs/zustand)

## Support

- Check documentation files in project
- Review error messages in console
- Search GitHub issues
- Check Stack Overflow tags

---

**Last Updated:** November 2025
