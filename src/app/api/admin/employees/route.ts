import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Fetch all users from the database
    const users = await User.find();

    // Return the response as JSON
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/admin/employees:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
