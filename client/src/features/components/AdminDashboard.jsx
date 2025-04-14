import React, { useState, useEffect } from "react";
import { RefreshCcw, Repeat, Clock, CheckCircle, XCircle } from "lucide-react";

const AdminDashboard = () => {
  // State to hold API data
  const [apiData, setApiData] = useState({
    requests: [],
    stats: {
      recycled: 0,
      upcycled: 0,
      pending: 0,
      accepted: 0,
      rejected: 0,
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const response = await fetch("http://localhost:8080/api/requests/all", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle status change
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }

      const response = await fetch(
        `http://localhost:8080/api/requests/${requestId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedRequest = await response.json();

      // Update the local state with the updated request
      setApiData((prevData) => {
        const updatedRequests = prevData.requests.map((req) =>
          req._id === requestId ? updatedRequest : req
        );

        // Recalculate stats based on updated requests
        const stats = {
          recycled: updatedRequests.filter((req) => req.type === "recycle")
            .length,
          upcycled: updatedRequests.filter((req) => req.type === "upcycle")
            .length,
          pending: updatedRequests.filter((req) => req.status === "pending")
            .length,
          accepted: updatedRequests.filter((req) => req.status === "accepted")
            .length,
          rejected: updatedRequests.filter((req) => req.status === "rejected")
            .length,
        };

        return {
          requests: updatedRequests,
          stats,
        };
      });
    } catch (err) {
      alert(`Error updating status: ${err.message}`);
    }
  };

  // Stats array for rendering
  const stats = [
    {
      title: "Recycled Items",
      count: apiData.stats.recycled,
      icon: <RefreshCcw className="text-green-600" />,
    },
    {
      title: "Upcycled Items",
      count: apiData.stats.upcycled,
      icon: <Repeat className="text-amber-600" />,
    },
    {
      title: "Pending Requests",
      count: apiData.stats.pending,
      icon: <Clock className="text-yellow-500" />,
    },
    {
      title: "Approved Requests",
      count: apiData.stats.accepted,
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      title: "Rejected Requests",
      count: apiData.stats.rejected,
      icon: <XCircle className="text-red-500" />,
    },
  ];

  // Filter requests by type
  const recyclingRequests = apiData.requests.filter(
    (req) => req.type === "recycle"
  );
  const upcyclingRequests = apiData.requests.filter(
    (req) => req.type === "upcycle"
  );

  return (
    <>
      <nav className="p-4 shadow-md bg-emerald-600 text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a
            href="/"
            className="text-2xl font-bold"
          >
            Ecothread
          </a>
          <div className="flex space-x-4">
            <a
              href="/logout"
              className="hover:underline"
            >
              Logout
            </a>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-[#f0fdf4] p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-emerald-800 mb-1">
            Admin Dashboard
          </h1>
          <p className="text-emerald-600 mb-6">
            Manage all recycling and upcycling requests
          </p>

          {/* Loading and Error States */}
          {loading && <p className="text-gray-600">Loading data...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          {/* Stats Cards */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-2xl font-bold text-emerald-700">
                      {stat.count}
                    </span>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Requests Section */}
          {!loading && !error && (
            <div className="space-y-6">
              {/* Recycling Requests */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-emerald-800">
                  Recycling Requests
                </h2>
                {recyclingRequests.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {recyclingRequests.map((request) => (
                      <div
                        key={request._id}
                        className="border p-4 rounded-md flex justify-between items-start"
                      >
                        <div>
                          <p className="text-gray-800 font-medium">
                            {request.name}
                          </p>
                          <p className="text-gray-600">
                            <strong>Material:</strong> {request.material}
                          </p>
                          <p className="text-gray-600">
                            <strong>Condition:</strong> {request.condition}
                          </p>
                          <p className="text-gray-600">
                            <strong>Pickup Address:</strong>{" "}
                            {request.pickupAddress}
                          </p>
                          <p className="text-gray-600">
                            <strong>Pickup Time:</strong>{" "}
                            {new Date(request.pickupTime).toLocaleString()}
                          </p>
                          <p className="text-gray-600">
                            <strong>Status:</strong> {request.status}
                          </p>
                          {/* Status Change Dropdown */}
                          <div className="mt-2">
                            <label className="text-gray-600 mr-2">
                              Change Status:
                            </label>
                            <select
                              value={request.status}
                              onChange={(e) =>
                                handleStatusChange(request._id, e.target.value)
                              }
                              className="border rounded-md p-1 text-gray-700"
                            >
                              <option value="pending">Pending</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                        <a
                          href={request.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          View Image
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 mt-1">
                    You don't have any recycling requests yet.
                  </p>
                )}
              </div>

              {/* Upcycling Requests */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-emerald-800">
                  Upcycling Requests
                </h2>
                {upcyclingRequests.length > 0 ? (
                  <div className="mt-4 space-y-4">
                    {upcyclingRequests.map((request) => (
                      <div
                        key={request._id}
                        className="border p-4 rounded-md flex justify-between items-start"
                      >
                        <div>
                          <p className="text-gray-800 font-medium">
                            {request.name}
                          </p>
                          <p className="text-gray-600">
                            <strong>Material:</strong> {request.material}
                          </p>
                          <p className="text-gray-600">
                            <strong>Condition:</strong> {request.condition}
                          </p>
                          <p className="text-gray-600">
                            <strong>Pickup Address:</strong>{" "}
                            {request.pickupAddress}
                          </p>
                          <p className="text-gray-600">
                            <strong>Pickup Time:</strong>{" "}
                            {new Date(request.pickupTime).toLocaleString()}
                          </p>
                          <p className="text-gray-600">
                            <strong>Status:</strong> {request.status}
                          </p>
                          {/* Status Change Dropdown */}
                          <div className="mt-2">
                            <label className="text-gray-600 mr-2">
                              Change Status:
                            </label>
                            <select
                              value={request.status}
                              onChange={(e) =>
                                handleStatusChange(request._id, e.target.value)
                              }
                              className="border rounded-md p-1 text-gray-700"
                            >
                              <option value="pending">Pending</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                        <a
                          href={request.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:underline"
                        >
                          View Image
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 mt-1">
                    You don't have any upcycling requests yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
