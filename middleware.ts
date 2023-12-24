import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse, type NextRequest } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
const afterAuth = (auth: any, req: NextRequest) => {
  // Implement your custom logic here

  // Example: Redirect to /user if a user is authenticated,
  // or to /sign-in if not authenticated:
  // Handle users who aren't authenticated
  if (!auth.userId && !auth.isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  // If the user is logged in and trying to access a protected route, allow them to access route
  if (auth.userId && !auth.isPublicRoute) {
    return NextResponse.next()
  }
  if (auth.userId) {
    // Redirect to the homepage after successful login
    NextResponse.redirect(new URL("/", req.url));
  }
  // Allow users visiting public routes to access them
  return NextResponse.next();
}

export default authMiddleware({
  afterAuth: afterAuth,
  // publicRoutes: ["/sign-in", "/sign-up"]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};