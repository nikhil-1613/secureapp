import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
    try {
        // Connect to the database
        await connect();

        // Extract the email from the query parameters
        const email = request.nextUrl.searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "Email is required to fetch profile details." },
                { status: 400 }
            );
        }

        // Fetch the user details from the database by email
        const user = await User.findOne({ email }).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 }
            );
        }

        // Return the user details
        return NextResponse.json({
            success: true,
            user,
        });
    } catch (error: any) {
        console.error("Error in GET /api/users/profile:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
