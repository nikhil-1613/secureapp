"use client";

interface Requirement {
  _id?:string;
  name: string;
  location: string;
  Date: string;
  shift: string;
  shiftTimings: string;
  Purpose: string;
  staffRequired: number;
  address: string;
  // Add any additional properties if needed, e.g., `acceptedGuards` when defined.
}


interface FormData{
  name: string;
  location: string;
  Date: string;
  shift: string;
  shiftTimings: string;
  Purpose: string;
  staffRequired: string;
  address: string;
}

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
export default function AddRequirementPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    location: "",
    Date: "",
    shift: "",
    shiftTimings: "",
    Purpose: "",
    staffRequired: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get("/api/admin/requirements");
      setRequirements(response.data.data);
    } catch (error: unknown) {
      
      if (error instanceof AxiosError && error.response?.data?.error) {
        toast.error(error.response.data.error, { duration: 3000 });
        console.error(error.response.data.error);
      } else if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again.", {
          duration: 3000,
        });
        console.error(error.message);
      } else {
        toast.error("An unknown error occurred.", { duration: 3000 });
        console.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, [successMessage]); // Refetch requirements after a successful submission

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await axios.post("/api/admin/requirements", formData);
      console.log(res.data);
      setSuccessMessage("Requirement added successfully!");
      setFormData({
        name: "",
        location: "",
        Date: "",
        shift: "",
        shiftTimings: "",
        Purpose: "",
        staffRequired: "",
        address: "",
      });
      setShowModal(false);
    }catch (error: unknown) {
      console.log("Login failed", error);
  
      if (error instanceof AxiosError && error.response?.data?.error) {
        setErrorMessage(error.response?.data?.error || "Something went wrong.");

      } else if (error instanceof Error) {
        setErrorMessage(error.message || "Something went wrong.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      {/* Button to Open Modal */}
      <button
        className="bg-blue-500 text-white rounded-lg px-6 py-3 shadow-md hover:bg-blue-600 transition"
        onClick={() => setShowModal(true)}
      >
        Add Requirement
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-scroll max-h-[80vh]">
            <h2 className="text-xl font-semibold mb-4 text-center">Add Requirement</h2>
            <form onSubmit={handleSubmit}>
              {Object.keys(formData).map((key) => (
                <div key={key} className="mb-4">
                  <label htmlFor={key} className="block text-sm font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type={key === "Date" ? "date" : "text"}
                    id={key}
                    name={key}
                    value={(formData as FormData)[key as keyof FormData]}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 p-3"
                    required
                  />
                </div>
              ))}
              {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-gray-600 transition"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Requirements List */}
      <div className="mt-8 w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-4">Available Requirements</h3>
        {requirements.length === 0 ? (
          <p className="text-gray-500">No requirements available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requirements.map((requirement: Requirement) => (
              <div
                key={requirement._id}
                className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <h4 className="text-xl font-semibold text-blue-600">{requirement.name}</h4>
                {/* <p className="text-sm text-gray-600 mt-2">Location: {requirement.location}</p> */}
                <p className="text-sm text-gray-600">Date: {requirement.Date}</p>
                <p className="text-sm text-gray-600">Shift: {requirement.shift}</p>
                <p className="text-sm text-gray-600">Shift Timings: {requirement.shiftTimings}</p>
                <p className="text-sm text-gray-600">Purpose: {requirement.Purpose}</p>
                <p className="text-sm text-gray-600">Staff Required: {requirement.staffRequired}</p>
                <p className="text-sm text-gray-600">Address: {requirement.address}</p>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => window.open(requirement.address, "_blank")}
                    className="bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition"
                  >
                    View Location
                  </button>
                  {/* Edit and Delete buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => console.log("Edit functionality")}
                      className="bg-yellow-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => console.log("Delete functionality")}
                      className="bg-red-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function AddRequirementPage() {
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     location: "",
//     Date: "",
//     shift: "",
//     shiftTimings: "",
//     Purpose: "",
//     staffRequired: "",
//     address: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [requirements, setRequirements] = useState([]);

//   const fetchRequirements = async () => {
//     try {
//       const response = await axios.get("/api/admin/requirements");
//       setRequirements(response.data.data);
//     } catch (error: any) {
//       console.error("Error fetching requirements:", error.response?.data?.error || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchRequirements();
//   }, [successMessage]); // Refetch requirements after a successful submission or deletion

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");

//     try {
//       if (isEditing) {
//         await axios.put(`/api/admin/requirements/${editingId}`, formData);
//         setSuccessMessage("Requirement updated successfully!");
//       } else {
//         await axios.post("/api/admin/requirements", formData);
//         setSuccessMessage("Requirement added successfully!");
//       }
//       setFormData({
//         name: "",
//         location: "",
//         Date: "",
//         shift: "",
//         shiftTimings: "",
//         Purpose: "",
//         staffRequired: "",
//         address: "",
//       });
//       setShowModal(false);
//       setIsEditing(false);
//       setEditingId("");
//     } catch (error: any) {
//       setErrorMessage(error.response?.data?.error || "Something went wrong.");
//     }
//   };

//   const handleEdit = (requirement: any) => {
//     setFormData(requirement);
//     setEditingId(requirement._id);
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`/api/admin/requirements/${id}`);
//       setSuccessMessage("Requirement deleted successfully!");
//     } catch (error: any) {
//       console.error("Error deleting requirement:", error.response?.data?.error || error.message);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
//       {/* Button to Open Modal */}
//       <button
//         className="bg-blue-500 text-white rounded-lg px-6 py-3 shadow-md hover:bg-blue-600 transition"
//         onClick={() => {
//           setShowModal(true);
//           setIsEditing(false);
//           setFormData({
//             name: "",
//             location: "",
//             Date: "",
//             shift: "",
//             shiftTimings: "",
//             Purpose: "",
//             staffRequired: "",
//             address: "",
//           });
//         }}
//       >
//         Add Requirement
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-scroll max-h-[80vh]">
//             <h2 className="text-xl font-semibold mb-4 text-center">
//               {isEditing ? "Edit Requirement" : "Add Requirement"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               {Object.keys(formData).map((key) => (
//                 <div key={key} className="mb-4">
//                   <label htmlFor={key} className="block text-sm font-medium">
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </label>
//                   <input
//                     type={key === "Date" ? "date" : "text"}
//                     id={key}
//                     name={key}
//                     value={(formData as any)[key]}
//                     onChange={handleChange}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 p-3"
//                     required
//                   />
//                 </div>
//               ))}
//               {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}
//               {successMessage && <p className="text-green-500 text-sm mb-2">{successMessage}</p>}
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   className="bg-gray-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-gray-600 transition"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition"
//                 >
//                   {isEditing ? "Update" : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Requirements List */}
//       <div className="mt-8 w-full max-w-4xl">
//         <h3 className="text-lg font-semibold mb-4">Available Requirements</h3>
//         {requirements.length === 0 ? (
//           <p className="text-gray-500">No requirements available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {requirements.map((requirement: any) => (
//               <div
//                 key={requirement._id}
//                 className="bg-white p-4 rounded-lg shadow-md border"
//               >
//                 <h4 className="font-semibold">{requirement.name}</h4>
//                 <p className="text-sm text-gray-600">Location: {requirement.location}</p>
//                 <p className="text-sm text-gray-600">Date: {requirement.Date}</p>
//                 <p className="text-sm text-gray-600">Shift: {requirement.shift}</p>
//                 <p className="text-sm text-gray-600">Shift Timings: {requirement.shiftTimings}</p>
//                 <p className="text-sm text-gray-600">Purpose: {requirement.Purpose}</p>
//                 <p className="text-sm text-gray-600">Staff Required: {requirement.staffRequired}</p>
//                 <button
//                   onClick={() => window.open(requirement.address, "_blank")}
//                   className="bg-blue-500 text-white mt-4 rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition"
//                 >
//                   View Location
//                 </button>
//                 <div className="mt-4 flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(requirement)}
//                     className="bg-yellow-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-yellow-600 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(requirement._id)}
//                     className="bg-red-500 text-white rounded-lg px-4 py-2 shadow-md hover:bg-red-600 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
