import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    document.title = 'Guiding Stars - Bridging Academia and Practice';
  }, []);

  return (
    <div className="bg-white">
      {/* Navbar is provided globally by the Navbar component */}

      {/* Hero Section */}
  <section className="relative">
        <div className="relative">
          <img
            src="/img/Top-Bunner-1.jpg"
            alt="Hero Banner"
            className="w-full h-[80vh] object-cover brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
            <div className="max-w-4xl">
              <h6 className="text-xl md:text-2xl font-semibold uppercase mb-4 animate-fade-in-down"
                  style={{ color: '#FF9148' }}>
                Ignite Success
              </h6>
              <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in-down">
                Bridging the Gap Between Academia and Practice
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/apply"
                  className="text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
                >
                  APPLY NOW
                </Link>
                
                <a
                  href="#contact"
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
                >
                  ENQUIRE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome / About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Welcome to{' '}
            <span className="uppercase" style={{ color: '#FF9148' }}>Guiding Stars</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              <img src="/img/_MG_6217-1.jpg" alt="About 1" className="rounded-lg shadow-lg" />
              <img src="/img/image 2.png" alt="About 2" className="rounded-lg shadow-lg" />
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Guiding Stars stands as a beacon of excellence in corporate and business education. A non-profit, Zambia-based organization committed to nurturing the next generation of leaders.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are dedicated to shaping the future of both aspiring business and non-business professionals, empowering them to rise with purpose and impact.
              </p>
              <div className="text-center md:text-left">
                <Link
                  to="/about"
                  className="inline-block text-white px-8 py-4 rounded-lg font-semibold transition"
                  style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h6 className="uppercase text-lg font-semibold" style={{ color: '#FF9148' }}>Our Services</h6>
            <h2 className="text-4xl font-bold mt-2">
              Explore Our{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>Services</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'fa-road', title: 'Personalized Guidance', desc: 'Access tailored advice from experienced industry professionals dedicated to your career and professional growth.' },
              { icon: 'fa-users', title: 'Networking Opportunities', desc: 'Forge connections with industry leaders, potential employers, and like-minded peers.' },
              { icon: 'fa-briefcase', title: 'Industry Insights', desc: 'Dive deep into current industry trends and emerging strategies.' },
              { icon: 'fa-trophy', title: 'Career Advancement', desc: 'Receive mentorship focused on honing confident leadership skills.' },
              { icon: 'fa-user', title: 'Personal Growth', desc: 'Embark on a journey of self-discovery, learning from the life experiences of esteemed role models.' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-6" style={{ color: '#FF9148' }}>
                  <i className={`fa ${service.icon}`}></i>
                </div>
                <h5 className="text-xl font-bold mb-4 text-gray-800">{service.title}</h5>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="py-16 text-white"
        style={{ background: 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)' }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join the next cohort of ambitious professionals and transform your career with personalized mentorship.
          </p>
          <Link
            to="/apply"
            className="inline-block bg-white px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            style={{ color: '#E8722E' }}
          >
            APPLY FOR MENTORSHIP
          </Link>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h6 className="uppercase text-lg font-semibold" style={{ color: '#FF9148' }}>CONTACT</h6>
            <h2 className="text-4xl font-bold mt-2">
              GET IN{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>TOUCH</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
            <form action="https://formspree.io/f/mqakpbga" method="POST">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="YOUR NAME..."
                  required
                  className="w-full p-4 border rounded-lg focus:outline-none transition"
                  style={{ '--tw-ring-color': '#FF9148' } as React.CSSProperties}
                  onFocus={(e) => (e.target.style.borderColor = '#FF9148')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="YOUR EMAIL..."
                  required
                  className="w-full p-4 border rounded-lg focus:outline-none transition"
                  onFocus={(e) => (e.target.style.borderColor = '#FF9148')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="SUBJECT..."
                  required
                  className="w-full p-4 border rounded-lg focus:outline-none transition"
                  onFocus={(e) => (e.target.style.borderColor = '#FF9148')}
                  onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                />
              </div>

              <textarea
                name="message"
                placeholder="YOUR MESSAGE..."
                required
                rows={6}
                className="w-full p-4 border rounded-lg focus:outline-none transition mb-6"
                onFocus={(e) => (e.target.style.borderColor = '#FF9148')}
                onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
              ></textarea>

              <button
                type="submit"
                className="w-full text-white py-4 rounded-lg font-semibold transition"
                style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
              >
                SEND MESSAGE NOW
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              What Our{' '}
              <span className="uppercase" style={{ color: '#FF9148' }}>Students Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: '/img/Constance Haajila.jpg',
                name: 'Constance Haajila',
                role: 'Student',
                quote: '"The mentorship has exceeded my expectation, it has taught me to focus and always show up, I am now ready for opportunities."',
              },
              {
                img: '/img/Chongo Lombe.jpg',
                name: 'Chongo Lombe',
                role: 'Student',
                quote: '"I cant quantify the personal growth and inspiration gained from the program. It has equipped me with the skills for the corporate world."',
              },
              {
                img: '/img/Manuel Mwanza.jpg',
                name: 'Manuel Mwanza',
                role: 'Student',
                quote: '"My journey has been about self-discovery resulting into heightened productivity and confidence in my leadership abilities."',
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white text-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img src={testimonial.img} alt={testimonial.name} className="w-20 h-24 object-cover rounded-lg mr-4" />
                  <div>
                    <h6 className="font-bold">{testimonial.name}</h6>
                    <small className="text-gray-500">{testimonial.role}</small>
                  </div>
                </div>
                <p className="italic text-gray-700">{testimonial.quote}</p>
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
              <h6 className="uppercase font-bold mb-6" style={{ color: '#FF9148' }}>Contact</h6>
              <p className="mb-4 text-gray-300"><i className="fa fa-map-marker-alt mr-3"></i>Plot 25866 Kabangwe, off Great North Road, Lusaka.</p>
              <p className="mb-4 text-gray-300"><i className="fa fa-phone-alt mr-3"></i>+260 973 223 910</p>
              <p className="text-gray-300"><i className="fa fa-envelope mr-3"></i>info@guidingstars.com</p>
            </div>

            <div>
              <h6 className="uppercase font-bold mb-6" style={{ color: '#FF9148' }}>Company</h6>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link to="/apply" className="hover:text-white transition">Apply Now</Link></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms & Condition</a></li>
              </ul>
            </div>

            <div>
              <h6 className="uppercase font-bold mb-6" style={{ color: '#FF9148' }}>Services</h6>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition">Personalized Guidance</a></li>
                <li><a href="#" className="hover:text-white transition">Networking Opportunities</a></li>
                <li><a href="#" className="hover:text-white transition">Industry Insights</a></li>
                <li><a href="#" className="hover:text-white transition">Career Advancement</a></li>
                <li><a href="#" className="hover:text-white transition">Personal Growth</a></li>
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

export default Home;