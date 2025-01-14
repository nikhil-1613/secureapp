'use client';
import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface RequirementFormData {
  name: string;
  location: string;
  Date: string;
  shift: string;
  shiftTimings: string;
  Purpose: string;
  staffRequired: number;
}

export default function AddRequirementPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<RequirementFormData>({
    name: '',
    location: '',
    Date: '',
    shift: '',
    shiftTimings: '',
    Purpose: '',
    staffRequired: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);

    try {
      const response = await axios.post('/api/admin/requirements', formData);
      console.log('Response Data:', response.data);

      if (response.status === 201 || response.data.success) {
        console.log('Requirement added successfully');
        setIsModalOpen(false);
        setFormData({
          name: '',
          location: '',
          Date: '',
          shift: '',
          shiftTimings: '',
          Purpose: '',
          staffRequired: 0,
        });
      }
    } catch (error: any) {
      console.error('Error occurred during form submission:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="bg-blue-700 p-4 m-4 text-white hover:cursor-pointer rounded-md"
        onClick={() => {
          console.log('Opening modal');
          setIsModalOpen(true);
        }}
      >
        Add Requirement
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 m-5 rounded-md w-11/12 sm:w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Requirement</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Location Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="location">
                  Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Date Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="Date">
                  Date:
                </label>
                <input
                  type="date"
                  id="Date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Shift Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="shift">
                  Shift:
                </label>
                <input
                  type="text"
                  id="shift"
                  name="shift"
                  value={formData.shift}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Shift Timings Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="shiftTimings">
                  Shift Timings:
                </label>
                <input
                  type="text"
                  id="shiftTimings"
                  name="shiftTimings"
                  value={formData.shiftTimings}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Purpose Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="Purpose">
                  Purpose:
                </label>
                <textarea
                  id="Purpose"
                  name="Purpose"
                  value={formData.Purpose}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                ></textarea>
              </div>

              {/* Staff Required Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="staffRequired">
                  Staff Required:
                </label>
                <input
                  type="number"
                  id="staffRequired"
                  name="staffRequired"
                  value={formData.staffRequired}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-700 text-white p-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-4 text-right">
              <button
                onClick={() => {
                  console.log('Closing modal');
                  setIsModalOpen(false);
                }}
                className="text-red-500 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 'use client';
// import axios from 'axios';
// import React, { useState, ChangeEvent, FormEvent } from 'react';

// interface RequirementFormData {
//   name: string;
//   location: string;
//   Date: string;
//   shift: string;
//   shiftTimings: string;
//   Purpose: string;
//   staffRequired: number;
// }

// export default function AddRequirementPage() {
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [formData, setFormData] = useState<RequirementFormData>({
//     name: '',
//     location: '',
//     Date: '',
//     shift: '',
//     shiftTimings: '',
//     Purpose: '',
//     staffRequired: 0,
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//      setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     console.log('Form Submitted:', formData); // Debug: Log form data before submitting

//     try {
//       const response = await axios.post('/api/admin/requirements', formData);
//       console.log('Response Data:', response.data); // Debug: Log server response


//         console.log('Requirement added successfully'); // Debug: Log success
//         setIsModalOpen(false);
//         setFormData({
//           name: '',
//           location: '',
//           Date: '',
//           shift: '',
//           shiftTimings: '',
//           Purpose: '',
//           staffRequired: 0,
//         });
      
//     } catch (error) {
//       console.error('Error occurred during form submission:', error); // Debug: Log errors
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <button
//         className="bg-blue-700 p-4 m-4 text-white hover:cursor-pointer rounded-md"
//         onClick={() => {
//           console.log('Opening modal'); // Debug: Log modal open action
//           setIsModalOpen(true);
//         }}
//       >
//         Add Requirement
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
//           <div className="bg-white p-6 m-5 rounded-md w-11/12 sm:w-96 md:w-3/4 lg:w-1/3 xl:w-1/4 max-h-screen-sm">
//             <h2 className="text-xl font-semibold mb-4">Add New Requirement</h2>
//             <form onSubmit={handleSubmit}>
//               {/* Form Fields */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="name">
//                   Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="location">
//                   Location:
//                 </label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   value={formData.location}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="Date">
//                   Date:
//                 </label>
//                 <input
//                   type="date"
//                   id="Date"
//                   name="Date"
//                   value={formData.Date}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="shift">
//                   Shift:
//                 </label>
//                 <input
//                   type="text"
//                   id="shift"
//                   name="shift"
//                   value={formData.shift}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="shiftTimings">
//                   Shift Timings:
//                 </label>
//                 <input
//                   type="text"
//                   id="shiftTimings"
//                   name="shiftTimings"
//                   value={formData.shiftTimings}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="Purpose">
//                   Purpose:
//                 </label>
//                 <input
//                   type="text"
//                   id="Purpose"
//                   name="Purpose"
//                   value={formData.Purpose}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-2" htmlFor="staffRequired">
//                   Staff Required:
//                 </label>
//                 <input
//                   type="number"
//                   id="staffRequired"
//                   name="staffRequired"
//                   value={formData.staffRequired}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="bg-blue-700 text-white p-2 rounded-md"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//             <div className="mt-4 text-right">
//               <button
//                 onClick={() => {
//                   console.log('Closing modal'); // Debug: Log modal close action
//                   setIsModalOpen(false);
//                 }}
//                 className="text-red-500 hover:underline"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

