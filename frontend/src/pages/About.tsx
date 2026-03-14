import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const faqs = [
  {
    question: 'What is the duration of the program?',
    answer:
      'The Guiding Stars mentorship program is designed to run for a duration of 3 months, allowing mentees sufficient time to benefit from the guidance and resources provided. The program includes regular mentorship sessions, trainings and networking events.',
  },
  {
    question: 'Who is eligible for the program?',
    answer:
      'Guiding Stars is open to dedicated students, graduands and emerging professionals ready to shape their future in the world of business.',
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative mt-20">
        <img
          src="/img/Top-Bunner-1.jpg"
          alt="About Banner"
          className="w-full h-[70vh] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
          </div>
        </div>
      </section>

      {/* Organisation Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h6 className="uppercase text-lg font-semibold" style={{ color: '#FF9148' }}>
              About
            </h6>
            <h2 className="text-4xl font-bold mt-2">
              ORGANISATION{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>
                OVERVIEW
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Guiding Stars Mentorship Academy is a rising startup, established in 2024 with a
                mission to bridge the gap between marketing academia and practice. We create an
                inclusive and diverse community where aspiring marketing students, graduates, and
                professionals can build knowledge, gain confidence and develop the skills necessary
                to lead in the global marketing industry.
              </p>
              <p>
                Our focus on continuous learning and talent development forms the core of our
                comprehensive mentorship program. As we grow, we remain committed to delivering
                impactful marketing solutions and nurturing lasting relationships with our clients
                and partners.
              </p>
              <p>
                Our goal is to empower our team to reach their full potential and contribute to a
                brighter, more sustainable future in the marketing world, embodying the spirit of
                starlight guidance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <img
                src="img/about-1.png"
                alt="About Image 1"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div
              className="p-8 rounded-xl shadow-lg text-white"
              style={{ background: 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)' }}
            >
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="leading-relaxed opacity-95">
                To Foster a Dynamic Learning Environment Where Aspiring Marketing Students and
                Graduates will Build Knowledge to Bridge the Gap Between Academia and Practice,
                Cultivate Confidence, Character and Skills to Lead in the Marketing Space Globally.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="leading-relaxed text-gray-300">
                To Elevate, Educate, Empower and Transform Marketers Futures Together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              FREQUENTLY{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>
                ASKED QUESTIONS
              </span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4"
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  <span
                    className="text-2xl font-light flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: '#FF9148',
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    +
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <img src="/img/HORIZONTAL (2).png" alt="Guiding Stars" className="h-16 mb-6" />
              <p className="text-gray-300">Nurture Brilliance, Ignite Success.</p>
              <div className="mt-6">
                <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">
                  Staff Login
                </Link>
              </div>
            </div>

            <div>
              <h6 className="uppercase font-bold mb-6" style={{ color: '#FF9148' }}>
                Contact
              </h6>
              <p className="mb-4 text-gray-300">
                <i className="fa fa-map-marker-alt mr-3"></i>Plot 25866 Kabangwe, off Great North
                Road, Lusaka.
              </p>
              <p className="mb-4 text-gray-300">
                <i className="fa fa-phone-alt mr-3"></i>+260 973 223 910
              </p>
              <p className="text-gray-300">
                <i className="fa fa-envelope mr-3"></i>info@guidingstars.com
              </p>
            </div>

            <div>
              <h6 className="uppercase font-bold mb-6" style={{ color: '#FF9148' }}>
                Company
              </h6>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link to="/about" className="hover:text-white transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/apply" className="hover:text-white transition">
                    Apply Now
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms & Condition
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h6 className="uppercase font-bold mb-6" style={{ color: '#FF9148' }}>
                Services
              </h6>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Personalized Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Networking Opportunities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Industry Insights
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Career Advancement
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Personal Growth
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} Guiding Stars. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;