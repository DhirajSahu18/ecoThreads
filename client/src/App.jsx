import { useState } from "react";
import "./App.css";
import Demo from "./features/demo/Demo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./features/components/AdminDashboard";
import Login from "./features/components/Login";
import Signup from "./features/components/Signup";
import HomePage from "./features/components/Homepage";
import RequestForm from "./features/components/RequestForm";
import UserDashboard from "./features/components/UserDashboard";
import Logout from "./features/components/Logout";
import Protected from "./features/components/Protected";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route
            path="/user-dashboard"
            element={
              <Protected>
                <UserDashboard />
              </Protected>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
