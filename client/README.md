# Hope Foundation - Frontend

A modern, professional welfare organization website with an admin panel built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- Modern, responsive public website (Home, About, Projects, Donate, Gallery, News, Contact)
- Online donation system with JazzCash, EasyPaisa, and Bank Transfer support
- Complete admin dashboard with CRUD operations
- JWT-based authentication for admin
- Framer Motion animations
- SEO optimized with react-helmet-async
- Image gallery with lightbox
- Contact form with admin management

## Tech Stack

- **React 19** with **Vite**
- **Tailwind CSS** for styling
- **React Router DOM** for routing
- **Axios** for API calls
- **Framer Motion** for animations
- **React Icons** for icons
- **react-helmet-async** for SEO

## Project Structure

```
client/
├── public/
│   ├── images/
│   ├── icons/
│   └── banners/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── animations/
│   ├── components/
│   │   ├── common/       # Navbar, Footer, Loader, Button, Modal, etc.
│   │   ├── home/         # HeroSection, StatsSection, FeaturedProjects, etc.
│   │   ├── donation/     # DonationForm, PaymentMethods, DonationCard
│   │   ├── projects/     # ProjectCard, ProjectGrid, ProjectDetails
│   │   ├── gallery/      # GalleryGrid, GalleryImage
│   │   ├── news/         # NewsCard, NewsDetails
│   │   ├── contact/      # ContactForm
│   │   └── admin/        # AdminSidebar, DashboardCards, Tables, UploadForm
│   ├── pages/
│   │   ├── public/       # Home, About, Projects, Donate, Gallery, News, Contact
│   │   └── admin/        # Login, Dashboard, ManageProjects/Donations/Gallery/News/Messages
│   ├── layouts/          # MainLayout, AdminLayout
│   ├── routes/           # AppRoutes, ProtectedRoute
│   ├── services/         # API config, authService, projectService, etc.
│   ├── context/          # AuthContext, ThemeContext
│   ├── hooks/            # useAuth, useFetch, useTheme
│   ├── utils/            # formatDate, truncateText, toast, constants
│   ├── styles/           # Tailwind CSS, animations
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

\`\`\`bash
cd client
npm install
\`\`\`

### Environment Variables

Copy \`.env.example\` to \`.env\` and adjust:

\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

The app runs at \`http://localhost:5173\`. API requests are proxied to \`http://localhost:5000\`.

### Build

\`\`\`bash
npm run build
\`\`\`

## Admin Panel

Navigate to \`/admin/login\` and sign in with admin credentials.

- **Dashboard** - Overview with stats cards
- **Projects** - CRUD for welfare projects
- **Donations** - View and manage donations
- **Gallery** - Upload/manage images
- **News** - Create/manage news updates
- **Messages** - View contact form submissions
- **Settings** - Update website information

## API

The frontend expects a REST API at the configured \`VITE_API_URL\`. See the backend documentation for API endpoints.

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Set root directory to \`client\`
4. Set env variables
5. Deploy
