import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
interface sessionData {
    session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    };
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    };
}

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    }) as sessionData | null

    const { pathname } = request.nextUrl;
    if (session && pathname === "/login" || session && pathname === "/register") {
        return NextResponse.redirect(new URL("/", request.url));
    } else if (!session) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}


export const config = {
    matcher: ["/dashboard","/addpizza"],
};