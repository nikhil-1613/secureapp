import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await connect();

        // Parse the request body
        const reqBody = await request.json();
        const { email, password, userName, phoneNumber,workingLocation, shiftTimings } = reqBody;

        // Validate input fields
        if (!email || !password || !userName || !phoneNumber || !workingLocation || !shiftTimings) {
            return NextResponse.json(
                { error: "All fields (email, password, userName, phoneNumber, workingLocation, shiftTimings) are required." },
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists with this email" },
                { status: 400 }
            );
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create and save the new user
        const newUser = new User({
            email,
            password: hashedPassword,
            userName,
            phoneNumber,
            workingLocation,
            shiftTimings,
            joiningDate: new Date(), // Automatically set the joining date
        });

        const savedUser = await newUser.save();

        // Return success response with user info (excluding password)
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                id: savedUser._id,
                email: savedUser.email,
                userName: savedUser.userName,
                workingLocation: savedUser.workingLocation,
                shiftTimings: savedUser.shiftTimings,
                joiningDate: savedUser.joiningDate,
                isAdmin: savedUser.isAdmin,
            },
        });

    } catch (error: any) {
        console.error("Error in POST /api/users/signup:", error);

        // Handle known error codes (e.g., duplicate email)
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 }
            );
        }

        // Return a generic internal server error
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}

// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

// export async function POST(request: NextRequest) {
//     try {
//         // Connect to the database
//         await connect();

//         // Parse the request body
//         const reqBody = await request.json();
//         const { email, password } = reqBody;

//         // Validate input fields
//         if (!email || !password) {
//             return NextResponse.json(
//                 { error: "Email and password are required." },
//                 { status: 400 }
//             );
//         }

//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return NextResponse.json(
//                 { error: "User already exists with this email" },
//                 { status: 400 }
//             );
//         }

//         // Hash the password
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         // Create and save the new user
//         const newUser = new User({
//             email,
//             password: hashedPassword,
//         });

//         const savedUser = await newUser.save();

//         // Return success response with user info (excluding password)
//         return NextResponse.json({
//             message: "User created successfully",
//             success: true,
//             user: {
//                 id: savedUser._id,
//                 email: savedUser.email,
//             },
//         });

//     } catch (error: any) {
//         console.error("Error in POST /api/users/signup:", error);

//         // Handle known error codes (e.g., duplicate email)
//         if (error.code === 11000) {
//             return NextResponse.json(
//                 { error: "Email already exists" },
//                 { status: 400 }
//             );
//         }

//         // Return a generic internal server error
//         return NextResponse.json(
//             { error: error.message || "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }
