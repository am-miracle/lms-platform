import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth: any, request: NextRequest) => {
    if(!isPublicRoute(request)) {
      auth().protect();
    }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};