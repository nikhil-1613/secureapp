"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  interface UserProfile {
    userName: string;
    email: string;
    workingLocation: string;
    shiftTimings: string;
    joiningDate: string;
    isAdmin: boolean;
  }

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserProfile = async () => {
      try {
        // Get the token from cookies (you could use a library like 'js-cookie' to get the token from cookies)
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        if (!token) {
          setError("User is not authenticated. Please log in.");
          return;
        }

        // Fetch user profile by email from backend
        const response = await axios.get(`/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
          }
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError("User not found or unable to fetch data.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold text-black">Loading Profile...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold text-red-500">{error}</h1>
        <button
          onClick={() => router.push('/login')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold text-red-500">User Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold text-black mb-4">Profile Page</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
        <p className="text-lg mb-2">
          <strong>Name:</strong> {user.userName}
        </p>
        <p className="text-lg mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg mb-2">
          <strong>Working Location:</strong> {user.workingLocation}
        </p>
        <p className="text-lg mb-2">
          <strong>Shift Timings:</strong> {user.shiftTimings}
        </p>
        <p className="text-lg mb-2">
          <strong>Joining Date:</strong>{" "}
          {new Date(user.joiningDate).toLocaleDateString()}
        </p>
        <p className="text-lg mb-2">
          <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function ProfilePage() {
//   interface UserProfile {
//     userName: string;
//     email: string;
//     workingLocation: string;
//     shiftTimings: string;
//     joiningDate: string;
//     isAdmin: boolean;
//   }

//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const email = "example@example.com"; // Replace this with logic to fetch the user's email
//         const response = await axios.get(`/api/users/profile?email=${email}`);
//         setUser(response.data.user);
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <h1 className="text-4xl font-bold text-black">Loading Profile...</h1>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen">
//         <h1 className="text-4xl font-bold text-red-500">User Not Found</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen">
//       <h1 className="text-4xl font-bold text-black mb-4">Profile Page</h1>
//       <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
//         <p className="text-lg mb-2">
//           <strong>Name:</strong> {user.userName}
//         </p>
//         <p className="text-lg mb-2">
//           <strong>Email:</strong> {user.email}
//         </p>
//         <p className="text-lg mb-2">
//           <strong>Working Location:</strong> {user.workingLocation}
//         </p>
//         <p className="text-lg mb-2">
//           <strong>Shift Timings:</strong> {user.shiftTimings}
//         </p>
//         <p className="text-lg mb-2">
//           <strong>Joining Date:</strong>{" "}
//           {new Date(user.joiningDate).toLocaleDateString()}
//         </p>
//         <p className="text-lg mb-2">
//           <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
//         </p>
//       </div>
//     </div>
//   );
// }
