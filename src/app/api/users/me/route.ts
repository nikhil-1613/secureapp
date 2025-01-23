import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import getDataFromToken from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    // Extract and validate token
    const id = await getDataFromToken(request);

    // Find user by ID and exclude the password field
    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// import getDataFromToken from '@/helpers/getDataFromToken';
// import { NextRequest,NextResponse } from 'next/server';
// import User from '@/models/userModel';
// import { connect } from '@/dbConfig/dbConfig';


// connect();

// export async function GET(request: NextRequest) {
//     try {
//         const id = await getDataFromToken(request);
//         const user = await User.findOne({_id:id}).select("-password");           
//         return NextResponse.json({
//             message:"User found",
//             data:user
//         });
//     }
//     catch (error) {
//         return NextResponse.json({error:"User not found"},{status:404});
//     }   
// }