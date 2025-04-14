import React, { useState } from "react";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-emerald-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">
            <div className="text-2xl font-bold">EcoThreads</div>
          </a>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="#hero" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#impact" className="hover:underline">
                Impact
              </a>
            </li>
            <li>
              <a href="#how" className="hover:underline">
                How It Works
              </a>
            </li>
            <li>
              <a href="/user-dashboard" className="hover:underline">
                Dashboard
              </a>
            </li>
            {!userId ? (
              <li>
                <a href="/login" className="hover:underline">
                  Login/Signup
                </a>
              </li>
            ) : (
              <li>
                <a href="/logout" className="hover:underline">
                  Logout
                </a>
              </li>
            )}
          </ul>
        </div>
        {isMenuOpen && (
          <ul className="md:hidden bg-emerald-500 px-4 pt-2 pb-4 space-y-2">
            <li>
              <a href="#hero" className="block hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="block hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#impact" className="block hover:underline">
                Impact
              </a>
            </li>
            <li>
              <a href="#how" className="block hover:underline">
                How It Works
              </a>
            </li>
            {!userId ? (
              <li>
                <a href="/login" className="hover:underline">
                  Login/Signup
                </a>
              </li>
            ) : (
              <li>
                <a href="/logout" className="hover:underline">
                  Logout
                </a>
              </li>
            )}
          </ul>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="bg-emerald-100 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Give Your Clothes a Second Life
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          EcoThreads helps you recycle or upcycle your unused clothing, reducing
          waste and giving fashion a new future.
        </p>
      </section>

      {/* Our Services */}
      <section id="services" className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Recycle Evaluation</h3>
            <p>
              Our system evaluates each item to determine if it should be
              recycled or upcycled.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Creative Upcycling</h3>
            <p>
              We transform eligible items into fashionable new pieces or useful
              products.
            </p>
          </div>
        </div>
      </section>

      {/* Fashion Industry Impact */}
      <section id="impact" className="bg-emerald-50 py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8">
          The Fashion Industry's Impact
        </h2>
        <p className="max-w-3xl mx-auto text-lg">
          Fashion accounts for 10% of global carbon emissions. Every second, a
          truckload of textiles is landfilled or burned. By recycling and
          upcycling, we reduce this burden on our planet.
        </p>
      </section>

      {/* How It Works */}
      <section id="how" className="py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="text-4xl font-bold mb-2">1</div>
            <p>Submit your clothing through our portal.</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">2</div>
            <p>Our system evaluates each piece.</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">3</div>
            <p>Items are either recycled or upcycled.</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4</div>
            <p>You get updates and can track progress.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-600 text-white text-center py-6">
        <p>&copy; 2025 EcoThreads. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
