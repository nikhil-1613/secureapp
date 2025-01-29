import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { AxiosError } from "axios";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ isLoggedIn: false });
        }

        jwt.verify(token, process.env.TOKEN_SECRET!);

        return NextResponse.json({ isLoggedIn: true });
    } catch (error: unknown) {
        console.log("Login failed", error);
    
        if (error instanceof AxiosError && error.response?.data?.error) {
            console.log(error.response.data.error);
        } else if (error instanceof Error) {
            console.log(error.message || "Something went wrong. Please try again.");
        } else {
            console.log("An unknown error occurred.");
        }
    }
}
