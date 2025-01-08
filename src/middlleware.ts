import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup'

    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))

    }

    }
    
    // Move the config export outside the middleware function
    export const config = {
        matcher: [
            '/',
            '/profile',
            '/login',
            '/signup',
        ],
    }
    
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { verify, JwtPayload } from 'jsonwebtoken';

// // Define the custom type for the decoded token
// interface CustomJwtPayload extends JwtPayload {
//   email: string;
//   id: string;
// }

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === '/login' || path === '/signup';

//   const token = request.cookies.get('token')?.value || '';

//   // Check for a valid token
//   if (token) {
//     try {
//       // Decode the token and cast it to CustomJwtPayload
//       const decodedToken = verify(token, process.env.TOKEN_SECRET!) as CustomJwtPayload;
//       const { email } = decodedToken;

//       // Redirect admin users to /adminhome
//       if (email === 'admin123@gmail.com') {
//         if (path !== '/adminhome') {
//           return NextResponse.redirect(new URL('/adminhome', request.nextUrl));
//         }
//       }
//       // Redirect non-admin users to /home
//       else {
//         if (path !== '/home') {
//           return NextResponse.redirect(new URL('/home', request.nextUrl));
//         }
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       // If token verification fails, redirect to login
//       return NextResponse.redirect(new URL('/login', request.nextUrl));
//     }
//   }

//   // Handle cases where the user tries to access public pages while logged in
//   if (isPublicPath && token) {
//     try {
//       const decodedToken = verify(token, process.env.TOKEN_SECRET!) as CustomJwtPayload;
//       const { email } = decodedToken;

//       if (email === 'admin123@gmail.com') {
//         return NextResponse.redirect(new URL('/adminhome', request.nextUrl));
//       } else {
//         return NextResponse.redirect(new URL('/home', request.nextUrl));
//       }
//     } catch (error) {
//       console.error('Error verifying token:', error);
//       // Allow access to public pages if token verification fails
//     }
//   }

//   // Redirect unauthenticated users trying to access protected pages
//   if (!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl));
//   }
// }

// // Configuration for the middleware
// export const config = {
//   matcher: [
//     '/',
//     '/profile',
//     '/adminhome',
//     '/home',
//     '/login',
//     '/signup',
//   ],
// };

