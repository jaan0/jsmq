# JSMQ - Professional Web Development Service Platform

A full-stack web application for showcasing web development services, managing portfolios, processing orders, and handling customer communications.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Query** - Server state management
- **Wouter** - Lightweight routing
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animations

### Backend
- **Express** - Web framework
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **MongoDB** - Database (with in-memory fallback)
- **Zod** - Schema validation

### Additional Services
- **Cloudinary** - Image hosting and management
- **Nodemailer** - Email notifications

## 📋 Prerequisites

- Node.js 18+ and npm
- MongoDB instance (optional - falls back to in-memory storage)
- Cloudinary account (optional - for image uploads)
- Email account for SMTP (optional - for email notifications)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jsmq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration (see [Environment Variables](#environment-variables) section).

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5000`

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

### Required
```env
# Session security (generate a strong random string)
SESSION_SECRET=your-super-secret-session-key-min-32-chars

# Application
NODE_ENV=development
PORT=5000
```

### Optional (Database)
```env
# MongoDB connection (optional - uses in-memory storage if not provided)
DATABASE_URL=mongodb://localhost:27017/jsmq_webflow
# Or for MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/jsmq_webflow
```

### Optional (Email)
```env
# Email configuration (optional - emails will be logged to console if not configured)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### Optional (Cloudinary)
```env
# Cloudinary for image uploads (optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_UPLOAD_FOLDER=jsmq
```

### Optional (File Uploads)
```env
# Maximum upload size in bytes (default: 10MB)
UPLOAD_MAX_BYTES=10485760
```

## 📦 Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build both frontend and backend
npm start            # Start production server

# Type Checking
npm run check        # Run TypeScript type checking

# Database
npm run db:push      # Push Drizzle schema to database (if using PostgreSQL)
```

## 🏗️ Project Structure

```
jsmq/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML template
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Storage abstraction layer
│   ├── mongodb.ts         # MongoDB implementation
│   ├── email.ts           # Email service
│   └── cloudinary.ts      # Image upload service
├── shared/                 # Shared code between client and server
│   ├── schema.ts          # Data schemas and types
│   └── siteSettings.ts    # Site configuration schemas
├── api/                    # Vercel serverless function handler
└── design_guidelines.md   # Design system documentation
```

## 🔐 Admin Access

### Development Default Credentials
⚠️ **Important:** Change these in production!

- **Username:** admin
- **Password:** See seeded credentials in `server/storage.ts`
- **Login URL:** `/aj-admin/login`

### Admin Features
- Dashboard with analytics
- Service management (Create, Edit, Delete)
- Portfolio management
- Order tracking and status updates
- Contact message management
- Site settings configuration

## 📱 Features

### Public Features
- Service showcase with detailed descriptions
- Portfolio gallery with project examples
- Contact form
- Order placement with payment method selection
- Responsive design for mobile and desktop
- Dark mode support

### Admin Features
- Comprehensive dashboard with statistics
- Service CRUD operations
- Portfolio CRUD operations
- Order management with status tracking
- Contact message inbox
- Site settings management (contact info, social links, legal pages)
- Image upload to Cloudinary

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

### Environment Variables for Production
Make sure to set all environment variables in your deployment platform:
- `SESSION_SECRET` - **Required**
- `DATABASE_URL` - **Recommended** (MongoDB connection string)
- Email credentials - **Recommended**
- Cloudinary credentials - **Recommended**

### Build Process
```bash
npm run build
```

This will:
1. Build the Vite frontend to `dist/public`
2. Bundle the Express backend to `dist/index.js`

## 🔒 Security Notes

⚠️ **Important Security Considerations:**

1. **Authentication:** Currently, admin routes lack proper authentication middleware. Implement before production deployment.
2. **Environment Variables:** Never commit `.env` file to version control
3. **Session Secret:** Use a strong, random string (minimum 32 characters)
4. **HTTPS:** Always use HTTPS in production
5. **Rate Limiting:** Consider implementing rate limiting for API endpoints
6. **CORS:** Configure CORS appropriately for your domain

See `CODE_REVIEW.md` for comprehensive security recommendations.

## 📚 API Documentation

### Public Endpoints

#### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID

#### Portfolio
- `GET /api/portfolio` - Get all portfolio projects
- `GET /api/portfolio/:id` - Get portfolio project by ID

#### Orders
- `POST /api/orders` - Create a new order

#### Contact
- `POST /api/contact-messages` - Submit contact form

#### Site Settings
- `GET /api/site-settings` - Get public site settings

### Admin Endpoints
⚠️ **Note:** These should be protected with authentication middleware in production

- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `POST /api/portfolio` - Create portfolio project
- `PUT /api/portfolio/:id` - Update portfolio project
- `DELETE /api/portfolio/:id` - Delete portfolio project
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/contact-messages` - Get all contact messages
- `PATCH /api/contact-messages/:id/read` - Mark message as read
- `PUT /api/site-settings` - Update site settings
- `POST /api/upload` - Upload image to Cloudinary

## 🧪 Testing

**Note:** Testing framework not yet implemented. See `CODE_REVIEW.md` for recommendations.

Planned testing stack:
- Vitest for unit/integration tests
- React Testing Library for component tests
- Playwright/Cypress for E2E tests

## 🐛 Known Issues & Limitations

1. **Authentication:** Admin routes are not protected (see Security Notes)
2. **No Pagination:** All data is fetched without pagination
3. **Database Schema:** Drizzle ORM schemas defined but MongoDB is used instead
4. **No Tests:** Test suite needs to be implemented
5. **Rate Limiting:** Not implemented
6. **Error Handling:** Could be more consistent across the application

See `CODE_REVIEW.md` for complete list of issues and recommendations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing TypeScript/React patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure TypeScript types are properly defined

## 📄 License

MIT License - See LICENSE file for details

## 🙋 Support

For questions or issues:
- Create an issue in the repository
- Email: contact@jsmqwebflow.com

## 📊 Project Status

**Current Version:** 1.0.0  
**Status:** Development / MVP  
**Production Ready:** ❌ No (see CODE_REVIEW.md for requirements)

## 🗺️ Roadmap

- [ ] Implement authentication and authorization
- [ ] Add comprehensive test suite
- [ ] Implement pagination for all list endpoints
- [ ] Add rate limiting and security headers
- [ ] Resolve database strategy (PostgreSQL vs MongoDB)
- [ ] Add caching layer
- [ ] Implement proper logging framework
- [ ] Add monitoring and observability
- [ ] Performance optimization
- [ ] Mobile app version

## 🙏 Acknowledgments

- Design inspiration from Stripe and Vercel
- UI components from Radix UI
- Icons from Lucide React

---

**Built with ❤️ by JSMQ Team**
