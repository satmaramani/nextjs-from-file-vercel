import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleJWTLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/loginFromFile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        console.log("This is the response from login API ", res)
        if (res.ok) {
            const { token } = await res.json();
            localStorage.setItem("jwt", token); // Store JWT for session
            alert("JWT login successful!");
        } else {
            alert("JWT login failed!");
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "/api/auth/google"; // Redirect to Google OAuth
    };

    const handleFacebookLogin = () => {
        window.location.href = "/api/auth/facebook"; // Redirect to Facebook OAuth
    };

    return (
        <div className="login-page">
            <h1>Login</h1>

            {/* Custom JWT Login */}
            <form onSubmit={handleJWTLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login with Email</button>
            </form>

            {/* Google Login */}
            <button onClick={handleGoogleLogin}>Login with Google</button>

            {/* Facebook Login */}
            <button onClick={handleFacebookLogin}>Login with Facebook</button>
        </div>
    );
}