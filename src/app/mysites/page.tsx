"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function SitesPage() {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        securityCount: "",
        address: "",
    });
    const [sites, setSites] = useState<any[]>([]);
    const [editingSite, setEditingSite] = useState<any | null>(null);

    // Fetch sites on component mount
    useEffect(() => {
        const fetchSites = async () => {
            try {
                const response = await axios.get("/api/admin/sites");
                setSites(response.data);
            } catch (error) {
                console.error("Error fetching sites:", error);
            }
        };
        fetchSites();
    }, []);

    // Handle input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit form data
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingSite) {
                // Update site
                await axios.put("/api/admin/sites", {
                    id: editingSite.id,
                    ...formData,
                });
            } else {
                // Add new site
                await axios.post("/api/admin/sites", formData);
            }
            const response = await axios.get("/api/admin/sites");
            setSites(response.data);
            setShowModal(false);
            setEditingSite(null);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Edit site details
    const handleEdit = (site: any) => {
        setFormData({
            name: site.name || "",
            location: site.location,
            securityCount: site.securityCount,
            address: site.address,
        });
        setEditingSite(site);
        setShowModal(true);
    };

    // Delete a site
    const handleDelete = async (id: string) => {
        try {
            await axios.delete("/api/admin/sites", {
                data: { id },
            });
            const response = await axios.get("/api/admin/sites");
            setSites(response.data);
        } catch (error) {
            console.error("Error deleting site:", error);
        }
    };

    // Navigate to Google Maps
    const navigateToGoogleMaps = (googleMapsUrl: string) => {
        if (!googleMapsUrl.startsWith("https://maps.app.goo.gl/")) {
            console.error("Invalid Google Maps URL");
            return;
        }
        window.location.href = googleMapsUrl; // Redirect to the direct URL
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
            >
                Add Site
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-lg">
                {sites.length > 0 ? (
                    sites.map((site, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-lg"
                        >
                            <h3 className="font-semibold text-lg mb-2">
                                {site.name || "Unnamed Site"}
                            </h3>
                            <button
                                onClick={() =>
                                    navigateToGoogleMaps(site.location)
                                }
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-2"
                            >
                                View on Google Maps
                            </button>
                            <p className="text-sm text-gray-600">
                                Security Count: {site.securityCount}
                            </p>
                            <p className="text-sm text-gray-600">
                                Address: {site.address}
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <button
                                    onClick={() => handleEdit(site)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(site.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No sites available</p>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                        <h2 className="text-xl font-semibold mb-4 text-center">
                            {editingSite ? "Edit Site" : "Add Site"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Location:
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Security Count:
                                </label>
                                <input
                                    type="number"
                                    name="securityCount"
                                    value={formData.securityCount}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Address:
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    {editingSite ? "Update" : "Submit"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// "use client";
// import axios from "axios";
// import { useState, useEffect } from "react";

// export default function SitesPage() {
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState({
//         name: "",
//         location: "",
//         securityCount: "",
//         address: "",
//     });
//     const [sites, setSites] = useState<any[]>([]);
//     const [editingSite, setEditingSite] = useState<any | null>(null);

//     useEffect(() => {
//         const fetchSites = async () => {
//             try {
//                 const response = await axios.get("/api/admin/sites");
//                 setSites(response.data);
//             } catch (error) {
//                 console.error("Error fetching sites:", error);
//             }
//         };

//         fetchSites();
//     }, []);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             if (editingSite) {
//                 await axios.put("/api/admin/sites", {
//                     id: editingSite.id,
//                     ...formData
//                 });
//             } else {
//                 await axios.post("/api/admin/sites", formData);
//             }

//             const response = await axios.get("/api/admin/sites");
//             setSites(response.data);
//             setShowModal(false);
//             setEditingSite(null);
//         } catch (error) {
//             console.error("Error submitting form:", error);
//         }
//     };

//     const handleEdit = (site: any) => {
//         setFormData({
//             name: site.name || "",
//             location: site.location,
//             securityCount: site.securityCount,
//             address: site.address,
//         });
//         setEditingSite(site);
//         setShowModal(true);
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await axios.delete("/api/admin/sites", {
//                 data: { id }
//             });
//             const response = await axios.get("/api/admin/sites");
//             setSites(response.data);
//         } catch (error) {
//             console.error("Error deleting site:", error);
//         }
//     };
//     const navigateToGoogleMaps = (googleMapsUrl: string) => {
//         if (!googleMapsUrl.startsWith("https://maps.app.goo.gl/")) {
//             console.error("Invalid Google Maps URL");
//             return;
//         }
//         window.location.href = googleMapsUrl; // Redirect to the direct URL
//     };
    
//     // const navigateToGoogleMaps = (location: string) => {
//     //     const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
//     //     window.open(googleMapsUrl, "_blank");
//     // };

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
//             <button
//                 onClick={() => setShowModal(true)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-4"
//             >
//                 Add Site
//             </button>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-lg">
//                 {sites.length > 0 ? (
//                     sites.map((site, index) => (
//                         <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
//                             <h3 className="font-semibold text-lg mb-2">{site.name || "Unnamed Site"}</h3>
//                             <button
//                                 onClick={() => navigateToGoogleMaps(site.location)}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-2"
//                             >
//                                 View on Google Maps
//                             </button>
//                             <p className="text-sm text-gray-600">Security Count: {site.securityCount}</p>
//                             <p className="text-sm text-gray-600">Address: {site.address}</p>
//                             <div className="mt-4 flex justify-between items-center">
//                                 <button
//                                     onClick={() => handleEdit(site)}
//                                     className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
//                                 >
//                                     Edit
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(site.id)}
//                                     className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//                                 >
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No sites available</p>
//                 )}
//             </div>

//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
//                         <h2 className="text-xl font-semibold mb-4 text-center">
//                             {editingSite ? "Edit Site" : "Add Site"}
//                         </h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Name:</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Location:</label>
//                                 <input
//                                     type="text"
//                                     name="location"
//                                     value={formData.location}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Security Count:</label>
//                                 <input
//                                     type="number"
//                                     name="securityCount"
//                                     value={formData.securityCount}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Address:</label>
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div className="flex justify-between items-center">
//                                 <button
//                                     type="submit"
//                                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                                 >
//                                     {editingSite ? "Update" : "Submit"}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowModal(false)}
//                                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
