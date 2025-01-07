export default function ProfilePage(){
  return(
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <h1 className="text-4xl font-bold text-black">Profile Page</h1>
    </div>
  )
}
// "use client"
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// export default function UserProfile({ params }: any) {
// //   const router = useRouter();
//   const [userDetails, setUserDetails] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   useEffect(() => {
//     // Fetch user details based on email (params.id)
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(`/api/user/details${params.id}`);
//         setUserDetails(response.data.userDetails);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch user details.");
//         setLoading(false);
//       }
//     };

//     if (params.id) {
//       fetchUserDetails();
//     } else {
//       setLoading(false);
//       setError("User email not found.");
//     }
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1 className="text-black font-bold text-4xl">Loading...</h1>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen py-2">
//         <h1 className="text-black font-bold text-4xl">{error}</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1 className="text-black font-bold text-4xl">Profile</h1>
//       <hr className="my-4" />

//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
//         <h2 className="text-2xl font-semibold">User Details</h2>
//         <p><strong>User Name:</strong> {userDetails.userName}</p>
//         <p><strong>Email:</strong> {userDetails.email}</p>
//         <p><strong>Joining Date:</strong> {new Date(userDetails.joiningDate).toLocaleDateString()}</p>
//         <p><strong>Working Location:</strong> {userDetails.workingLocation}</p>
//         <p><strong>Shift Timings:</strong> {userDetails.shiftTimings}</p>
//       </div>
//     </div>
//   );
// }
