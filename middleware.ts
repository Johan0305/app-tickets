import { NextRequest, NextResponse } from "next/server";

//Middleware para manejo de autenticación por Cookies

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  //Si el usuario está en el path '/' y ya tiene un registro de Token en las cookies le da acceso a la aplicación, si está en cualquier otra dirección y no tiene el token, este lo redirige al login
  if (token && pathname === "/") {
    return NextResponse.rewrite(new URL("/dashboard", request.url));
  }

  if (pathname !== "/" && !token) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
