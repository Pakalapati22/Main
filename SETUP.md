# Portfolio Builder - Setup Guide

## Project Overview
A modern, Netflix-style portfolio builder that allows users to upload their resume and automatically generate a professional portfolio website.

## Features
- ✨ Resume Upload (PDF, DOCX, DOC, TXT)
- 🎨 Netflix-inspired Dark Theme UI
- 🚀 AI-powered resume parsing
- 📱 Responsive Design
- ✏️ Live Portfolio Customization
- 🎬 Smooth Animations & Transitions
- 📊 Skills Showcase
- 💼 Experience Timeline
- 🎓 Education Display
- 📁 Project Gallery

## Prerequisites
- Node.js 18+ 
- npm or yarn

## Installation

### 1. Install Node.js
If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org)

### 2. Install Dependencies
```bash
cd /Users/nareshpakalapati/Main
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure
```
Main/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── globals.css         # Global styles & animations
│   │   └── page.tsx            # Main portfolio builder page
│   ├── components/
│   │   ├── ResumeUpload.tsx    # Resume file upload component
│   │   └── PortfolioPreview.tsx # Portfolio preview & editor
│   ├── lib/
│   │   └── resumeParser.ts     # Resume parsing logic
│   └── store/
│       └── portfolioStore.ts   # Zustand state management
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── .gitignore
```

## How to Use

### Step 1: Upload Resume
1. Drag and drop your resume or click to browse
2. Supported formats: PDF, DOCX, DOC, TXT
3. The system will parse and extract information

### Step 2: Customize Portfolio
1. Edit your name, email, and headline
2. Modify sections as needed
3. Preview changes in real-time

### Step 3: Preview & Publish
1. View final portfolio design
2. Click links to test functionality
3. Export or deploy your portfolio

## Technology Stack
- **Frontend Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **PDF Processing**: PDF.js
- **Icons**: React Icons
- **Language**: TypeScript

## Customization

### Change Color Scheme
Edit `tailwind.config.ts` to modify Netflix-style colors:
```typescript
netflix: {
  black: '#141414',
  dark: '#1a1a1a',
  red: '#e50914',
}
```

### Add New Portfolio Sections
Edit `src/store/portfolioStore.ts` to extend `ResumeData` interface

### Modify Resume Parser
Update `src/lib/resumeParser.ts` for custom extraction logic

## Building for Production
```bash
npm run build
npm start
```

## Deployment Options
- Vercel (recommended)
- Netlify
- AWS Amplify
- GitHub Pages

## Environment Variables (Optional)
Create `.env.local`:
```
NEXT_PUBLIC_APP_NAME=Portfolio Builder
NEXT_PUBLIC_API_URL=your-api-url
```

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Module Not Found Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### CSS Not Loading
Make sure Tailwind CSS is properly configured and PostCSS is installed.

## Contributing
Feel free to extend the portfolio builder with:
- Backend resume parsing API
- Social media integration
- More portfolio themes
- Export to PDF functionality
- Domain publishing

## License
MIT License

## Support
For issues or questions, refer to the documentation or create an issue in the repository.
