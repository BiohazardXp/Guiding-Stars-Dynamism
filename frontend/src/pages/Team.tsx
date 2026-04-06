// src/pages/Team.tsx
//import React from 'react';
import Footer from '../components/Footer';

// Import images (use root-relative public paths)
const topBanner = "/img/Top-Bunner-1.jpg";

// Team member images (use root-relative public paths)
const twaambo = "/img/TEAM/twaambo_optimized.png";
const lisa = "/img/TEAM/lisa_optimized.png";
const nangoma = "/img/TEAM/nangoma_optimized.png";
const grace = "/img/TEAM/grace_optimized.png";
const rachael = "/img/TEAM/rachael_optimed.png";
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
      {/* Navbar is provided globally by the Navbar component */}

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
      <Footer />
    </div>
  );
};

export default Team;