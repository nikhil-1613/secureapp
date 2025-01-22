interface Params {
    id: string;
}

export default function UserProfile({ params }: { params: Params }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-black font-bold text-4xl">Profile</h1>
            <hr />
            <p className="text-3xl"> Profile Page {params.id}</p>
        </div>
    )
}