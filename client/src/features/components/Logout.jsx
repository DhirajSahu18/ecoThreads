import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    alert("Logout successful");
    navigate("/");
  }, []);

  return <div>Wait</div>;
}
