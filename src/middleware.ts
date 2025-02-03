import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher("/");                 //  Protege todas las rutas


export default clerkMiddleware(                                   // El middleware Se ejecuta la función antes de cada solicitud en Next.js.
  async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();              // Si la solicitud es una ruta protegida, se comprueba si el usuario tiene una session activa en clerk.
  },
  {                                                               // Si el usuario no está autenticado, será redirigido a sign-in o sign-up.
    signInUrl: "/sign-in",
    signUpUrl: "/sign-up",
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};