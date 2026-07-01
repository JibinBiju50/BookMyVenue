import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
} from "lucide-react";

import {
  getOwnerBookingInquiries,
  updateBookingInquiryStatus,
} from "../services/bookingInquiryService.js";

function OwnerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      try {
        const result = await getOwnerBookingInquiries();

        if (isMounted) {
          setBookings(result.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message || "Failed to fetch booking inquiries"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      setActionLoadingId(id);
      setError("");

      const result = await updateBookingInquiryStatus(id, status);

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? result.data : booking
        )
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update booking status"
      );
    } finally {
      setActionLoadingId("");
    }
  };

  const stats = useMemo(() => {
    const total = bookings.length;
    const accepted = bookings.filter((b) => b.status === "accepted").length;
    const pending = bookings.filter((b) => b.status === "pending").length;
    const rejected = bookings.filter((b) => b.status === "rejected").length;

    return {
      total,
      accepted,
      pending,
      rejected,
    };
  }, [bookings]);

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f5] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading owner dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f5] p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#4a1625]">
          Owner Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your venues, bookings and inquiries.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Inquiries</p>
              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {stats.total}
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="text-blue-600" size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-green-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Accepted</p>
              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {stats.accepted}
              </h2>
            </div>

            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="text-green-600" size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-yellow-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Pending</p>
              <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                {stats.pending}
              </h2>
            </div>

            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="text-yellow-600" size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Rejected</p>
              <h2 className="text-3xl font-bold text-red-600 mt-2">
                {stats.rejected}
              </h2>
            </div>

            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="text-red-600" size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md mt-10 p-6">
        <h2 className="text-2xl font-semibold text-[#4a1625] mb-6">
          Recent Booking Requests
        </h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No booking inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-gray-600">
                  <th className="py-3">Customer</th>
                  <th>Venue</th>
                  <th>Date</th>
                  <th>Guests</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-sm text-gray-500">
                          {booking.customerPhone}
                        </p>
                      </div>
                    </td>

                    <td>{booking.venue?.name || "Venue unavailable"}</td>

                    <td>{booking.eventDate}</td>

                    <td>{booking.guestCount}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {formatStatus(booking.status)}
                      </span>
                    </td>

                    <td>
                      {booking.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            disabled={actionLoadingId === booking._id}
                            onClick={() =>
                              updateBookingStatus(booking._id, "accepted")
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-60"
                          >
                            Accept
                          </button>

                          <button
                            disabled={actionLoadingId === booking._id}
                            onClick={() =>
                              updateBookingStatus(booking._id, "rejected")
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-60"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                          onClick={() =>
                            alert(
                              `Booking Details\n\nCustomer: ${booking.customerName}\nPhone: ${booking.customerPhone}\nEmail: ${booking.customerEmail || "N/A"}\nVenue: ${booking.venue?.name || "N/A"}\nDate: ${booking.eventDate}\nGuests: ${booking.guestCount}\nStatus: ${formatStatus(booking.status)}\nMessage: ${booking.message || "N/A"}`
                            )
                          }
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerDashboard;