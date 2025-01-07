import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await connect();

        // Parse the request body
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Validate the password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Prepare token data
        const tokenData = {
            id: user._id,
            email: user.email,
        };

        // Generate JWT token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        // Create the response with the token in the cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // Set the token in the response cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // use secure cookies in production
            sameSite: "strict", // Optional: to prevent CSRF attacks
        });

        return response;

    } catch (error: any) {
        // Log the error and return a generic message for 500 errors
        console.error("Error in POST /api/users/login:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest,NextResponse } from "next/server";
// import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"
// export async function POST(request: NextRequest) {
//     try {
//         await connect()
//         const reqBody = await request.json()
//         const { email, password } = reqBody;

//         //checking user exists or not
//         const user = await User.findOne({ email })
//         if (!user) {
//             return NextResponse.json({ error: "user does not exists" }, { status: 400 })
//         }

//         const validPassword = await bcryptjs.compare(password, user.password)
//         if (!validPassword) {
//             return NextResponse.json({ error: "Invalid password" },
//                 { status: 400 }
//             )
//         }
//         //creating token data
//         const tokenData = {
//             id: user._id,
//             email: user.email
//         }
//         //creating token
//         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })
//         const response = NextResponse.json({
//             message: "Login successfull",
//             success: true,
//         })
//         response.cookies.set("token", token, {
//             httpOnly: true,
//         })

//         return response

//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }),
//             { status: 500 }
//     }
// }