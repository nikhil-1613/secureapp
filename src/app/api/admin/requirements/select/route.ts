import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; // Correctly import jwtVerify from jose
import User from '@/models/userModel';
import Requirement from '@/models/requirementModel';

export async function POST(request: NextRequest) {
  try {
    // Get the token from cookies
    const token = request.cookies.get('token')?.value;
    console.log("Received token:", token);

    if (!token) {
      return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
    }

    // Verify the token using jose
    let decoded;
    try {
      // Verify the JWT using the secret key
      const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret'));
      decoded = { id: payload.id }; // Extract the ID from the decoded payload
      console.log("Decoded token:", decoded);
    } catch (error) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    // Fetch the user details from the database
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse the incoming request body
    const body = await request.json();
    const { requirementId } = body;

    // Validate the requirementId
    if (!requirementId) {
      return NextResponse.json({ error: "Missing requirementId" }, { status: 400 });
    }

    // Find the requirement by ID and update the accepted guards
    const requirement = await Requirement.findById(requirementId);

    if (!requirement) {
      return NextResponse.json({ error: "Requirement not found" }, { status: 404 });
    }

    // Create guard details using the logged-in user
    const guardDetails = {
      name: user.userName, 
      phoneNumber: user.phoneNumber,
    };

    // Add the guard details to the acceptedGuards array
    requirement.acceptedGuards.push(guardDetails);

    // Save the updated requirement
    await requirement.save();

    // Return success response
    return NextResponse.json({ message: "Guard successfully added" }, { status: 200 });
  } catch (error) {
    console.error("Error adding guard to requirement:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { jwtVerify } from 'jose'; // Import jwtVerify from jose
// import User from '@/models/userModel';
// import Requirement from '@/models/requirementModel';

// export async function POST(request: NextRequest) {
//   try {
//     // Get the token from cookies
//     const token = request.cookies.get('token')?.value;
//     console.log("received token", token);

//     if (!token) {
//       return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
//     }

//     // Verify the token using jose
//     let decoded;
//     try {
//       const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret'));
//       decoded = { id: payload.id };
//       console.log("Decoded token: ", decoded);
//     } catch (error) {
//       return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
//     }

//     // Fetch the user details from the database
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }

//     // Parse the incoming request body
//     const body = await request.json();
//     const { requirementId } = body;

//     // Validate the requirementId
//     if (!requirementId) {
//       return NextResponse.json({ error: "Missing requirementId" }, { status: 400 });
//     }

//     // Find the requirement by ID and update the accepted guards
//     const requirement = await Requirement.findById(requirementId);

//     if (!requirement) {
//       return NextResponse.json({ error: "Requirement not found" }, { status: 404 });
//     }

//     // Create guard details using the logged-in user
//     const guardDetails = {
//       name: user.userName, 
//       phoneNumber: user.phoneNumber,
//     };

//     // Add the guard details to the acceptedGuards array
//     requirement.acceptedGuards.push(guardDetails);

//     // Save the updated requirement
//     await requirement.save();

//     // Return success response
//     return NextResponse.json({ message: "Guard successfully added" }, { status: 200 });
//   } catch (error) {
//     console.error("Error adding guard to requirement:", error);
//     return NextResponse.json({ error: "An error occurred" }, { status: 500 });
//   }
// }

// // import { NextRequest, NextResponse } from 'next/server';
// // import jwt from 'jsonwebtoken'; // Ensure you have installed the jsonwebtoken package
// // import User from '@/models/userModel'; // Assuming you have a User model for fetching user details
// // import Requirement from '@/models/requirementModel';

// // export async function POST(request: NextRequest) {
// //   try {
// //     // Get the token from cookies
// //     const token = request.cookies.get('token')?.value;
// //     console.log("recieved token",token);

// //     if (!token) {
// //       return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
// //     }

// //     // console.log("Received Token: ", token); // For debugging purposes

// //     // Verify the token
// //     let decoded;
// //     try {
// //       decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string };
// //       console.log("Decoded token: ", decoded);
// //     } catch (error) {
// //       if (error instanceof jwt.TokenExpiredError) {
// //         return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
// //       } else {
// //         return NextResponse.json({ error: 'Invalid token signature' }, { status: 401 });
// //       }
// //     }

// //     // Fetch the user details from the database
// //     const user = await User.findById(decoded.id);

// //     if (!user) {
// //       return NextResponse.json({ error: 'User not found' }, { status: 404 });
// //     }

// //     // Parse the incoming request body
// //     const body = await request.json();
// //     const { requirementId } = body;

// //     // Validate the requirementId
// //     if (!requirementId) {
// //       return NextResponse.json({ error: "Missing requirementId" }, { status: 400 });
// //     }

// //     // Find the requirement by ID and update the accepted guards
// //     const requirement = await Requirement.findById(requirementId);

// //     if (!requirement) {
// //       return NextResponse.json({ error: "Requirement not found" }, { status: 404 });
// //     }

// //     // Create guard details using the logged-in user
// //     const guardDetails = {
// //       name: user.userName, // Assuming the user's name field exists
// //       phoneNumber: user.phoneNumber, // Assuming the user's phone number exists
// //     };

// //     // Add the guard details to the acceptedGuards array
// //     requirement.acceptedGuards.push(guardDetails);

// //     // Save the updated requirement
// //     await requirement.save();

// //     // Return success response
// //     return NextResponse.json({ message: "Guard successfully added" }, { status: 200 });
// //   } catch (error) {
// //     console.error("Error adding guard to requirement:", error);
// //     return NextResponse.json({ error: "An error occurred" }, { status: 500 });
// //   }
// // }
