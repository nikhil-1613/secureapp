"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import jwt from "jsonwebtoken"; // To decode the JWT token

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Check for the JWT token in cookies and decode it to extract the username
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))?.split("=")[1];
    
    if (token) {
      try {
        const decoded: any = jwt.decode(token);  // Decode the token (no need to verify)
        setUserName(decoded?.email);  // Assuming the username or email is stored in the token payload
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo/Title */}
        <div className="text-lg font-semibold">Admin Panel</div>

        {/* Display Username */}
        {userName && (
          <div className="text-sm text-gray-200">{`Hello, ${userName}`}</div>
        )}

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden block text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Nav Items */}
        <ul
          className={`sm:flex space-x-4 absolute sm:relative sm:top-0 sm:left-0 top-16 left-0 w-full bg-gray-800 sm:w-auto sm:bg-transparent sm:flex-row flex-col ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="px-4 py-2 sm:py-0">
            <Link href="/employees" className="hover:text-gray-300">
              My Employees
            </Link>
          </li>
          <li className="px-4 py-2 sm:py-0">
            <Link href="/mysites" className="hover:text-gray-300">
              My Sites
            </Link>
          </li>
          <li className="px-4 py-2 sm:py-0">
            <Link href="/addrequirement" className="hover:text-gray-300">
              Add Requirement
            </Link>
          </li>
          <li className="px-4 py-2 sm:py-0">
            <Link href="/editrequirement" className="hover:text-gray-300">
              Edit Requirement
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { HiMenu, HiX } from "react-icons/hi";

// export default function AdminNav() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-gray-800 text-white">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         {/* Logo/Title */}
//         <div className="text-lg font-semibold">Admin Panel</div>

//         {/* Hamburger Icon for Mobile */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="sm:hidden block text-gray-300 hover:text-white focus:outline-none"
//         >
//           {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
//         </button>

//         {/* Nav Items */}
//         <ul
//           className={`sm:flex space-x-4 absolute sm:relative sm:top-0 sm:left-0 top-16 left-0 w-full bg-gray-800 sm:w-auto sm:bg-transparent sm:flex-row flex-col ${
//             isOpen ? "block" : "hidden"
//           }`}
//         >
//           <li className="px-4 py-2 sm:py-0">
//             <Link href="/myemployees" className="hover:text-gray-300">
//               My Employees
//             </Link>
//           </li>
//           <li className="px-4 py-2 sm:py-0">
//             <Link href="/mysites" className="hover:text-gray-300">
//               My Sites
//             </Link>
//           </li>
//           <li className="px-4 py-2 sm:py-0">
//             <Link href="/addrequirement" className="hover:text-gray-300">
//               Add Requirement
//             </Link>
//           </li>
//           <li className="px-4 py-2 sm:py-0">
//             <Link href="/editrequirement" className="hover:text-gray-300">
//               Edit Requirement
//             </Link>
//           </li>
//         </ul>

//       </div>
//     </nav>
//   );
// }
