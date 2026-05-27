# Hope Foundation - Backend API

Node.js + Express.js backend for the Hope Foundation welfare website.

## Tech Stack

- **Express.js** - Web framework
- **@seald-io/nedb** - Embedded file-based database (MongoDB-compatible API, no setup needed)
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File uploads

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database adapter (NeDB collections)
├── controllers/
│   ├── adminController.js  # Login, profile
│   ├── projectController.js # CRUD projects
│   ├── donationController.js # Submit, list, delete donations
│   ├── galleryController.js  # Upload, list, delete images
│   ├── newsController.js    # CRUD news
│   └── contactController.js # Send, list, delete messages
├── middleware/
│   ├── auth.js             # JWT protection
│   ├── errorMiddleware.js  # Error handler
│   └── upload.js           # Multer config
├── models/
│   ├── Admin.js
│   ├── Project.js
│   ├── Donation.js
│   ├── Gallery.js
│   ├── NewsUpdate.js
│   └── ContactMessage.js
├── routes/
│   ├── adminRoutes.js
│   ├── projectRoutes.js
│   ├── donationRoutes.js
│   ├── galleryRoutes.js
│   ├── newsRoutes.js
│   └── contactRoutes.js
├── uploads/                # Uploaded files
├── server.js               # Entry point
├── seed.js                 # Create default admin
├── .env
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
cd backend
npm install
```

### Seed Default Admin

```bash
npm run seed
```

Default credentials:
- Email: `admin@hopefoundation.org`
- Password: `admin123`

### Development

```bash
npm run dev
```

Server starts at `http://localhost:5000`. No database setup required — data is stored as files in `data/` directory.

### Production (MongoDB Atlas)

To switch from NeDB to MongoDB Atlas:

1. Update `config/db.js` to use Mongoose
2. Add your MongoDB URI to `.env`: `MONGO_URI=mongodb+srv://...`
3. The controllers are designed to work with both NeDB and Mongoose interfaces

## API Endpoints

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/login` | No | Admin login |
| GET | `/api/admin/profile` | Yes | Get profile |

### Projects
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | No | Get all projects |
| GET | `/api/projects/:id` | No | Get single project |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |

### Donations
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/donations` | No | Submit donation |
| GET | `/api/donations` | Yes | Get all donations |
| DELETE | `/api/donations/:id` | Yes | Delete donation |

### Gallery
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gallery` | No | Get all images |
| POST | `/api/gallery` | Yes | Upload image |
| DELETE | `/api/gallery/:id` | Yes | Delete image |

### News
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/news` | No | Get all news |
| GET | `/api/news/:id` | No | Get single news |
| POST | `/api/news` | Yes | Create news |
| PUT | `/api/news/:id` | Yes | Update news |
| DELETE | `/api/news/:id` | Yes | Delete news |

### Contact
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | No | Send message |
| GET | `/api/contact` | Yes | Get messages |
| DELETE | `/api/contact/:id` | Yes | Delete message |

## Deployment (Render)

1. Push to GitHub
2. Create a new Web Service on Render
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables in Render dashboard
7. For production, update to MongoDB Atlas
