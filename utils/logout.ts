export const logout = () => {
    localStorage.removeItem("jwt"); // Clear the token
    window.location.href = "/login"; // Redirect to the login page
};