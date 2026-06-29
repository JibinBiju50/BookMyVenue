import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getVenueById } from "../services/venueService";
import { createBookingInquiry } from "../services/bookingInquiryService";

function BookingInquiry() {
  const { venueId } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getVenueById(venueId);
        setVenue(result.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch venue");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitLoading(true);
      setError("");
      setSuccessMessage("");

      await createBookingInquiry({
        venueId,
        ...formData,
      });

      setSuccessMessage("Booking inquiry submitted successfully.");

      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        eventDate: "",
        guestCount: "",
        message: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit booking inquiry");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading booking page...</p>
      </div>
    );
  }

  if (error && !venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-700 text-xl font-medium">{error}</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#faf8f5] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 text-[#8b1e2d] font-medium hover:underline"
        >
          ← Back to venue
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow p-6">
              <img
                src={venue?.images?.[0] || "/placeholder-venue.jpg"}
                alt={venue?.name}
                className="w-full h-56 object-cover rounded-2xl"
              />

              <h1 className="mt-5 text-2xl font-bold text-gray-900">
                {venue?.name}
              </h1>

              <p className="mt-2 text-gray-600">
                {venue?.town}, {venue?.district}
              </p>

              <p className="mt-4 text-[#8b1e2d] font-semibold">
                Starting from ₹{venue?.pricing?.basePrice}
              </p>

              <p className="mt-2 text-gray-600">
                Capacity: {venue?.capacity?.min} - {venue?.capacity?.max} Guests
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow p-8"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Send Booking Inquiry
              </h2>

              <p className="mt-2 text-gray-500">
                The venue owner will review your request and respond later.
              </p>

              {error && (
                <div className="mt-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mt-6 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-green-700">
                  {successMessage}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none"
                    placeholder="Phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none"
                    placeholder="Email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    Guest Count
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none"
                    placeholder="Expected guests"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#8b1e2d] focus:outline-none"
                  placeholder="Tell the owner about your event"
                />
              </div>

              <button
                type="submit"
                disabled={submitLoading}
                className="mt-8 w-full bg-[#8b1e2d] hover:bg-[#6f1824] text-white py-4 rounded-xl font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitLoading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingInquiry;