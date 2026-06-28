import { MapPin, Star, Users, Wifi, Coffee } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getVenues, getNearbyVenues } from "../services/venueService.js";

export default function VenuePage() {
    const [searchParams] = useSearchParams();

  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isNearbySearch =
    searchParams.has("lat") && searchParams.has("lng");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError("");

        const filters = Object.fromEntries(searchParams.entries());

        const result = isNearbySearch
          ? await getNearbyVenues(filters)
          : await getVenues(filters);

        setVenues(result.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch venues"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [searchParams, isNearbySearch]);

  if (loading) {
    return <p>Loading venues...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <section className="bg-[#faf8f5] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">

        <p className="uppercase tracking-[4px] text-[#8b1e2d] text-sm font-semibold">
          Featured Venues
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2 mb-10">

          <h1 className="text-5xl font-serif font-semibold text-gray-900">
            Loved by the{" "}
            <span className="text-[#8b1e2d]">community</span>
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 duration-300"
            >

              <div className="relative">

                <img
                  src={venue.images?.[0] || "/placeholder-venue.jpg"}
                  alt={venue.name}
                  className="w-full h-64 object-cover"
                />

                <span className="absolute top-4 left-4 bg-white px-4 py-1 rounded-full text-xs font-semibold">
                  {venue.category}
                </span>

                <span className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <Star size={14} fill="red" className="text-red-500" />
                  {venue.rating}
                </span>
              </div>

              <div className="p-6">

                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-xl">
                    {venue.name}
                  </h2>

                  <span className="font-semibold text-[#8b1e2d]">
                    Starting from ₹{venue.pricing?.basePrice}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 mt-3">
                  <MapPin size={16} />
                  {venue.town}, {venue.district}
                </div>

                <div className="flex justify-between items-center mt-6">

                  <div className="flex gap-4 text-gray-500">

                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      Capacity: {venue.capacity?.min} - {venue.capacity?.max}
                    </div>

                    <Wifi size={16} />

                    <Coffee size={16} />

                  </div>

                  <button className="bg-[#8b1e2d] hover:bg-[#6f1824] text-white px-5 py-2 rounded-xl transition">
                    Book Now
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}