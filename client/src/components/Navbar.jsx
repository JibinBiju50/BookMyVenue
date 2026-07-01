import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";


function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", {
      replace: true
    })
  }
  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-red-600 to-[#4a1625] flex items-center justify-center shadow-lg">
            <MapPin size={22} className="text-white" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            BookMy<span className="text-[#8b1e2d]">Venue</span>
          </h1>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link
            to="/venues"
            className="text-gray-700 hover:text-[#8b1e2d] transition"
          >
            Venues
          </Link>

          <Link
            to="/features"
            className="text-gray-700 hover:text-[#8b1e2d] transition"
          >
            Features
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-[#8b1e2d] transition"
          >
            Contact Us
          </Link>
        </div>

        {/* Login Button */}
        {user ? (
          <div>
            <button onClick={handleLogout} className="px-5 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-red-600 to-[#4a1625] shadow-lg hover:scale-105 transition">Logout</button>
          </div>
        ) : (
          < Link
            to="/login"
            className="px-5 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-red-600 to-[#4a1625] shadow-lg hover:scale-105 transition"
          >
            Login
          </Link>
        )} 
    </div>
    </nav >
  )
}
export default Navbar;