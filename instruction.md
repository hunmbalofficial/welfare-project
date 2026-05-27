# PROJECT TITLE

Create a complete professional Welfare Organization Website with Admin Panel.

# TECH STACK

Frontend:
- React.js with Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion

Backend:
- Node.js
- Express.js

Database:
- MongoDB Atlas
- Mongoose

Authentication:
- Admin Login Only
- JWT Authentication for Admin

Hosting:
- Frontend ready for Vercel
- Backend ready for Render

# WEBSITE TYPE

Modern NGO / Welfare / Charity Website

# MAIN REQUIREMENTS

The website must:
- Look modern and professional
- Be fully responsive
- Have online donation system
- Have admin dashboard
- Allow admin to upload posts/projects
- Allow admin to delete/edit posts
- Allow admin to update website content
- Be SEO optimized
- Use reusable components
- Follow clean architecture

# PUBLIC WEBSITE PAGES

1. Home
2. About Us
3. Our Projects
4. Donate
5. Gallery
6. Contact
7. News / Updates
8. Volunteer Information

# HOME PAGE SECTIONS

- Hero Section
- Welfare Statistics
- Featured Projects
- Donation CTA
- Latest Updates
- Testimonials
- Footer

# UI REQUIREMENTS

Use:
- Tailwind CSS
- Modern layouts
- Framer Motion animations
- Mobile responsive design
- Professional color palette
- Sticky navbar
- Clean footer
- Loading animations

# COMPONENTS

Create reusable React components:

- Navbar
- Footer
- HeroSection
- DonationCard
- ProjectCard
- UpdateCard
- GallerySection
- ContactForm
- Loader
- Modal
- AdminSidebar

# BACKEND REQUIREMENTS

Use Node.js + Express.js.

# BACKEND STRUCTURE

backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── server.js

# DATABASE MODELS

Create MongoDB models:

1. Admin
2. Donation
3. Project
4. NewsUpdate
5. Gallery
6. ContactMessage

# ADMIN MODEL

Fields:
- email
- password
- createdAt

# DONATION MODEL

Fields:
- donorName
- donorEmail
- amount
- paymentMethod
- transactionId
- message
- createdAt

# PROJECT MODEL

Fields:
- title
- description
- image
- targetAmount
- collectedAmount
- category
- createdAt

# NEWS UPDATE MODEL

Fields:
- title
- content
- image
- createdAt

# GALLERY MODEL

Fields:
- image
- caption
- createdAt

# CONTACT MODEL

Fields:
- name
- email
- message
- createdAt

# ADMIN PANEL FEATURES

Create a professional admin dashboard.

Admin should be able to:

- Login securely
- Add new projects
- Edit projects
- Delete projects
- Upload gallery images
- Add news updates
- Delete news updates
- View donations
- Manage contact messages
- Update homepage content
- Upload banners
- Manage website sections

# ADMIN DASHBOARD UI

Include:
- Sidebar navigation
- Dashboard analytics cards
- Charts
- Responsive tables
- Image upload system
- Toast notifications

# PAYMENT / DONATION SYSTEM

Implement donation system.

Donation page should:
- Accept donor name
- Accept donor email
- Accept donation amount
- Accept payment screenshot OR transaction ID

# PAYMENT METHODS

Prepare system for:
- JazzCash
- EasyPaisa
- Bank Transfer

# FILE UPLOAD SYSTEM

Use multer for:
- Project images
- Gallery images
- Banner uploads

# API REQUIREMENTS

Create REST APIs.

## Admin APIs

- Admin login
- Protected admin routes

## Project APIs

- Create project
- Update project
- Delete project
- Get all projects

## Donation APIs

- Submit donation
- Get donations
- Delete donation

## Gallery APIs

- Upload image
- Delete image
- Get images

## News APIs

- Create news post
- Update news
- Delete news
- Get news

## Contact APIs

- Send message
- Get messages
- Delete message

# SECURITY

Implement:
- JWT Authentication for admin
- bcryptjs password hashing
- Environment variables
- Protected admin routes
- Input validation
- Error handling middleware

# SEO

Implement:
- Meta tags
- Proper headings
- Fast image loading
- SEO-friendly structure

# PERFORMANCE

Optimize:
- Lazy loading
- Code splitting
- Optimized API calls

# DEPLOYMENT READY

Prepare project for:
- Vercel frontend deployment
- Render backend deployment
- MongoDB Atlas integration

# OUTPUT REQUIREMENTS

Generate:
1. Complete frontend code
2. Complete backend code
3. Complete admin dashboard
4. Folder structure
5. Installation guide
6. README.md
7. API documentation
8. Deployment guide
9. Environment variable examples
10. Production-ready code

# FINAL REQUIREMENTS

The project must:
- Be modern
- Be scalable
- Be production ready
- Use reusable components
- Use clean code
- Follow best practices
- Be beginner friendly