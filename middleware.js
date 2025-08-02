import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const startTime = Date.now()

  // Protected routes that require authentication
  const protectedRoutes = ['/admin', '/owners', '/appointments', '/profile']
  const adminRoutes = ['/admin']
  const ownerRoutes = ['/owners']

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Check for auth cookie for all routes
  const authCookie = request.cookies.get('auth-user')
  let user = null
  
  if (authCookie) {
    try {
      user = JSON.parse(authCookie.value)
    } catch (error) {
      // Invalid auth cookie - clear it
      const response = NextResponse.next()
      response.cookies.delete('auth-user')
      logRequest(request, 'INVALID_COOKIE', Date.now() - startTime)
      return response
    }
  }

  // Admin redirects for specific routes
  if (user?.role === 'admin') {
    if (pathname === '/properties' && !pathname.startsWith('/properties/')) {
      logRequest(request, 'ADMIN_REDIRECT', Date.now() - startTime, '/admin/properties')
      return NextResponse.redirect(new URL('/admin/properties', request.url))
    }
    if (pathname === '/appointments') {
      logRequest(request, 'ADMIN_REDIRECT', Date.now() - startTime, '/admin/appointments')
      return NextResponse.redirect(new URL('/admin/appointments', request.url))
    }
  }

  // Authentication check for protected routes
  if (isProtectedRoute) {
    if (!authCookie || !user) {
      logRequest(request, 'AUTH_REQUIRED', Date.now() - startTime, '/login')
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role-based access control
    if (adminRoutes.some(route => pathname.startsWith(route)) && user.role !== 'admin') {
      logRequest(request, 'ACCESS_DENIED', Date.now() - startTime, '/properties')
      return NextResponse.redirect(new URL('/properties', request.url))
    }
    
    if (ownerRoutes.some(route => pathname.startsWith(route)) && user.role !== 'owner') {
      logRequest(request, 'ACCESS_DENIED', Date.now() - startTime, '/properties')
      return NextResponse.redirect(new URL('/properties', request.url))
    }

    logRequest(request, 'AUTHORIZED', Date.now() - startTime, null, user)
  } else {
    logRequest(request, 'PUBLIC', Date.now() - startTime)
  }

  return NextResponse.next()
}

function logRequest(request, status, duration, redirectTo = null, user = null) {
  if (process.env.NODE_ENV === 'development') {
    const timestamp = new Date().toISOString()
    const { pathname, search } = request.nextUrl
    const method = request.method
    const userAgent = request.headers.get('user-agent')?.slice(0, 50) || 'Unknown'
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'Unknown'
    
    console.log(`
🔒 [MIDDLEWARE] ${timestamp}
📍 ${method} ${pathname}${search}
👤 User: ${user ? `${user.name} (${user.role})` : 'Anonymous'}
🌐 IP: ${ip}
🖥️  UA: ${userAgent}
⚡ Status: ${status}
⏱️  Duration: ${duration}ms
${redirectTo ? `🔄 Redirect: ${redirectTo}` : ''}
${'─'.repeat(60)}`)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|sitemap.xml|robots.txt).*)',
  ],
}