import { NextResponse } from "next/server";

import { logoutAction } from "@/services/auth/logout.action";

export async function GET(request: Request) {
    await logoutAction();
    return NextResponse.redirect(new URL("/", request.url));
}