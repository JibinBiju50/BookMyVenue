import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f5]">
      {/* Navbar */}
<nav className="bg-white px-100 py-6 shadow-sm">
  <div className="flex justify-center items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-[#4a1625] flex items-center justify-center">
      <MapPin size={24} className="text-white" />
    </div>
    <h1 className="text-2xl font-bold text-gray-900">
      BookMy<span className="text-[#8b1e2d]">Venue</span>
    </h1>
  </div>
  <div>
    <Link
    to="/login"
    className="absolute right-3 -translate-y-1/2 text-[#8b1e2d] font-semibold hover:text-black transition-colors">
  
    Login
  </Link>
   <Link
  to="/GetHelp"
  className="absolute right-18  -translate-y-1/2 text-[#8b1e2d] font-semibold hover:text-black transition-colors">

  Get Help
</Link>
  <Link
    to="/RegisterMyVenue"
    className="absolute left-3 -translate-y-4/5 text-[#8b1e2d] font-semibold hover:text-black transition-colors">
  
    RegisterMyVenue
  </Link>
  </div>
  <div>
    <Link
    to="/login"
    className="absolute right-100 -translate-y-10 text-[#8b1e2d] font-semibold hover:text-black transition-colors">
  
  Contact Us
  </Link>
   <Link
  to="/GetHelp"
  className="absolute right-150  -translate-y-10 text-[#8b1e2d] font-semibold hover:text-black transition-colors">

  Category
</Link>
  <Link
    to="/RegisterMyVenue"
    className="absolute left-100 -translate-y-10 text-[#8b1e2d] font-semibold hover:text-black transition-colors">
  
    Venue
  </Link>
   <Link
    to="/RegisterMyVenue"
    className="absolute left-150 -translate-y-10 text-[#8b1e2d] font-semibold hover:text-black transition-colors">
  
  Feature
  </Link>
  </div>
</nav>
  
       
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        

        <h1 className="mt-6 text-5xl md:text-7xl font-serif leading-tight">
          Find the{" "}
          <span className="text-[#8b1e2d]">
            perfect venue
          </span>
          <br />
          for every occasion
        </h1>

        <p className="mt-6 text-gray-600 text-lg max-w-2xl">
          Discover and book cafes, auditoriums, conference halls,
          wedding venues, outdoor spaces and more.
        </p>

        

        {/* Search Card */}
        <div className="mt-12 bg-white rounded-3xl shadow-md p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                WHERE
              </label>

              <input
                type="text"
                placeholder="City or Area"
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                WHEN
              </label>

              <input
                type="date"
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">
                TYPE
              </label>

              <select className="w-full p-3 border rounded-xl">
                <option>Any Venue</option>
                <option>Wedding Hall</option>
                <option>Conference Hall</option>
                <option>Cafe</option>
              </select>
            </div>
          </div>

          <button className="mt-6 w-full py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-red-600 to-[#4a1625]">
            🔍 Search
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 flex gap-12">
          <div>
            <h2 className="text-2xl ">2.4k+</h2>
            <p className="text-gray-500">Venues Listed</p>
          </div>

          <div>
            <h2 className="text-2xl ">180+</h2>
            <p className="text-gray-500">Cities</p>
          </div>

          <div>
            <h2 className="text-2xl ">50k+</h2>
            <p className="text-gray-500">Bookings</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;