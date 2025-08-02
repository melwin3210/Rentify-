# Rentify - Rental Property Management Platform

A comprehensive Next.js application for managing rental properties with features for property owners, tenants, and administrators.

## Features

- 🏠 Property listing and management
- 👥 User authentication (Admin, Owner, Tenant roles)
- 📅 Appointment booking system
- 🔧 Admin dashboard for platform management
- 🌍 Internationalization (English, Spanish, French)
- 📱 Responsive design
- 🔍 SEO optimized
- ✅ Comprehensive testing

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: JSON Server (development)
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd rentify
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Start the development servers
```bash
# Start both Next.js and JSON Server
npm run dev:full

# Or start separately
npm run json-server  # Port 3001
npm run dev          # Port 3000
```

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run json-server` - Start JSON Server backend
- `npm run dev:full` - Start both servers concurrently
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run deploy` - Deploy to Vercel
- `npm run preview` - Create Vercel preview deployment

## Deployment

### Local Development
```bash
npm run dev:full
```

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `npm run deploy`

### Environment Variables for Production
Set these in your Vercel dashboard:
- `NEXT_PUBLIC_API_URL` - Your production API URL
- `NEXT_PUBLIC_APP_URL` - Your production app URL

## User Roles & Access

### Demo Accounts
- **Admin**: admin1@rentify.com / admin123
- **Owner**: owner4@rentify.com / owner123  
- **Tenant**: tenant8@rentify.com / tenant123

### Role Permissions
- **Admin**: Full platform management, user verification, property approval
- **Owner**: Property management, appointment handling
- **Tenant**: Property browsing, appointment booking

## API Endpoints

- `GET /users` - Get all users
- `GET /properties` - Get all properties
- `GET /appointments` - Get all appointments
- `POST /users` - Create user
- `POST /properties` - Create property
- `POST /appointments` - Create appointment
- `PATCH /properties/:id` - Update property verification
- `DELETE /users/:id` - Delete user

## Testing

Run the test suite:
```bash
npm run test
npm run test:coverage
```

## Project Structure

```
rentify/
├── app/                    # Next.js App Router pages
├── components/             # Reusable components
├── hooks/                  # Custom hooks
├── lib/                    # Utilities and API
├── redux/                  # State management
├── tests/                  # Test files
├── public/                 # Static assets
└── db.json                # JSON Server database
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.