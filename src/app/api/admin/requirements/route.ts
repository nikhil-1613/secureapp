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
    const { name, location, Date, shift, shiftTimings, Purpose, staffRequired } = body;

    // Validate input fields
    if (!name || !location || !Date || !shift || !shiftTimings || !Purpose || !staffRequired) {
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
    });

    // Save the requirement to the database
    await requirement.save();
    console.log("Requirement saved successfully:", requirement); // Debugging log

    // Respond with success
    return NextResponse.json({ success: true, data: requirement }, { status: 201 });
  } catch (error: any) {
    // Handle errors
    console.error("Error saving requirement:", error.message); // Debugging log
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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