import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '@/models/userModel';
import Requirement from '@/models/requirementModel';
import { cookies } from 'next/headers'; // Ensure proper token retrieval
import { connect } from '@/dbConfig/dbConfig';

export async function POST(request: NextRequest) {
  try {
    await connect()
    // Retrieve token from cookies
    const token = (await cookies()).get('token')?.value;
    console.log("Received token:", token);

    if (!token) {
      return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
    }

    if (!process.env.TOKEN_SECRET) {
      console.error("JWT_SECRET is missing in environment variables.");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.TOKEN_SECRET) as { id: string };
      console.log("Decoded token:", decoded);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
      } else {
        return NextResponse.json({ error: 'Invalid token signature' }, { status: 401 });
      }
    }

    // Fetch the user details
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Parse the incoming request body
    const { requirementId } = await request.json();
    if (!requirementId) {
      return NextResponse.json({ error: "Missing requirementId" }, { status: 400 });
    }

    // Find the requirement
    const requirement = await Requirement.findById(requirementId);
    if (!requirement) {
      return NextResponse.json({ error: "Requirement not found" }, { status: 404 });
    }

    // Ensure acceptedGuards exists before pushing data
    if (!Array.isArray(requirement.acceptedGuards)) {
      requirement.acceptedGuards = [];
    }

    // Create guard details
    const guardDetails = {
      name: user.userName,
      phoneNumber: user.phoneNumber,
    };

    // Check if user is already added to avoid duplicates
    const isAlreadyAdded = requirement.acceptedGuards.some((guard: { phoneNumber: string }) => guard.phoneNumber === user.phoneNumber);
    if (isAlreadyAdded) {
      return NextResponse.json({ error: "Guard already added" }, { status: 409 });
    }

    // Add the guard details
    requirement.acceptedGuards.push(guardDetails);
    await requirement.save();

    return NextResponse.json({ message: "Guard successfully added" }, { status: 200 });
  } catch (error) {
    console.error("Error adding guard to requirement:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken'; // Ensure you have installed the jsonwebtoken package
// import User from '@/models/userModel'; // Assuming you have a User model for fetching user details
// import Requirement from '@/models/requirementModel';

// export async function POST(request: NextRequest) {
//   try {
//     // Get the token from cookies
//     const token = request.cookies.get('token')?.value;
//     console.log("recieved token",token);

//     if (!token) {
//       return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
//     }

//     // console.log("Received Token: ", token); // For debugging purposes

//     // Verify the token
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { id: string };
//       console.log("Decoded token: ", decoded);
//     } catch (error) {
//       if (error instanceof jwt.TokenExpiredError) {
//         return NextResponse.json({ error: 'Token has expired' }, { status: 401 });
//       } else {
//         return NextResponse.json({ error: 'Invalid token signature' }, { status: 401 });
//       }
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
//       name: user.userName, // Assuming the user's name field exists
//       phoneNumber: user.phoneNumber, // Assuming the user's phone number exists
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

// import { NextRequest, NextResponse } from 'next/server';
// import { jwtVerify } from 'jose'; // Correctly import jwtVerify from jose
// import User from '@/models/userModel';
// import Requirement from '@/models/requirementModel';

// export async function POST(request: NextRequest) {
//   try {
//     // Get the token from cookies
//     const token = request.cookies.get('token')?.value;
//     console.log("Received token:", token);

//     if (!token) {
//       return NextResponse.json({ error: 'Authentication token is missing' }, { status: 401 });
//     }

//     // Verify the token using jose
//     let decoded;
//     try {
//       // Verify the JWT using the secret key
//       const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret'));
//       decoded = { id: payload.id }; // Extract the ID from the decoded payload
//       console.log("Decoded token:", decoded);
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

