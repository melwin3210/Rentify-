# Rentify - Simple JavaScript Project

A property rental platform built with Next.js and JavaScript.

## Features

- Property listings and search
- User authentication (owners, tenants, admin)
- Property management for owners
- Appointment booking system
- Admin dashboard
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15
- **Language**: JavaScript (converted from TypeScript)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Redux Toolkit
- **Icons**: Lucide React
- **Mock API**: JSON Server

## Getting Started

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Start the development server:
```bash
npm run dev
```

3. Start the JSON server (in a separate terminal):
```bash
npm run json-server
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run json-server` - Start mock API server

## Project Structure

```
├── app/                 # Next.js app directory
├── components/          # Reusable components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── redux/              # Redux store and slices
├── public/             # Static assets
└── styles/             # Global styles
```

## API Routes

- `/api/properties` - Property management
- `/api/appointments` - Appointment booking

## Authentication

The app includes role-based authentication:
- **Admin**: Full access to all features
- **Owner**: Property management and appointments
- **Tenant**: Property browsing and booking

## Notes

This project has been converted from TypeScript to JavaScript for simplicity. All TypeScript-specific syntax and type annotations have been removed while maintaining full functionality.