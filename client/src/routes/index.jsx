import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import VenuePage from "../pages/Venues";
import VenueDetails from "../pages/VenueDetails";
import BookingInquiry from "../pages/BookingInquiry";
import OwnerDashboard from "../pages/OwnerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            { path: "venues", element: <VenuePage /> },
            { path: "venues/nearby", element: <VenuePage /> },
            { path: "venues/:id", element: <VenueDetails /> },
            { path: "booking/:venueId", element: <BookingInquiry /> },
            {
                element: <ProtectedRoute allowedRoles={["owner"]} />,
                children: [
                    {
                        path: "owner/dashboard",
                        element: <OwnerDashboard />
                    }
                ]
            },
            {
                element: <ProtectedRoute allowedRoles={["admin"]} />,
                children: [
                    {
                        path: "admin/dashboard",
                        element: <AdminDashboard />
                    }
                ]
            }
        ]
    }
])

export default router;