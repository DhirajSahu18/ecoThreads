import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-emerald-700 text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EcoThreads</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><a href="#hero" className="hover:text-emerald-200">Home</a></li>
          <li><a href="#services" className="hover:text-emerald-200">Our Services</a></li>
          <li><a href="#impact" className="hover:text-emerald-200">Impact</a></li>
          <li><a href="#how-it-works" className="hover:text-emerald-200">How it Works</a></li>
          <li><a href="#footer" className="hover:text-emerald-200">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2 pb-3">
          <a href="#hero" className="block text-white hover:text-emerald-200">Home</a>
          <a href="#services" className="block text-white hover:text-emerald-200">Our Services</a>
          <a href="#impact" className="block text-white hover:text-emerald-200">Impact</a>
          <a href="#how-it-works" className="block text-white hover:text-emerald-200">How it Works</a>
          <a href="#footer" className="block text-white hover:text-emerald-200">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
