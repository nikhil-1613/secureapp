import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
export async function POST(request: NextRequest) {
    try {
        await connect()
        const reqBody = await request.json()
        const { email, password } = reqBody;

        //checking user exists or not
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "user does not exists" }, { status: 400 })
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" },
                { status: 400 }
            )
        }
        //creating token data
        const tokenData = {
            id: user._id,
            email: user.email
        }
        //creating token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })
        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message }),
            { status: 500 }
    }
}