import { connect } from "@/dbConfig/dbConfig";
import Details from "@/models/userDetails"
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    await connect();
    try {
        const reqbody = await request.json();
        const { userName, email, workingLocation, shiftTimings } = reqbody;

        // Validate input fields
        if (!userName || !email || !workingLocation || !shiftTimings) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        //check if user already exists
        const userExists = await Details.findOne({ email });
        if (userExists) {
            return NextResponse.json(
                { error: "User details already exist for this email." },
                { status: 400 }
            );
        }

        const newDetails = new Details({
            userName,
            email,
            workingLocation,
            shiftTimings
        });
        const savedDetails = await newDetails.save();
        return NextResponse.json(
            { message: "User details submitted successfully", success: true },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }

}