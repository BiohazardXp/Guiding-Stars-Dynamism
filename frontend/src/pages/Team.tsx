// src/pages/Team.tsx
//import React from 'react';
import { Link } from 'react-router-dom';

// Import images (adjust paths based on your public/img folder)
const horizontalLogo = ".../img/HORIZONTAL.png";
const horizontalLogo2 = "./img/HORIZONTAL (2).png";
const topBanner = "./img/Top-Bunner-1.jpg";

// Team member images (add all from your img/TEAM folder)
const twaambo = "./img/TEAM/twaambo_optimized.png";
const lisa = "./img/TEAM/Lisa_optimized.png";
const nangoma = "./img/TEAM/nangoma_optimized.png";
const grace = "/img/TEAM/grace_optimized.png";
const rachael = "/img/TEAM/rachael_optimed.png";  // note: "optimed" might be typo — check spelling
const edward = "/img/TEAM/edward_optimized.png";
const pancrecious = "/img/TEAM/pancrecious_optimized.png";
const solomon = "/img/TEAM/solomon_optimized.png";

const teamMembers = [
  { name: 'Twaambo Chisamba Kayombo', role: 'CEO | Founder', image: twaambo },
  { name: 'Lisa Taonga Chansa', role: 'Communications Coordinator', image: lisa },
  { name: 'Nangoma Mwanamoonte', role: 'Finance Officer', image: nangoma },
  { name: 'Grace Nshimbi', role: 'Mentorship Program Coordinator', image: grace },
  { name: 'Racheal Thole', role: 'Marketing Coordinator', image: rachael },
  { name: 'Edward Kafusa', role: 'Events Coordinator', image: edward },
  { name: 'Pancrecious Mulingula', role: 'Graphic Designer', image: pancrecious },
  { name: 'Solomon Ndhlovu', role: 'Operations Coordinator', image: solomon },
];

const Team = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header / Navbar */}
      <header className="bg-navy text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={horizontalLogo} alt="Guiding Stars" className="h-12" />
            </Link>

            {/* Mobile toggle (you can make this functional with state if needed) */}
            <button className="lg:hidden text-white focus:outline-none" aria-label="Toggle navigation">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Nav Links */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-8">
              <Link to="/" className="hover:text-indigo-300 font-semibold">Home</Link>
              <Link to="/about" className="hover:text-indigo-300 font-semibold">About</Link>
              <Link to="/team" className="text-indigo-300 font-bold">Team</Link>
              <Link to="/contact" className="hover:text-indigo-300 font-semibold">Contact Us</Link>

              {/* Events Dropdown */}
              <div className="relative group">
                <button className="hover:text-indigo-300 font-semibold flex items-center">
                  Events
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute hidden group-hover:block bg-white text-gray-800 shadow-lg rounded mt-2 min-w-[180px]">
                  <Link to="/graduation" className="block px-4 py-2 hover:bg-gray-100">
                    First Cohort Graduation
                  </Link>
                </div>
              </div>
            </nav>

            {/* Enquire Button */}
            <a
              href="#contact"
              className="hidden lg:inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded transition"
            >
              ENQUIRE NOW <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="relative">
        <img
          src={topBanner}
          alt="Team Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white px-4">
            <h6 className="text-xl uppercase tracking-widest mb-3">Ignite Success</h6>
            <h1 className="text-5xl md:text-6xl font-bold">TEAM</h1>
          </div>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <div className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-48 object-cover rounded-full mx-auto mb-4 border-4 border-indigo-200"
                  />
                  <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
                  <p className="text-indigo-600 font-medium mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <img src={horizontalLogo2} alt="Guiding Stars" className="h-16 mb-4" />
              <p className="text-gray-400">
                Nurture Brilliance, Ignite Success.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h6 className="text-lg font-semibold mb-4">Contact</h6>
              <p className="mb-2 flex items-start">
                <i className="fas fa-map-marker-alt mr-3 mt-1"></i>
                Plot 25866 Kabangwe, off Great North Road, Lusaka.
              </p>
              <p className="mb-2">
                <i className="fas fa-phone-alt mr-3"></i>
                +260 973 223 910
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i>
                info@guidingstars.com
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h6 className="text-lg font-semibold mb-4">Company</h6>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-indigo-400">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
                <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-400">Terms & Condition</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h6 className="text-lg font-semibold mb-4">Services</h6>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-400">Personalized Guidance</a></li>
                <li><a href="#" className="hover:text-indigo-400">Networking Opportunities</a></li>
                <li><a href="#" className="hover:text-indigo-400">Industry Insights</a></li>
                <li><a href="#" className="hover:text-indigo-400">Career Advancement</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            © {new Date().getFullYear()} Guiding Stars. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Team;