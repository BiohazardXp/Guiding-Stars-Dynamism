import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

const values = [
  { title: 'Authenticity', icon: '✦' },
  { title: 'Innovation', icon: '✦' },
  { title: 'Transparency', icon: '✦' },
  { title: 'Sustainability', icon: '✦' },
];

const pillars = [
  { title: 'Integrity', desc: 'Doing what is right, even when no one is watching.' },
  { title: 'Attitude', desc: 'Approaching every challenge with a growth mindset.' },
  { title: 'Loyalty', desc: 'Committed to the success of every individual we serve.' },
  { title: 'Behaviour', desc: 'Modelling the professional conduct expected of leaders.' },
  { title: 'Diplomacy', desc: 'Navigating relationships with grace and emotional intelligence.' },
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
      <section className="relative">
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
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                Guiding Stars is a non-profit organization founded in 2024 in Zambia, dedicated to
                advancing excellence in corporate and business education. It serves as a catalyst
                for nurturing the next generation of leaders by bridging the gap between academic
                learning and practical experience.
              </p>
              <p>
                The organization equips students, graduates, and emerging professionals with the
                competence, confidence, and character required to excel in today's global business
                landscape.
              </p>
              <p>
                Through structured mentorship, leadership training, and community engagement
                initiatives, it empowers young people to lead with purpose and distinction.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <img
                src="img/IMG_0778.JPG"
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

      {/* Human Leadership Pillars */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h6 className="uppercase text-lg font-semibold" style={{ color: '#FF9148' }}>
              What Sets Us Apart
            </h6>
            <h2 className="text-4xl font-bold mt-2">
              THE HUMAN SIDE OF{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>
                LEADERSHIP
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Beyond technical and academic proficiency, Guiding Stars places strong emphasis on
              the human aspects of leadership. We believe great leaders are defined not just by
              what they know, but by who they are.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg"
                  style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
                >
                  {idx + 1}
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{pillar.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guiding Principles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h6 className="uppercase text-lg font-semibold" style={{ color: '#FF9148' }}>
              Our Principles
            </h6>
            <h2 className="text-4xl font-bold mt-2">
              WHAT{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>
                GUIDES US
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Guided by these core principles, Guiding Stars continues to illuminate pathways to
              success, shaping individuals who lead with wisdom, confidence, and impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 text-center text-white shadow-lg"
                style={{
                  background:
                    idx % 2 === 0
                      ? 'linear-gradient(135deg, #FF9148, #E8722E)'
                      : '#1f2937',
                }}
              >
                <div className="text-2xl mb-3 opacity-80">{value.icon}</div>
                <h4 className="font-bold text-lg">{value.title}</h4>
              </div>
            ))}
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
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4"
                >
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  <span
                    className="text-2xl font-light flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: '#FF9148',
                      transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                      display: 'inline-block',
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

      {/* Old Footer - Replaced by <Footer /> component */}
      <Footer />
    </div>
  );
};

export default About;