import { Navigate, Outlet } from "react-router-dom";

const AdminGuard = ({ children }: { children?: React.ReactNode }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
        // Redirect non-admin users
        return <Navigate to="/" replace />;
    }

    // Allow access if admin
    return children ? <>{children}</> : <Outlet />;
};

export default AdminGuard;
