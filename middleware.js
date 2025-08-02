import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/owners', '/appointments']
  const adminRoutes = ['/admin']
  const ownerRoutes = ['/owners']
  const publicRoutes = ['/login', '/register', '/properties', '/']

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // Check for auth cookie for all routes (to handle admin redirects)
  const authCookie = request.cookies.get('auth-user')
  let user = null
  
  if (authCookie) {
    try {
      user = JSON.parse(authCookie.value)
    } catch (error) {
      // Invalid auth cookie
    }
  }

  // Admin redirects for specific routes
  if (user?.role === 'admin') {
    if (pathname === '/properties' && !pathname.startsWith('/properties/')) {
      return NextResponse.redirect(new URL('/admin/properties', request.url))
    }
    if (pathname === '/appointments') {
      return NextResponse.redirect(new URL('/admin/appointments', request.url))
    }
  }

  if (isProtectedRoute) {
    if (!authCookie || !user) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Check role-based access
    if (adminRoutes.some(route => pathname.startsWith(route)) && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/properties', request.url))
    }
    
    if (ownerRoutes.some(route => pathname.startsWith(route)) && user.role !== 'owner') {
      return NextResponse.redirect(new URL('/properties', request.url))
    }
  }


  // Log requests in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}