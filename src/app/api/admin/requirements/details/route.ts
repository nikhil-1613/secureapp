import { connect } from "@/dbConfig/dbConfig";
import Requirement from "@/models/requirementModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connect(); // Ensure database connection

        const requirements = await Requirement.find({});
        if (!requirements || requirements.length === 0) {
            return NextResponse.json({ error: "No requirements found" }, { status: 404 });
        }

        return NextResponse.json(requirements, { status: 200 });
    } catch (error:any) {
        console.error("Error fetching requirements:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// import { connect } from "@/dbConfig/dbConfig";
// import Requirement from "@/models/requirementModel";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         await connect(); // Ensure DB is connected

//         if (!params || !params.id) {
//             return NextResponse.json({ error: "Invalid request. Missing ID." }, { status: 400 });
//         }

//         const requirement = await Requirement.findById(params.id);
//         if (!requirement) {
//             return NextResponse.json({ error: "Requirement not found" }, { status: 404 });
//         }

//         return NextResponse.json(requirement, { status: 200 });
//     } catch (error:any) {
//         console.error("Error fetching requirement:", error);
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }
