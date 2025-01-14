import { connect } from "@/dbConfig/dbConfig";
import Requirement from "@/models/requirementModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Connect to the database
  await connect();

  try {
    // Parse the incoming request JSON
    const body = await request.json();
    console.log("Request Body:", body); // Debugging log

    // Extract required fields
    const { name, location, Date, shift, shiftTimings, Purpose, staffRequired,address } = body;

    // Validate input fields
    if (!name || !location || !Date || !shift || !shiftTimings || !Purpose || !staffRequired || !address) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Create a new Requirement document
    const requirement = new Requirement({
      name,
      location,
      Date,
      shift,
      shiftTimings,
      Purpose,
      staffRequired,
      address,
    });

    // Save the requirement to the database
    await requirement.save();
    return NextResponse.json({ success: true, data: requirement }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {

  await connect();
  try {
    const requirements = await Requirement.find();
    return NextResponse.json({ success: true, data: requirements }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } 
}


// https://maps.app.goo.gl/iub6Gw4jBccx5CVSA
// import { connect } from "@/dbConfig/dbConfig";
// import Requirement from "@/models/requirementModel";
// import { NextRequest,NextResponse } from "next/server";

// export async function POST(request:NextRequest){
//     await connect();
//     try {
//         const { name, location, Date, shift, shiftTimimgs, Purpose, staffRequired } = await request.json();
//         const requirement = new Requirement({
//             name,
//             location,
//             Date,
//             shift,
//             shiftTimimgs,
//             Purpose,
//             staffRequired
//         });
//         await requirement.save();
//         return NextResponse.json({success:true,data:requirement},{status:201});
        
        
//     } catch (error:any) {
//         return NextResponse.json({error:error.message},{status:500});

//     }
    
    
// }