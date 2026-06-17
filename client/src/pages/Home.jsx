import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
function Home() {
  return (
    <div className="min-h-screen bg-[#faf7f5]">
      {/* Navbar */}
   <nav className="bg-white px-6 py-4 shadow-sm">
  <div className="flex items-center justify-between w-full">

  {/* Left */}
  <Link
    to="#"
    className="text-[#8b1e2d] font-semibold hover:text-black transition-colors "
  >
    RegisterMyVenue
  </Link>

  {/* Center */}
  <div className="flex items-center gap-6">
    <Link
      to="/features"
      className="text-[#8b1e2d] hover:text-black transition-colors"
    >
      Venue
    </Link>
    <Link
      to="/features"
      className="text-[#8b1e2d] hover:text-black transition-colors"
    >
      Contact Us
    </Link>

    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-[#4a1625] flex items-center justify-center">
        <MapPin size={24} className="text-white" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900">
        BookMy<span className="text-[#8b1e2d]">Venue</span>
      </h1>
    </div>

    <Link
      to="/features"
      className="text-[#8b1e2d] hover:text-black font-medium"
    >
      Features
    </Link>

    <Link
      to="/contact"
      className="text-[#8b1e2d] hover:text-black font-medium"
    >
      Contact Us
    </Link>
  </div>

  {/* Right */}
  <div className="flex items-center gap-4">
    <Link
      to="/help"
      className="text-[#8b1e2d] font-semibold hover:text-black transition-colors"
    >
      Get Help
    </Link>

    <Link
      to="/login"
      className="text-[#8b1e2d] font-semibold hover:text-black transition-colors"
    >
      Login
    </Link>
  </div>

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

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 rounded-2xl text-white font-semibold bg-gradient-to-r from-red-600 to-[#4a1625]">
            🔍 Browse Venues
          </button>

          <button className="px-8 py-4 rounded-2xl bg-white border font-semibold">
            List Your Venue
          </button>
        </div>

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
            <h2 className="text-3xl ">2.4k+</h2>
            <p className="text-gray-500">Venues Listed</p>
          </div>

          <div>
            <h2 className="text-3xl">180+</h2>
            <p className="text-gray-500">Cities</p>
          </div>

          <div>
            <h2 className="text-3xl ">50k+</h2>
            <p className="text-gray-500">Bookings</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;