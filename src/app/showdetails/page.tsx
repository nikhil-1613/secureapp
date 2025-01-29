"use client";

import { useEffect, useState } from "react";

interface AcceptedGuard {
    name: string;
    phoneNumber: number;
}

interface Requirement {
    _id: string;
    name: string;
    location: string;
    Date: string;
    shift: string;
    shiftTimings: string;
    Purpose: string;
    staffRequired: number;
    address: string;
    acceptedGuards: AcceptedGuard[];
}

export default function ShowDetailsPage() {
    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRequirements = async () => {
            try {
                const res = await fetch(`/api/admin/requirements/details`);
                const data: Requirement[] = await res.json();
                setRequirements(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequirements();
    }, []);

    if (loading) return <p className="text-center mt-4">Loading...</p>;
    if (requirements.length === 0) return <p className="text-center mt-4">No requirements found.</p>;

    return (
        <div className="flex flex-col items-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">All Requirements</h1>
            <div className="w-full max-w-3xl">
                {requirements.map((requirement) => (
                    <div key={requirement._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold">{requirement.name}</h2>
                        <p className="text-lg"><strong>Date:</strong> {new Date(requirement.Date).toLocaleDateString()}</p>
                        <p className="text-lg"><strong>Shift:</strong> {requirement.shift}</p>
                        <p className="text-lg"><strong>Shift Timings:</strong> {requirement.shiftTimings}</p>
                        <p className="text-lg"><strong>Staff Required:</strong> {requirement.staffRequired}</p>

                        <h3 className="text-xl font-semibold mt-4">Accepted Guards</h3>
                        {requirement.acceptedGuards.length > 0 ? (
                            <table className="min-w-full table-auto border-collapse border border-gray-200 mt-2">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-2">Name</th>
                                        <th className="border p-2">Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requirement.acceptedGuards.map((guard, index) => (
                                        <tr key={index} className="border">
                                            <td className="border p-2">{guard.name}</td>
                                            <td className="border p-2">{guard.phoneNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-600">No accepted guards.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
// "use client";

// import { useEffect, useState } from "react";

// interface Params {
//     id: string;
// }

// interface AcceptedGuard {
//     name: string;
//     phoneNumber: number;
// }

// interface Requirement {
//     name: string;
//     location: string;
//     Date: string;
//     shift: string;
//     shiftTimings: string;
//     Purpose: string;
//     staffRequired: number;
//     address: string;
//     acceptedGuards: AcceptedGuard[];
// }

// export default function ShowDetailsPage({ params }: { params: Params }) {
//     const [requirement, setRequirement] = useState<Requirement | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRequirement = async () => {
//             try {
//                 const res = await fetch(`/api/admin/requirements/${params.id}`);
//                 const data: Requirement = await res.json();
                
//                 // Ensure acceptedGuards is always an array to avoid undefined errors
//                 setRequirement({ ...data, acceptedGuards: data.acceptedGuards || [] });
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRequirement();
//     }, [params.id]);

//     if (loading) return <p className="text-center mt-4">Loading...</p>;
//     if (!requirement) return <p className="text-center mt-4">Requirement not found.</p>;

//     return (
//         <div className="flex flex-col justify-center items-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
//             <h1 className="text-3xl font-bold mb-4">{requirement.name}</h1>
            
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
//                 <p className="text-lg"><strong>Date:</strong> {new Date(requirement.Date).toLocaleDateString()}</p>
//                 <p className="text-lg"><strong>Shift:</strong> {requirement.shift}</p>
//                 <p className="text-lg"><strong>Shift Timings:</strong> {requirement.shiftTimings}</p>
//                 <p className="text-lg"><strong>Staff Required:</strong> {requirement.staffRequired}</p>
//             </div>

//             <h2 className="text-2xl font-semibold mt-6">Accepted Guards</h2>
//             <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mt-4">
//                 {requirement.acceptedGuards?.length > 0 ? (
//                     <table className="min-w-full table-auto border-collapse border border-gray-200">
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="border p-2">Name</th>
//                                 <th className="border p-2">Phone Number</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {requirement.acceptedGuards.map((guard, index) => (
//                                 <tr key={index} className="border">
//                                     <td className="border p-2">{guard.name}</td>
//                                     <td className="border p-2">{guard.phoneNumber}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No accepted guards.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

