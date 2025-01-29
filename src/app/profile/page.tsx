"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios,{AxiosError} from "axios";

interface User {
  userName: string;
  email: string;
  address: string;
  workingLocation: string;
  shiftTimings: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading state
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          withCredentials: true, // Ensure cookies or tokens are sent
        });
        console.log("Response from backend:", res.data);
        setUser(res.data.data); // Access the `data` field in the response

        toast.success("User details loaded!");
      }catch (error: unknown) {
        console.log("Login failed", error);
    
        if (error instanceof AxiosError && error.response?.data?.error) {
            console.log(error.response.data.error);
        } else if (error instanceof Error) {
            console.log(error.message || "Something went wrong. Please try again.");
        } else {
            console.log("An unknown error occurred.");
        }
    } 
       finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
      setUser(null); // Clear user state
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5">Profile Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : user ? (
        <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {user.userName} Profile
          </h2>
          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> {user.workingLocation}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Working Location:</span>{" "}
              {user.workingLocation}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Shift Timings:</span>{" "}
              {user.shiftTimings}
            </p>
          </div>
          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>No user details found. Please log in.</p>
      )}
    </div>
  );
}

// "use client";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { toast } from "react-hot-toast";
// import axios from "axios";

// interface User {
//   userName: string;
//   email: string;
//   location: string;
//   workingLocation: string;
//   shiftTimings: string;
// }

// export default function ProfilePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true); // Start with loading state
//   const router = useRouter();

//   // Automatically fetch user details when the component mounts
//   // const fetchUser = async () => {
//   //   try {
//   //     const res = await axios.get("/api/users/me");
//   //     console.log("User data fetched:", res.data); // Log API response
//   //     setUser(res.data); // Update state
//   //     console.log("Updated user state:", user); // Log the user state
//   //   } catch (error) {
//   //     console.error("Error fetching user details:", error);
//   //   }
//   // };
//   // useEffect(() => {
//   //   console.log("User state updated:", user);
//   // }, [user]);
    
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get("/api/users/me");
//         console.log("Response from backend:", res.data);
//         setUser(res.data);

//         toast.success("User details loaded!");
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//         toast.error("Error fetching user details");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const logout = async () => {
//     try {
//       await axios.post("/api/users/logout");
//       setUser(null); // Clear user state
//       toast.success("Logout successful");
//       router.push("/login");
//     } catch (error) {
//       console.error("Error logging out:", error);
//       toast.error("Error logging out");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
//       <h1 className="text-3xl font-bold mb-5">Profile Page</h1>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : user ? (
//         <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-md">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//             {user.userName}'s Profile
//           </h2>
//           <div className="mb-4">
//             <p className="text-gray-600">
//               <span className="font-medium">Email:</span> {user.email}
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Location:</span> {user.location}
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Working Location:</span>{" "}
//               {user.workingLocation}
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Shift Timings:</span>{" "}
//               {user.shiftTimings}
//             </p>
//           </div>
//           <button
//             onClick={logout}
//             className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <p>No user details found. Please log in.</p>
//       )}
//     </div>
//   );
// }
