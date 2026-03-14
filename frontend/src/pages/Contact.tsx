import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Contact = () => {
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#FF9148';
    e.target.style.boxShadow = '0 0 0 3px rgba(255, 145, 72, 0.15)';
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = '#d1d5db';
    e.target.style.boxShadow = 'none';
  };

  const inputClass = "w-full p-4 border border-gray-300 rounded-lg outline-none transition text-gray-800 placeholder-gray-400";

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative mt-20">
        <img
          src="/img/Top-Bunner-1.jpg"
          alt="Contact Banner"
          className="w-full h-[70vh] object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left: Contact Info */}
            <div className="space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our journey has been marked by a commitment to excellence, a passion for innovation, and a deep belief in the power of collaboration. With a team that spans the globe, we bring together diverse talents and perspectives to tackle some of the most challenging problems in our industry. Please reach out to us for any enquiry, collaboration or any partnership and our team will be more than pleased to hear from you.
              </p>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <i className="fa fa-phone-alt text-3xl mr-4 mt-1" style={{ color: '#FF9148' }}></i>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-gray-800">Phone Number</h4>
                    <a
                      href="tel:+260973223910"
                      className="text-gray-600 transition"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FF9148')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    >
                      +260 973 223 910
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <i className="fa fa-envelope text-3xl mr-4 mt-1" style={{ color: '#FF9148' }}></i>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-gray-800">Email</h4>
                    <a
                      href="mailto:guidingstars2024@gmail.com"
                      className="text-gray-600 transition"
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FF9148')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                    >
                      guidingstars2024@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <form action="https://formspree.io/f/mqakpbga" method="POST">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your Name*"
                      required
                      className={inputClass}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>

                  <div>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number*"
                      required
                      className={inputClass}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      name="email"
                      type="email"
                      placeholder="Your Email Address*"
                      required
                      className={inputClass}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      name="subject"
                      type="text"
                      placeholder="Subject*"
                      required
                      className={inputClass}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Message*"
                      required
                      className={`${inputClass} resize-none`}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white py-4 rounded-lg font-semibold transition"
                  style={{ background: 'linear-gradient(135deg, #FF9148, #E8722E)' }}
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
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

export default Contact;