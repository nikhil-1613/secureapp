import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Site from "@/models/siteModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const response = await req.json();
        const { name, location, securityCount, address } = response;

        // Validate the required fields
        if (!name || !location || !securityCount || !address) {
            return NextResponse.json({ error: "All fields (name, location, securityCount, address) are required" }, { status: 400 });
        }

        // Check if the site already exists by location
        const existingSite = await Site.findOne({ location });
        if (existingSite) {
            return NextResponse.json({ message: "Site already exists", site: existingSite }, { status: 200 });
        }

        // Create a new site
        const site = new Site({
            name,
            location,
            securityCount,
            address
        });
        // console.log(site);

        await site.save();
        return NextResponse.json(site, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const sites = await Site.find();
        return NextResponse.json(sites, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

    

export async function DELETE(req: NextRequest) {
    try {
        // Get the location from the request body
        const { location } = await req.json();

        if (!location) {
            return NextResponse.json({ error: "Location parameter is required" }, { status: 400 });
        }

        // Find the site by location
        const site = await Site.findOne({ location });
        if (!site) {
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        // Remove the site
        await site.remove();

        return NextResponse.json({ message: "Site deleted successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    try {
        // Get the id and the updated site data from the request body
        const { id, name, location, securityCount, address } = await req.json();

        if (!id || !name || !location || !securityCount || !address) {
            return NextResponse.json({ error: "All fields (id, name, location, securityCount, address) are required" }, { status: 400 });
        }

        const site = await Site.findById(id);
        if (!site) {
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        // Update the site fields
        site.name = name;
        site.location = location;
        site.securityCount = securityCount;
        site.address = address;

        await site.save();
        return NextResponse.json(site, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// import { connect } from "@/dbConfig/dbConfig";
// import { NextRequest, NextResponse } from "next/server";
// import Site from "@/models/siteModel";
// connect();
// export async function POST(req: NextRequest) {
//     try {
//         // Parse the request body to get form data
//         const response = await req.json();
//         const { location, securityCount, address } = response;

//         // Validate input data
//         if (!location || !securityCount || !address) {
//             return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//         }

//         // Check for existing site
//         const existingSite = await Site.findOne({ location });
        
//         // If site exists, return the existing site
//         if (existingSite) {
//             console.log("Existing site found:", existingSite);  // Debugging
//             return NextResponse.json({ message: "Site already exists", site: existingSite }, { status: 200 });
//         }

//         // Create a new site if none exists
//         const site = new Site({
//             location,
//             securityCount,
//             address
//         });

//         // Save the new site to the database
//         await site.save();
//         console.log("New site created:", site);  // Debugging

//         // Return the created site
//         return NextResponse.json(site, { status: 201 });

//     } catch (error: any) {
//         console.error("Error in POST request:", error.message); // Debugging
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// export async function GET(request:NextRequest)   {
//     try {
//         const sites = await Site.find();
//         return NextResponse.json(sites, { status: 200 });
//     } catch (error: any) {
//         console.error("Error in GET request:", error.message); // Debugging
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// export  async function DELETE(request:NextRequest) {
//     try {
//         const id = request.nextUrl.searchParams.get('id');
//         const site = await Site.findById(id);
//         if (!site) {
//             return NextResponse.json({ error: "Site not found" }, { status: 404 });
//         }   
//         await site.remove();
//         return NextResponse.json({ message: "Site deleted successfully" }, { status: 200 });
//     }catch (error: any) {    
//         console.error("Error in DELETE request:", error.message); // Debugging
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
    
// }

// export async function PUT(request:NextRequest) {
//     try {
//         const id = request.nextUrl.searchParams.get('id');
//         const site = await
//         Site.findById(id);
//         if (!site) {
//             return NextResponse.json({ error: "Site not found" }, { status: 404 });
//         }       
//         const response = await request.json();
//         const { location, securityCount, address } = response;
//         site.location = location;
//         site.securityCount = securityCount;
//         site.address = address;
//         await site.save();
//         return NextResponse.json(site, { status: 200 });

//     }
//     catch (error: any) {
//         console.error("Error in PUT request:", error.message); // Debugging
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }