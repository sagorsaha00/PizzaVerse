import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";
    const { pathname } = request.nextUrl;
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!isLoggedIn && (pathname === "/dashboard" || pathname === "/addpizza")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/dashboard", "/addpizza", "/login", "/register"],
};
