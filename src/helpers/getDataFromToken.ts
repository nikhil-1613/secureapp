import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define the structure of the decoded token
interface DecodedToken {
  id: string; // Adjust this based on the type of the ID (string, number, etc.)
  // Add other properties if necessary (e.g., username, email)
}

export default async function getDataFromToken(request: NextRequest) {
  try {
    // Retrieve token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.error("Token not found in cookies");
      throw new Error("Authentication token is missing");
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

    if (!decodedToken || !decodedToken.id) {
      console.error("Invalid token structure");
      throw new Error("Invalid token");
    }

    // Return the user ID from the token
    return decodedToken.id;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error decoding token:", error.message);
    } else {
      console.error("Error decoding token:", error);
    }
    throw new Error("Authentication failed");
  }
}

// import { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// export default async function getDataFromToken(request: NextRequest) {
//   try {
//     // Retrieve token from cookies
//     const token = request.cookies.get("token")?.value;

//     if (!token) {
//       console.error("Token not found in cookies");
//       throw new Error("Authentication token is missing");
//     }

//     // Verify and decode the token
//     const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

//     if (!decodedToken || !decodedToken.id) {
//       console.error("Invalid token structure");
//       throw new Error("Invalid token");
//     }

//     // Return the user ID from the token
//     return decodedToken.id;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Error decoding token:", error.message);
//     } else {
//       console.error("Error decoding token:", error);
//     }
//     throw new Error("Authentication failed");
//   }
// }
