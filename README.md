# Portfolio

A modern, responsive portfolio website built with React and TypeScript.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive layout
- ⚡ Fast performance with Vite
- 🔒 Type-safe with TypeScript
- 🎯 Smooth scrolling navigation
- 📧 Contact form

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Contact Form Setup

The contact form uses EmailJS to send emails directly. To enable it:

1. **Quick Setup (5 minutes):**
   - See `QUICK_SETUP.md` or `SETUP_EMAILJS.txt` for step-by-step instructions
   - Sign up at https://www.emailjs.com/ (free account)
   - Create service, template, and get your Public Key
   - Create a `.env` file with your credentials (see `.env.example`)

2. **After setup:**
   - Restart your dev server
   - The form will send emails directly to your inbox!

## Customization

1. Update personal information in:
   - `src/components/Hero.tsx` - Name and title
   - `src/components/About.tsx` - About section
   - `src/components/Skills.tsx` - Skills list
   - `src/components/Projects.tsx` - Projects
   - `src/components/Contact.tsx` - Contact information

2. Modify colors and styling in the respective CSS files

3. Add your own projects and update the projects array in `Projects.tsx`

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3

## License

MIT

