import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRoad,
  faUsers,
  faBriefcase,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [content, setContent] = useState<Record<string, any>>({});

  useEffect(() => {
    document.title = 'Guiding Stars - Bridging Academia and Practice';
    
    // Fetch CMS content
    api.get('/content')
      .then(res => {
        const contentMap = res.data?.data || {};
        setContent(contentMap);
      })
      .catch(err => console.error('Failed to load content:', err));
  }, []);

  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative">
        <img
          src="/img/Top-Bunner-1.jpg"
          alt="Hero Banner"
          className="w-full h-[60vh] md:h-[80vh] object-cover brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <div className="w-full max-w-4xl">
            <h6
              className="text-base md:text-2xl font-semibold uppercase mb-3 tracking-wide"
              style={{ color: '#FF9148' }}
            >
              {content.hero_subtitle || 'Ignite Success'}
            </h6>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight">
              {content.hero_title || 'Empowering Future Leaders Through Mentorship'}
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/apply"
                className="inline-block text-white px-7 py-3.5 md:px-9 md:py-4.5 rounded-lg font-semibold shadow-lg transition hover:brightness-110 text-base md:text-lg bg-gradient-to-br from-[#FF9148] to-[#E8722E]"
              >
                APPLY NOW
              </Link>

              <a
                href="#contact"
                className="inline-block bg-white text-gray-900 px-7 py-3.5 md:px-9 md:py-4.5 rounded-lg font-semibold hover:bg-gray-50 active:bg-gray-100 transition shadow-lg text-base md:text-lg"
              >
                ENQUIRE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome / About Section */}
      <section id="about" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-14">
            Welcome to{' '}
            <span className="uppercase" style={{ color: '#FF9148' }}>
              Guiding Stars
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Desktop images */}
            <div className="hidden md:grid grid-cols-2 gap-6">
              <img
                src="/img/_MG_6199-1.jpg"
                alt="Guiding Stars students"
                className="rounded-xl shadow-lg w-full h-64 object-cover"
                loading="lazy"
              />
              <img
                src="/img/image 2.png"
                alt="Guiding Stars team"
                className="rounded-xl shadow-lg w-full h-64 object-cover"
                loading="lazy"
              />
            </div>

            {/* Mobile single image */}
            <div className="md:hidden mb-6">
              <img
                src="/img/_MG_6217-1.jpg"
                alt="Guiding Stars"
                className="rounded-xl shadow-lg w-full h-64 object-cover"
                loading="lazy"
              />
            </div>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                {content.about_description_1 || 'Guiding Stars stands as a beacon of excellence in corporate and business education. A non-profit, Zambia-based organization committed to nurturing the next generation of leaders.'}
              </p>
              <p>
                {content.about_description_2 || 'We are dedicated to shaping the future of both aspiring business and non-business professionals, empowering them to rise with purpose and impact.'}
              </p>

              <div className="pt-4 text-center md:text-left">
                <Link
                  to="/about"
                  className="inline-block text-white px-8 py-4 rounded-lg font-semibold transition hover:brightness-110 text-base md:text-lg bg-gradient-to-br from-[#FF9148] to-[#E8722E]"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h6
              className="uppercase text-lg md:text-xl font-semibold tracking-wide"
              style={{ color: '#FF9148' }}
            >
              Our Services
            </h6>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              Explore Our{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>
                Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: faRoad, title: 'Personalized Guidance', desc: 'Access tailored advice from experienced industry professionals dedicated to your career and professional growth.' },
              { icon: faUsers, title: 'Networking Opportunities', desc: 'Forge connections with industry leaders, potential employers, and like-minded peers.' },
              { icon: faBriefcase, title: 'Industry Insights', desc: 'Dive deep into current industry trends and emerging strategies.' },
              { icon: faTrophy, title: 'Career Advancement', desc: 'Receive mentorship focused on honing confident leadership skills.' },
              { icon: faUser, title: 'Personal Growth', desc: 'Embark on a journey of self-discovery, learning from the life experiences of esteemed role models.' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-5" style={{ color: '#FF9148' }}>
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h5 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h5>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-16 md:py-20 text-white text-center"
        style={{ background: 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)' }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-95">
            Join the next cohort of ambitious professionals and transform your career with personalized mentorship.
          </p>
          <Link
            to="/apply"
            className="inline-block bg-white px-10 py-4 md:px-12 md:py-5 rounded-lg font-bold text-lg md:text-xl hover:bg-gray-100 transition shadow-xl"
            style={{ color: '#E8722E' }}
          >
            APPLY FOR MENTORSHIP
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h6
              className="uppercase text-lg md:text-xl font-semibold tracking-wide"
              style={{ color: '#FF9148' }}
            >
              CONTACT
            </h6>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3">
              GET IN{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>
                TOUCH
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-xl">
            <form action="https://formspree.io/f/mqakpbga" method="POST">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME..."
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9148] focus:border-[#FF9148] outline-none transition text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL..."
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9148] focus:border-[#FF9148] outline-none transition text-base"
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="SUBJECT..."
                  required
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9148] focus:border-[#FF9148] outline-none transition text-base"
                />
              </div>
              <textarea
                name="message"
                placeholder="YOUR MESSAGE..."
                required
                rows={6}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF9148] focus:border-[#FF9148] outline-none transition mb-6 text-base"
              />
              <button
                type="submit"
                className="w-full text-white py-4 rounded-lg font-semibold text-lg transition hover:brightness-110 bg-gradient-to-br from-[#FF9148] to-[#E8722E]"
              >
                SEND MESSAGE NOW
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">
            What Our{' '}
            <span className="uppercase" style={{ color: '#FF9148' }}>
              Students Say
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: '/img/Constance Haajila.jpg',
                name: 'Constance Haajila',
                quote:
                  'The mentorship has exceeded my expectation, it has taught me to focus and always show up, I am now ready for opportunities.',
              },
              {
                img: '/img/Chongo Lombe.jpg',
                name: 'Chongo Lombe',
                quote:
                  'I cant quantify the personal growth and inspiration gained from the program. It has equipped me with the skills for the corporate world.',
              },
              {
                img: '/img/Manuel Mwanza.jpg',
                name: 'Manuel Mwanza',
                quote:
                  'My journey has been about self-discovery resulting into heightened productivity and confidence in my leadership abilities.',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white text-gray-800 p-7 md:p-8 rounded-2xl shadow-xl"
              >
                <div className="flex items-center mb-5">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-16 h-20 md:w-20 md:h-24 object-cover rounded-lg mr-4 flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h6 className="font-bold text-base md:text-lg">{t.name}</h6>
                    <p className="text-gray-500 text-sm">Student</p>
                  </div>
                </div>
                <p className="italic text-gray-700 leading-relaxed">"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;