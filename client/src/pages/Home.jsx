import { Link, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [district, setDistrict] = useState("");
  const [town, setTown] = useState("");
  const [category, setCategory] = useState("");
  const [eventDate, setEventDate] = useState("");


    const handleManualSearch = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();

    if (district) queryParams.set("district", district);
    if (town) queryParams.set("town", town);
    if (category) queryParams.set("category", category);
    if (eventDate) queryParams.set("eventDate", eventDate);

    navigate(`/venues?${queryParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf7f5] to-white">
      {/* Navbar */}
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
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl text-white font-medium bg-gradient-to-r from-red-600 to-[#4a1625] shadow-lg hover:scale-105 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center text-center">
          <span className="px-4 py-2 bg-red-100 text-[#8b1e2d] rounded-full text-sm font-medium">
            Kerala's Trusted Venue Booking Platform
          </span>

          <h1 className="mt-8 text-6xl md:text-8xl font-semibold leading-[1.05] tracking-tight text-gray-900">
            Find the{" "}
            <span className="bg-gradient-to-r from-red-600 to-[#4a1625] bg-clip-text text-transparent">
              perfect venue
            </span>
            <br />
            for every occasion
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed font-normal">
            Discover wedding halls, conference centers, resorts,
            auditoriums, party venues and outdoor spaces across Kerala.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/venues"
              className="px-10 py-4 rounded-2xl text-lg font-medium text-white bg-gradient-to-r from-red-600 via-red-700 to-[#4a1625] shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              🔍 Browse Venues
            </Link>

            <Link
              to="/login"
              className="px-10 py-4 rounded-2xl text-lg font-medium bg-white border-2 border-[#8b1e2d] text-[#8b1e2d] hover:bg-[#8b1e2d] hover:text-white shadow-lg hover:scale-105 transition-all duration-300"
            >
              🏢 List Your Venue
            </Link>
          </div>
        </div>

        {/* Search Card */}
        <Form onSubmit={handleManualSearch} className="mt-20 bg-white rounded-[32px] shadow-2xl border border-gray-100 p-10">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-10">
            Find Your Perfect Venue
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Location
              </label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none">
                <option>Select District</option>
                <option>Ernakulam</option>
                <option>Kottayam</option>
                <option>Kozhikode</option>
                <option>Thiruvananthapuram</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Category
              </label>
              <input type="text" placeholder="Town/Area" value={town} onChange={setTown} className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none">
              </input>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Date
              </label>
              <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none">
                <option>Any Event</option>
                <option>Wedding</option>
                <option>Reception</option>
                <option>Birthday Party</option>
                <option>Corporate Event</option>
              </input>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Category
              </label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none">
                <option>Venue Type</option>
                <option>Banquet Hall</option>
                <option>Wedding Hall</option>
                <option>Convention Center</option>
                <option>Resort</option>
                <option>Conference Hall</option>
                <option>Outdoor</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="px-14 py-4 bg-gradient-to-r from-red-600 to-[#4a1625] text-white text-lg font-medium rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
            >
              Search Venues
            </button>
          </div>
        </Form>

        {/* Stats */}
        <div className="mt-24 flex flex-wrap justify-center gap-20 text-center">
          <div>
            <h2 className="text-5xl font-semibold text-[#8b1e2d]">2.4k+</h2>
            <p className="text-gray-600 text-lg font-medium mt-2">
              Venues Listed
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-semibold text-[#8b1e2d]">180+</h2>
            <p className="text-gray-600 text-lg font-medium mt-2">
              Cities Covered
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-semibold text-[#8b1e2d]">50k+</h2>
            <p className="text-gray-600 text-lg font-medium mt-2">
              Successful Bookings
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;