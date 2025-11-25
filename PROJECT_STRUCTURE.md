# Portfolio Builder - Complete File Structure

```
/Users/nareshpakalapati/Main/
│
├── 📄 Configuration Files
│   ├── package.json                 # Project dependencies & scripts
│   ├── tsconfig.json               # TypeScript configuration
│   ├── next.config.js              # Next.js configuration
│   ├── tailwind.config.ts          # Tailwind CSS customization
│   ├── postcss.config.js           # PostCSS configuration
│   └── .gitignore                  # Git ignore rules
│
├── 📚 Documentation
│   ├── README.md                   # Project overview & features
│   ├── SETUP.md                    # Setup & installation guide
│   ├── DEPLOYMENT.md               # Deployment options & guides
│   ├── API_GUIDE.md               # API & backend integration
│   ├── QUICK_REFERENCE.md         # Commands & quick reference
│   └── PROJECT_STRUCTURE.md       # This file
│
├── 🔧 Source Code (src/)
│   │
│   ├── 🎨 App Directory (app/)
│   │   ├── layout.tsx              # Root layout component
│   │   │   ├── Metadata setup
│   │   │   └── Global providers
│   │   │
│   │   ├── page.tsx                # Main portfolio builder page
│   │   │   ├── Step 1: Resume upload
│   │   │   ├── Step 2: Portfolio build
│   │   │   └── Step 3: Preview
│   │   │
│   │   ├── globals.css             # Global styles
│   │   │   ├── Tailwind directives
│   │   │   ├── Custom animations
│   │   │   ├── Utility classes
│   │   │   └── Scrollbar styling
│   │   │
│   │   └── favicon.ico             # App icon
│   │
│   ├── 🧩 Components (components/)
│   │   ├── ResumeUpload.tsx        # Resume upload interface
│   │   │   ├── Drag & drop area
│   │   │   ├── File upload handler
│   │   │   ├── Loading state
│   │   │   ├── Error handling
│   │   │   └── Feature cards
│   │   │
│   │   └── PortfolioPreview.tsx    # Portfolio preview & editor
│   │       ├── Editor panel
│   │       ├── Portfolio display
│   │       ├── Hero section
│   │       ├── Skills section
│   │       ├── Experience timeline
│   │       ├── Projects gallery
│   │       ├── Education section
│   │       └── Edit handlers
│   │
│   ├── 🗂️ Store (store/)
│   │   └── portfolioStore.ts       # Zustand state management
│   │       ├── ResumeData interface
│   │       ├── PortfolioStore interface
│   │       └── Store hooks
│   │
│   └── 📚 Library (lib/)
│       └── resumeParser.ts         # Resume parsing utilities
│           ├── PDF extraction
│           ├── DOCX extraction
│           ├── Text extraction
│           ├── Data parsing
│           └── Helper functions
│
├── 📦 Node Modules
│   └── node_modules/               # Installed dependencies (git ignored)
│
├── 🔒 Environment
│   └── .env.local (optional)       # Local environment variables
│
└── 📋 Git
    └── .git/                       # Git repository data

```

## File Dependencies & Flow

```
┌─────────────────────────────────────────┐
│         src/app/page.tsx                │
│    (Main Portfolio Builder Page)        │
└────────────┬──────────────────┬─────────┘
             │                  │
      ┌──────▼──────┐    ┌──────▼──────────┐
      │ ResumeUpload│    │ PortfolioPreview│
      │  Component  │    │   Component     │
      └──────┬──────┘    └──────┬──────────┘
             │                  │
             ├─────────┬────────┤
                       │
            ┌──────────▼──────────┐
            │ portfolioStore.ts   │
            │  (Zustand State)    │
            └──────────┬──────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
   ┌────▼────────┐         ┌─────────▼────┐
   │ ResumeData  │         │ Framer Motion│
   │ Interface   │         │ Animations   │
   └─────────────┘         └──────────────┘
```

## Component Hierarchy

```
<Root Layout>
  └── <Page>
      ├── <Header>
      │   └── Progress Indicator
      │
      ├── <ResumeUpload> (Step 1)
      │   ├── Hero Section
      │   ├── Upload Area
      │   └── Feature Cards
      │
      ├── <PortfolioPreview> (Steps 2-3)
      │   ├── [Editor Panel]
      │   │   ├── Input Fields
      │   │   └── Save Button
      │   │
      │   └── [Preview Panel]
      │       ├── Hero Section
      │       ├── About Section
      │       ├── Skills Section
      │       ├── Experience Section
      │       ├── Projects Section
      │       └── Education Section
      │
      └── <Background>
          └── Gradient Effects
```

## Data Flow

```
1. User uploads resume
   ↓
2. ResumeUpload component processes file
   ↓
3. resumeParser.ts extracts data
   ↓
4. ResumeData object created
   ↓
5. portfolioStore.ts stores data (Zustand)
   ↓
6. PortfolioPreview component renders
   ↓
7. User edits portfolio
   ↓
8. Store updates automatically
   ↓
9. Preview updates in real-time
   ↓
10. User finalizes portfolio
```

## Technology Stack Location

```
Next.js                    → src/app/
React                      → src/components/
TypeScript                 → .ts/.tsx files
Tailwind CSS               → globals.css + tailwind.config.ts
Framer Motion              → src/components/ (animations)
Zustand                    → src/store/portfolioStore.ts
React Icons                → src/components/ (icons)
PDF.js                     → src/lib/resumeParser.ts
```

## Styling Architecture

```
tailwind.config.ts          (Custom colors & animations)
↓
postcss.config.js          (PostCSS plugins)
↓
globals.css                (Global styles & utilities)
↓
Components                 (Tailwind classes applied)
```

## Environment & Configuration

```
tsconfig.json              → TypeScript settings
next.config.js             → Next.js optimization
package.json               → Scripts & dependencies
.gitignore                 → Git excluded files
```

## Key Files By Purpose

### UI Components
- `src/components/ResumeUpload.tsx` - Upload interface
- `src/components/PortfolioPreview.tsx` - Portfolio display

### State Management
- `src/store/portfolioStore.ts` - Global state

### Logic
- `src/lib/resumeParser.ts` - Data parsing
- `src/app/page.tsx` - Main workflow

### Styling
- `src/app/globals.css` - Styles
- `tailwind.config.ts` - Tailwind config

### Configuration
- `tsconfig.json` - TypeScript
- `next.config.js` - Next.js
- `tailwind.config.ts` - Tailwind
- `postcss.config.js` - PostCSS

## Adding New Features

### To Add a New Section:
1. Update `ResumeData` interface in `portfolioStore.ts`
2. Add editor fields in `PortfolioPreview.tsx`
3. Add display section in `PortfolioPreview.tsx`
4. Update parser in `resumeParser.ts`

### To Add API Integration:
1. Create API route in `src/pages/api/` (or App Router)
2. Create service in `src/lib/`
3. Call from component with try-catch
4. Update store with response

### To Add Animations:
1. Import `motion` from framer-motion
2. Wrap component with `<motion.div>`
3. Add `initial`, `animate`, `transition` props
4. Test in browser

## File Size Reference

- Source code: ~15KB
- Node modules: ~500MB (after npm install)
- Build output: ~2MB
- Production bundle: ~50KB (gzipped)

## Loading Order

1. `package.json` - Dependencies loaded
2. `next.config.js` - Next.js configured
3. `tsconfig.json` - TypeScript settings applied
4. `tailwind.config.ts` - Tailwind initialized
5. `src/app/layout.tsx` - Root layout rendered
6. `src/app/globals.css` - Global styles applied
7. `src/app/page.tsx` - Main page loaded
8. Components rendered in tree order

---

**This structure ensures scalability, maintainability, and clear separation of concerns.**
