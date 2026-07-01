import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Users,
  Calendar,
  Clock,
} from "lucide-react";

import {
  getAdminVenues,
  updateVenueApprovalStatus,
} from "../services/adminVenueService.js";

function AdminDashboard() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadVenues = async () => {
      try {
        const result = await getAdminVenues();

        if (isMounted) {
          setVenues(result.data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message || "Failed to fetch Venues"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadVenues();

    return () => {
      isMounted = false;
    };
  }, []);


  const updateStatus = async (id, status) => {
    try {
      setActionLoadingId(id);
      setError("");

      const result = await updateVenueApprovalStatus(id, status);

      setVenues((prev) =>
        prev.map((venue) =>
          venue._id === id ? result.data : venue
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update venue status");
    } finally {
      setActionLoadingId("");
    }
  };

  const stats = useMemo(() => {
    const totalVenues = venues.length;
    const approved = venues.filter((v) => v.status === "approved").length;
    const pending = venues.filter((v) => v.status === "pending").length;
    const rejected = venues.filter((v) => v.status === "rejected").length;

    return {
      totalVenues,
      approved,
      pending,
      rejected,
    };
  }, [venues]);

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f5] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f5] p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#4a1625]">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage venues, owners and platform approvals.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Venues</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {stats.totalVenues}
            </h2>
          </div>
          <Building2 className="text-blue-600" size={35} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Approved</p>
            <h2 className="text-3xl font-bold text-green-600">
              {stats.approved}
            </h2>
          </div>
          <Users className="text-green-600" size={35} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600">
              {stats.pending}
            </h2>
          </div>
          <Clock className="text-yellow-600" size={35} />
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Rejected</p>
            <h2 className="text-3xl font-bold text-red-600">
              {stats.rejected}
            </h2>
          </div>
          <Calendar className="text-red-600" size={35} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow mt-10 p-6">
        <h2 className="text-2xl font-semibold text-[#4a1625] mb-6">
          Venue Approval Requests
        </h2>

        {venues.length === 0 ? (
          <p className="text-gray-500">No venues found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-gray-600">
                  <th className="py-3">Venue</th>
                  <th>Owner</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {venues.map((venue) => (
                  <tr key={venue._id} className="border-b">
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{venue.name}</p>
                        <p className="text-sm text-gray-500">
                          Capacity: {venue.capacity?.min} - {venue.capacity?.max}
                        </p>
                      </div>
                    </td>

                    <td>
                      {venue.owner?.name || "Seed/Admin Venue"}
                    </td>

                    <td>
                      {venue.town}, {venue.district}
                    </td>

                    <td>{venue.category}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          venue.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : venue.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {formatStatus(venue.status)}
                      </span>
                    </td>

                    <td>
                      {venue.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            disabled={actionLoadingId === venue._id}
                            onClick={() =>
                              updateStatus(venue._id, "approved")
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                          >
                            Approve
                          </button>

                          <button
                            disabled={actionLoadingId === venue._id}
                            onClick={() =>
                              updateStatus(venue._id, "rejected")
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-gray-200 px-4 py-2 rounded-lg"
                          onClick={() =>
                            alert(
                              `Venue: ${venue.name}\nOwner: ${venue.owner?.name || "N/A"}\nLocation: ${venue.town}, ${venue.district}\nCategory: ${venue.category}\nStatus: ${formatStatus(venue.status)}`
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

export default AdminDashboard;