import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);
      console.log(res.data); // token, user
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      alert("Login successful!");
      if(res.data.user.role === 'admin') {
        navigate('/dashboard');
      }
      else {
        navigate('/request');
      }
    } catch (err) {
      alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Login</h2>
        <input className="w-full p-2 mb-4 border rounded" placeholder="Email" type="email" required onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 mb-4 border rounded" placeholder="Password" type="password" required onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Login</button>
        <div className="my-2">
            <span>
                Don't have an account? <a href="/signup" className="text-green-600 hover:underline">Sign Up</a>
            </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
