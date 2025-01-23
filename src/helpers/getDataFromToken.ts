import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export default async function getDataFromToken(request: NextRequest) {
  try {
    // Retrieve token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.error("Token not found in cookies");
      throw new Error("Authentication token is missing");
    }

    // Verify and decode the token
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

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
//     try {
//         const token = request.cookies.get("token")?.value;
//         if (!token) {
//             throw new Error("Token not found in cookies");
//         }

//         const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
//         return decodedToken.id;
//     } catch (error) {
//         console.error("Error decoding token:", error);
//         throw new Error("Authentication failed");
//     }
// }
