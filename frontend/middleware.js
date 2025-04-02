import { NextResponse } from "next/server";

export function middleware(req) {
    const token = req.cookies.get("jwt"); // Assume token is stored in cookies
    console.log(token);
    const authPages = ["/login", "/signup"]; // Pages that authenticated users shouldn't access
    const protectedRoutes = ["/dashboard", "/profile"]; // Pages that require authentication

    if (token) {
        // Redirect authenticated users away from /login and /signup
        if (authPages.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else {
        // Redirect unauthenticated users away from protected routes
        if (protectedRoutes.includes(req.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next(); // Continue request if no redirection needed
}

export const config = {
    matcher: ["/login", "/signup", "/dashboard", "/profile"],
};
