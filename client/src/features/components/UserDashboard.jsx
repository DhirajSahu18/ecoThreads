import React, { useState, useEffect } from "react";
import { RefreshCcw, Repeat, Clock, CheckCircle, XCircle } from "lucide-react";

const UserDashboard = () => {
  // State to hold API data
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's requests from API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const response = await fetch(
          "http://localhost:8080/api/requests/user",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Calculate stats for display
  const stats = [
    {
      title: "Recycling Requests",
      count: requests.filter((req) => req.type === "recycle").length,
      icon: <RefreshCcw className="text-green-600" />,
    },
    {
      title: "Upcycling Requests",
      count: requests.filter((req) => req.type === "upcycle").length,
      icon: <Repeat className="text-amber-600" />,
    },
    {
      title: "Pending Requests",
      count: requests.filter((req) => req.status === "pending").length,
      icon: <Clock className="text-yellow-500" />,
    },
    {
      title: "Approved Requests",
      count: requests.filter((req) => req.status === "accepted").length,
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      title: "Rejected Requests",
      count: requests.filter((req) => req.status === "rejected").length,
      icon: <XCircle className="text-red-500" />,
    },
  ];

  return (
    <>
      <nav className="bg-green-600 p-4 text-white flex justify-between items-center">
        <a href="/">
          <h1 className="text-2xl font-bold">EcoThreads</h1>
        </a>
        <ul className="flex space-x-4 mt-2">
          <li>
            <a href="/request" className="hover:underline">
              Request
            </a>
          </li>
          <li>
            <a href="/user-dashboard" className="hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/logout" className="hover:underline">
              Logout
            </a>
          </li>
        </ul>
      </nav>
      <div className="min-h-screen bg-[#f0fdf4] p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-emerald-800 mb-1">
            User Dashboard
          </h1>
          <p className="text-emerald-600 mb-6">
            View all your recycling and upcycling requests
          </p>

          {/* Loading and Error States */}
          {loading && <p className="text-gray-600">Loading requests...</p>}
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
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-emerald-800">
                Your Requests
              </h2>
              {requests.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {requests.map((request) => (
                    <div
                      key={request._id}
                      className="border p-4 rounded-md flex justify-between items-start"
                    >
                      <div>
                        <p className="text-gray-800 font-medium">
                          {request.name}
                        </p>
                        <p className="text-gray-600">
                          <strong>Type:</strong>{" "}
                          {request.type === "recycle"
                            ? "Recycling"
                            : "Upcycling"}
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
                          <strong>Status:</strong>{" "}
                          <span
                            className={
                              request.status === "accepted"
                                ? "text-green-600"
                                : request.status === "rejected"
                                ? "text-red-600"
                                : "text-yellow-600"
                            }
                          >
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </span>
                        </p>
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
                  You haven't submitted any requests yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
