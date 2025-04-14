import React, { useState } from "react";
import axios from "axios";

const RequestForm = () => {
  const [form, setForm] = useState({
    name: "",
    material: "",
    condition: "good",
    image: "",
    pickupAddress: "",
    pickupTime: "",
    type: "recycle",
    userId: localStorage.getItem("userId") || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/requests", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Request submitted!");
    } catch (err) {
      alert(err.response.data.message || "Request failed");
    }
  };

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
      <div className="flex justify-center items-center min-h-screen bg-green-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold mb-4 text-green-700">
            Request Form
          </h2>
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Your Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Material"
            required
            onChange={(e) => setForm({ ...form, material: e.target.value })}
          />
          <select
            className="w-full p-2 mb-4 border rounded"
            onChange={(e) => setForm({ ...form, condition: e.target.value })}
          >
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="worn">Worn</option>
          </select>
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Image URL"
            required
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Pickup Address"
            required
            onChange={(e) =>
              setForm({ ...form, pickupAddress: e.target.value })
            }
          />
          <input
            className="w-full p-2 mb-4 border rounded"
            type="datetime-local"
            onChange={(e) => setForm({ ...form, pickupTime: e.target.value })}
          />
          <select
            className="w-full p-2 mb-4 border rounded"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="recycle">Recycle</option>
            <option value="upcycle">Upcycle</option>
          </select>

          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Submit Request
          </button>
        </form>
      </div>
    </>
  );
};

export default RequestForm;
