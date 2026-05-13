// src/pages/Team.tsx
import { useState } from 'react';
import Footer from '../components/Footer';

// Import images (use root-relative public paths)
const topBanner = "/img/Top-Bunner-1.jpg";

// Team member images (use root-relative public paths)
const twaambo = "/img/TEAM/Twaambo Chisamba Kayombo.png";
const lisa = "/img/TEAM/Lisa T Chansa.png";
const nangoma = "/img/TEAM/Nangoma Mwanamoonte.png";
const tabitha = "/img/TEAM/Tabitha Muzumara.png";
const edward = "/img/TEAM/Edward Kafusa.png";
const lwanga = "/img/TEAM/Lwanga C Luchembe.png";

const teamMembers = [
  {
    name: 'Ms Twaambo Chisamba Kayombo',
    role: 'CEO & Founder',
    image: twaambo,
    description: 'Through this role, she provides strategic leadership and sets the overall vision and direction of the organization, ensuring alignment of all programs, operations, and partnerships with its mission and goals. She oversees organizational growth, governance, and stakeholder engagement while driving innovation and long-term impact across all initiatives.'
  },
  {
    name: 'Ms Tabitha Muzumara',
    role: 'Sales & Marketing Coordinator',
    image: tabitha,
    description: 'Through this position, she promotes the organization, attracts mentors and mentees, and develops marketing strategies to increase engagement.'
  },
  {
    name: 'Mr. Edward Kafusa',
    role: 'Events & Program Coordinator',
    image: edward,
    description: 'Through this role, he plans and coordinates mentorship programs and events, fostering meaningful interactions between mentors and mentees & other stakeholders. He also serves as Co-Administrator for the organization, supporting overall coordination and operations.'
  },
  {
    name: 'Ms Nangoma Mwanamoonte',
    role: 'Finance & Administration Coordinator',
    image: nangoma,
    description: 'Through this role, she oversees financial and administrative functions, ensuring effective resource management, organizational compliance, and smooth day-to-day operations that support the organization\'s activities.'
  },
  {
    name: 'Mr Chilufya Lwanga Luchembe',
    role: 'Mentorship Program Coordinator',
    image: lwanga,
    description: 'Through this role, he oversees the planning and implementation of mentorship programs, facilitating meaningful engagement between mentors and mentees while ensuring the overall success and impact of the program.'
  },
  {
    name: 'Ms Lisa Taonga Chansa',
    role: 'Digital & Communications Coordinator',
    image: lisa,
    description: 'Through this role, she manages the organization\'s digital presence, brand, and public relations, creating engaging content, enhancing visibility, and driving audience engagement across platforms.'
  },
];

const Team = () => {
  const [flipped, setFlipped] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlipped(flipped === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="h-96 cursor-pointer perspective"
                onClick={() => toggleFlip(index)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500 transform"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front of card - Image & Name */}
                  <div
                    className="absolute w-full h-full bg-white rounded-xl shadow-lg overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="p-6 h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-orange-50 to-gray-50">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-40 h-48 object-cover rounded-lg mx-auto mb-4 border-4 shadow-md"
                        style={{ borderColor: '#FF9148' }}
                      />
                      <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                      <p className="font-semibold mt-2" style={{ color: '#FF9148' }}>
                        {member.role}
                      </p>
                      <p className="text-xs text-gray-500 mt-3">Click to learn more</p>
                    </div>
                  </div>

                  {/* Back of card - Description */}
                  <div
                    className="absolute w-full h-full bg-gradient-to-br rounded-xl shadow-lg overflow-hidden p-6 flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)',
                    }}
                  >
                    <div className="text-white text-center">
                      <h4 className="text-lg font-bold mb-3">{member.role}</h4>
                      <p className="text-sm leading-relaxed opacity-95">{member.description}</p>
                      <p className="text-xs mt-4 opacity-75">Click to go back</p>
                    </div>
                  </div>
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