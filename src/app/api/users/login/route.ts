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

        // Validate input fields
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist." },
                { status: 404 }
            );
        }

        // Validate the password
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid password." },
                { status: 401 }
            );
        }

        // Create token payload
        const tokenData = {
            id: user._id,
            email: user.email,
        };

        // Generate JWT
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1h",
        });

        // Create a response with the token as an HTTP-only cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookies in production
            sameSite: "strict", // Mitigate CSRF attacks
            maxAge: 3600, // Token expiration in seconds (1 hour)
        });

        return response;
    } catch (error: any) {
        console.error("Error in POST /api/users/login:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error." },
            { status: 500 }
        );
    }
}

// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(request: NextRequest) {
//     try {
//         // Connect to the database
//         await connect();

//         // Parse the request body
//         const reqBody = await request.json();
//         const { email, password } = reqBody;

//         // Check if the user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" }, { status: 400 });
//         }

//         // Validate the password
//         const validPassword = await bcryptjs.compare(password, user.password);
//         if (!validPassword) {
//             return NextResponse.json({ error: "Invalid password" }, { status: 400 });
//         }

//         // Prepare token data
//         const tokenData = {
//             id: user._id,
//             email: user.email,
//         };

//         // Generate JWT token
//         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

//         // Create the response with the token in the cookie
//         const response = NextResponse.json({
//             message: "Login successful",
//             success: true,
//         });

//         // Set the token in the response cookies
//         response.cookies.set("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", // use secure cookies in production
//             sameSite: "strict", // Optional: to prevent CSRF attacks
//         });

//         return response;

//     } catch (error: any) {
//         // Log the error and return a generic message for 500 errors
//         console.error("Error in POST /api/users/login:", error);
//         return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
//     }
// }
