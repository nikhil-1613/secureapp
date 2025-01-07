"use client";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation"; 

export default function DetailsPage() {

    const router = useRouter();
  // Use one useState hook to store the form values
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    workingLocation: "",
    shiftTimings: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update the corresponding field
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setButtonDisabled(true); // Disable button during request

      const response = await axios.post("/api/users/details", formData);

      if (response.status === 201) {
        toast.success("Details submitted successfully!", {
          duration: 3000,
        });
        // Reset form fields after successful submission
        setFormData({
          userName: "",
          email: "",
          workingLocation: "",
          shiftTimings: "",
        });
        router.push("/profile")
      }
    } catch (error: any) {
      toast.error("Error submitting details. Please try again.", {
        duration: 3000,
      });
    } finally {
      setButtonDisabled(false); // Re-enable button
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-white font-bold text-4xl text-center mb-6">Details Page</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white">User Name</label>
            <input
              type="text"
              name="userName" // Set name attribute to match key in state
              value={formData.userName}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 mt-2"
              required
            />
          </div>

          <div>
            <label className="text-white">Email</label>
            <input
              type="email"
              name="email" // Set name attribute to match key in state
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 mt-2"
              required
            />
          </div>

          <div>
            <label className="text-white">Working Location</label>
            <input
              type="text"
              name="workingLocation" // Set name attribute to match key in state
              value={formData.workingLocation}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 mt-2"
              required
            />
          </div>

          <div>
            <label className="text-white">Shift Timings</label>
            <input
              type="text"
              name="shiftTimings" // Set name attribute to match key in state
              value={formData.shiftTimings}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 mt-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={buttonDisabled}
            className={`${
              buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded w-full py-2 transition duration-300 mt-4`}
          >
            {buttonDisabled ? "Submitting..." : "Submit Details"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
