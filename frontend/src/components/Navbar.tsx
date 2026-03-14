// src/components/Navbar.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on admin/mentee pages
  const hiddenPaths = [
    '/login',
    '/mentee/login',
    '/mentee/dashboard',
    '/dashboard',
    '/mentors',
    '/mentees',
    '/matches',
    '/progress',
  ];

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/img/HORIZONTAL.png" alt="Guiding Stars" className="h-12" />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            // X icon when open
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon when closed
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="font-semibold hover:text-orange-300 transition">Home</Link>
          <Link to="/about" className="font-semibold hover:text-orange-300 transition">About</Link>
          <Link to="/team" className="font-semibold hover:text-orange-300 transition">Team</Link>
          <Link to="/contact" className="font-semibold hover:text-orange-300 transition">Contact Us</Link>

          {/* Events Dropdown */}
          <div className="relative group">
            <button className="font-semibold hover:text-orange-300 transition flex items-center">
              Events <span className="ml-1">▼</span>
            </button>
            <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded mt-2 w-48">
              <Link to="/graduation" className="block px-4 py-2 hover:bg-gray-100">
                First Cohort Graduation
              </Link>
            </div>
          </div>

          <Link
            to="/apply"
            className="text-white px-6 py-2.5 rounded-lg font-semibold transition"
            style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
          >
            APPLY NOW
          </Link>

          <Link to="/login" className="text-gray-400 hover:text-white text-sm transition" title="Admin Login">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </Link>
        </nav>
      </div>

      {/* Mobile Menu - slides open when mobileOpen is true */}
      {mobileOpen && (
        <nav className="lg:hidden bg-gray-800 px-6 pb-6 space-y-4">
          <Link
            to="/"
            className="block font-semibold py-2 border-b border-gray-700 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block font-semibold py-2 border-b border-gray-700 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            About
          </Link>
          <Link
            to="/team"
            className="block font-semibold py-2 border-b border-gray-700 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Team
          </Link>
          <Link
            to="/contact"
            className="block font-semibold py-2 border-b border-gray-700 hover:text-orange-300 transition"
            onClick={() => setMobileOpen(false)}
          >
            Contact Us
          </Link>

          {/* Events accordion on mobile */}
          <div className="border-b border-gray-700">
            <button
              className="w-full text-left font-semibold py-2 hover:text-orange-300 transition flex justify-between items-center"
              onClick={() => setEventsOpen(!eventsOpen)}
            >
              Events <span>{eventsOpen ? '▲' : '▼'}</span>
            </button>
            {eventsOpen && (
              <div className="pl-4 pb-2">
                <Link
                  to="/graduation"
                  className="block py-2 text-gray-300 hover:text-orange-300 transition"
                  onClick={() => { setMobileOpen(false); setEventsOpen(false); }}
                >
                  First Cohort Graduation
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/apply"
            className="block text-center text-white py-3 rounded-lg font-semibold transition mt-2"
            style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
            onClick={() => setMobileOpen(false)}
          >
            APPLY NOW
          </Link>

          <Link
            to="/login"
            className="block text-center text-gray-400 hover:text-white py-2 text-sm transition"
            onClick={() => setMobileOpen(false)}
          >
            Staff / Admin Login
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;