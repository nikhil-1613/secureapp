


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// Define the custom type for the decoded token
interface CustomJwtPayload {
  email: string;
  id: string;
  isAdmin: Boolean;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/signup';

  const token = request.cookies.get('token')?.value || '';

  // console.log("This is the token:", token);

  // Allow access to public paths without token verification
  if (isPublicPath) {
    return NextResponse.next();
  }

  try {
    if (token !== '') {
      // Verify the token
      const decoded = verify(token, process.env.JWT_SECRET || 'default_secret') as CustomJwtPayload;

      // Redirect based on user role
      if (path === '/' || path === '') {
        if (decoded.isAdmin) {
          return NextResponse.redirect(new URL('/adminHome', request.nextUrl));
        } else {
          return NextResponse.redirect(new URL('/home', request.nextUrl));
        }
      }
    } else {
      // If token is missing, redirect unauthenticated users
      if (path !== '/home' && path !== '/login' && path !== '/signup') {
        return NextResponse.redirect(new URL('/home', request.nextUrl));
      }
    }
  } catch (error) {
    console.error("Token verification failed:", error);

    // Redirect unauthenticated users to /home
    if (path !== '/home' && path !== '/login' && path !== '/signup') {
      return NextResponse.redirect(new URL('/home', request.nextUrl));
    }
  }

  // Default response for valid paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',           // Root path
    // '/profile',    // Protected path
    '/adminhome',  // Protected path
    '/home',       // Protected path
    '/login',      // Public path
    '/signup',     // Public path
  ],
};
