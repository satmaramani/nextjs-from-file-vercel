import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProtectedPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            router.push("/login"); // Redirect to login if logged out
        } else {
            setIsLoggedIn(true);
        }
    }, [router]);

    if (!isLoggedIn) {
        return null; // Render nothing while redirecting
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Welcome to the Protected Page</h1>
                <p className="text-lg text-green-600">You are logged in.</p>
                <p className="text-gray-600 mt-4">
                    Your JWT Token: <span className="font-mono">{localStorage.getItem("jwt")}</span>
                </p>
                <button
                    onClick={() => {
                        localStorage.removeItem("jwt");
                        router.push("/login"); // Redirect to login on logout
                    }}
                    className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}