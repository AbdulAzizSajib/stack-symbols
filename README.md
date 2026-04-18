# Skill Symbols

A modern web application for managing, sanitizing, and sharing SVG icons and symbols. Built with Next.js, featuring secure SVG upload, validation, and comprehensive analytics.

## 🚀 Features

### Core Functionality
- **SVG Upload & Management**: Upload, store, and manage SVG files with ease
- **Security-First Approach**: Automatic sanitization of SVGs to remove malicious scripts and event handlers
- **Cloud Storage Integration**: CDN-powered delivery via Cloudinary
- **Advanced Analytics**: Track views, copies, embeds, and usage patterns
- **Request System**: Users can request new SVG symbols to be added

### User Features
- **Authentication**: Secure user authentication with multiple provider support
- **Role-Based Access**: User and Admin roles with different permissions
- **Public/Private Visibility**: Control who can see your uploaded SVGs
- **Usage Statistics**: Detailed analytics for each SVG file
- **Easy Sharing**: Copy links, embed codes, and share SVGs effortlessly

### Technical Features
- **SVG Sanitization**: Automatic removal of malicious content from uploaded SVGs
- **Validation Logging**: Detailed validation logs for security auditing
- **CDN Integration**: Optimized delivery through Cloudinary
- **Geographic Analytics**: Track usage by country (optional)
- **Performance Optimized**: Built with Next.js for optimal performance

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom auth system with multiple providers
- **Storage**: Cloudinary CDN
- **Validation**: DOMPurify for SVG sanitization
- **Styling**: Tailwind CSS
- **Analytics**: Custom analytics tracking system

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18.x or later
- PostgreSQL 14.x or later
- npm or yarn package manager
- Cloudinary account (for CDN storage)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skill-symbols
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/skill_symbols"

   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   # Optional: OAuth Providers
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"
   GOOGLE_ID="your-google-client-id"
   GOOGLE_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run migrations
   npx prisma migrate dev --name init

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
skill-symbols/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── dashboard/    # User dashboard
│   │   ├── svg/          # SVG viewing pages
│   │   └── ...
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   │   ├── auth/        # Authentication utilities
│   │   ├── svg/         # SVG processing utilities
│   │   └── validation/  # Validation schemas
│   ├── generated/       # Generated code (Prisma client)
│   └── styles/          # Global styles
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Database migrations
│   └── seed.ts         # Database seed script
├── public/              # Static assets
└── package.json
```

## 🔒 Security Features

### SVG Sanitization
All uploaded SVGs undergo rigorous sanitization:
- Removal of `<script>` tags and event handlers
- Stripping of potentially dangerous attributes
- Validation against a strict allowlist of SVG elements
- Detailed logging of all validation actions

### Authentication & Authorization
- Secure session management
- Password hashing with bcrypt
- Role-based access control (User/Admin)
- Rate limiting on sensitive endpoints

## 📊 Database Schema

The application uses a comprehensive PostgreSQL database with the following main models:

- **User**: User accounts and authentication
- **SvgFile**: Uploaded SVG files with metadata
- **UsageEvent**: Analytics tracking for SVG usage
- **RequestSvg**: User requests for new SVG symbols
- **Session**: User session management
- **Account**: OAuth provider accounts

See `prisma/schema.prisma` for the complete schema definition.

## 🚦 API Routes

### Public Endpoints
- `GET /api/svg/[slug]` - Get SVG by slug
- `GET /api/svg/recent` - List recent public SVGs
- `POST /api/svg/request` - Request a new SVG symbol

### Authenticated Endpoints
- `POST /api/svg/upload` - Upload new SVG
- `PUT /api/svg/[id]` - Update SVG metadata
- `DELETE /api/svg/[id]` - Delete SVG
- `GET /api/svg/[id]/analytics` - Get SVG analytics

### Admin Endpoints
- `GET /api/admin/requests` - List all SVG requests
- `PUT /api/admin/requests/[id]` - Update request status
- `GET /api/admin/users` - Manage users

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run e2e tests
npm run test:e2e
```

## 📦 Deployment

### Deploying to Vercel

1. Push your code to a Git repository
2. Import the project to Vercel
3. Configure environment variables
4. Deploy!

### Database Migration in Production
```bash
npx prisma migrate deploy
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DOMPurify](https://github.com/cure53/DOMPurify) for SVG sanitization
- [Cloudinary](https://cloudinary.com) for CDN services
- [Prisma](https://prisma.io) for database ORM
- [Next.js](https://nextjs.org) team for the amazing framework

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Built with ❤️ using Next.js