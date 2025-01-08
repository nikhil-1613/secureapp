"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  userName: string;
  email: string;
  workingLocation: string;
  shiftTimings: string;
  profileImageUrl?: string;  // Optional image URL
}

export default function EmployeeGrid() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/employees");
        const data = await response.json();
        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gray-100 shadow-md rounded-lg p-4 hover:shadow-lg transition"
          >
            {/* Image holder */}
            <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 overflow-hidden">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center text-white text-2xl">
                  No Image
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold">{user.userName}</h2>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Location: {user.workingLocation}</p>
            <p className="text-gray-700">Shift: {user.shiftTimings}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
