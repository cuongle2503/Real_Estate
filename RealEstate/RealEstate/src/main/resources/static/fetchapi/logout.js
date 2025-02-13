function logout() {
    localStorage.removeItem("authToken");
    alert("Logged out successfully");

    window.location.href = "/login";
}
