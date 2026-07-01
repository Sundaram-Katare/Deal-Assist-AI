import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/api/chat(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    // 1. Force unauthenticated users to sign in
    auth.protect();

    // 2. Multi-tenancy check: Ensure the user has selected an active organization
    const { orgId }: any = auth();
    
    // If they are trying to access the dashboard but haven't selected an org, redirect them
    // (In a full app, you might redirect them to an /onboarding or /select-org page)
    if (!orgId && req.nextUrl.pathname.startsWith("/dashboard")) {
      // For now, we will let Clerk's internal redirect logic handle missing orgs, 
      // but this is where you would enforce strict org boundaries at the edge.
      console.warn("User accessed dashboard without an active Organization ID");
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
