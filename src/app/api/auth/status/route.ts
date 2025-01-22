import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ isLoggedIn: false });
        }

        jwt.verify(token, process.env.TOKEN_SECRET!);

        return NextResponse.json({ isLoggedIn: true });
    } catch (error) {
        return NextResponse.json({ isLoggedIn: false });
    }
}
