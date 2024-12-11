import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    const handleJWTLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error messages
        setEmailError("");
        setPasswordError("");

        // Validate email and password
        let valid = true;
        if (!email) {
            setEmailError("Email is required.");
            valid = false;
        }
        if (!password) {
            setPasswordError("Password is required.");
            valid = false;
        }

        if (valid) {
            const res = await fetch("/api/auth/loginFromFile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const { token } = await res.json();
                localStorage.setItem("jwt", token); // Store JWT for session
                alert("JWT login successful!");
                router.push("/protected");
            } else {
                alert("JWT login failed!");
            }
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "/api/auth/google"; // Redirect to Google OAuth
    };

    const handleFacebookLogin = () => {
        window.location.href = "/api/auth/facebook"; // Redirect to Facebook OAuth
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Welcome Back!</h1>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Please log in to continue to your account.
                </p>

                {/* Custom JWT Login */}
                <form onSubmit={handleJWTLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`mt-1 block w-full px-4 py-2 border ${emailError ? "border-red-500" : "border-gray-300"
                                } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {emailError && (
                            <p className="text-sm text-red-500 mt-2">{emailError}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`mt-1 block w-full px-4 py-2 border ${passwordError ? "border-red-500" : "border-gray-300"
                                } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        {passwordError && (
                            <p className="text-sm text-red-500 mt-2">{passwordError}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                    >
                        Login with Email
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">Or log in with</p>
                </div>

                {/* Social Login Buttons */}
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                    >
                        Google
                    </button>
                    <button
                        onClick={handleFacebookLogin}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-300"
                    >
                        Facebook
                    </button>
                </div>

                <div className="mt-6 text-sm text-gray-500 text-center">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-indigo-600 hover:underline">
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
}
