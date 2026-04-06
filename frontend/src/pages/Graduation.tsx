//import Navbar from '../components/Navbar';
//import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// No imports needed for public/ images — just use string paths starting with "/"
const topBanner = "/img/Top-Bunner-1.jpg";
const corporateImage3 = "/img/corporate image 3.jpeg";
const graduationCohort = "/img/graduation cohort.jpeg";
const constanceHaajila = "/img/Constance Haajila.jpg";
const chongoLombe = "/img/Chongo Lombe.jpg";
const manuelMwanza = "/img/Manuel Mwanza.jpg";

// Rest of your code stays the same//
const Graduation = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero / Banner */}
      <section className="relative">
        <img
          src={topBanner}
          alt="Graduation Banner"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="text-center text-white px-4">
            <h6 className="text-xl uppercase tracking-widest mb-3 animate__animated animate__fadeInDown">
              Ignite Success
            </h6>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
              First Cohort Graduation
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Guiding Stars Celebrates First Graduation Ceremony
          </h2>

          <div className="text-gray-600 text-center mb-8">
            <span className="mr-4"><i className="fas fa-calendar-alt mr-1"></i> June 14, 2024</span>
            {/* Add comments or other meta if needed */}
          </div>

          <div className="prose lg:prose-lg mx-auto text-gray-700 leading-relaxed">
            <p>
              On June 14, 2024, the Guiding Stars Mentorship Program celebrated the graduation of its inaugural cohort, three months after its launch on March 13, 2024. The hybrid event featured both physical and online audiences, showcasing the resilience and determination of the 21 marketing students from Copperbelt University and the University of Lusaka who completed the program.
            </p>

            <p className="mt-4">
              Mr. Brian J. Silungwe MZIM, Council Secretary of the Zambia Institute of Marketing-ZIM, served as the Guest of Honor, emphasizing the importance of lifelong learning and self-belief in his speech. Ms. Twaambo Chisamba Kayombo, the founder and CEO, also outlined the program's future goals of expansion, innovation, and impact; stating that mentorship should be accessible to all, regardless of background or geography, so that upcoming marketers and business students can reach their full potential, nurturing a global network of inspired and capable individuals.
            </p>

            <p className="mt-4">
              The event concluded with the presentation of certificates and special packages to the graduates of Cohort One.
            </p>

            <p className="mt-6 italic font-semibold">
              Cohort Two is anticipated to be larger and more impactful, continuing the program's commitment to advancing nonstop learning, personal growth, and professional development.
            </p>

            <p className="mt-4">
              Join us as we continue to rise, aiming higher and brighter, in the pursuit of excellence and growth.
            </p>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
            <img
              src={corporateImage3}
              alt="Corporate Image 3"
              className="w-full rounded-lg shadow-lg object-cover h-80"
            />
            <img
              src={graduationCohort}
              alt="Graduation Cohort"
              className="w-full rounded-lg shadow-lg object-cover h-80"
            />
          </div>

          {/* Testimonials Carousel */}
          <section className="bg-gray-900 text-white py-12 rounded-xl my-12">
            <div className="container mx-auto px-4">
              <h3 className="text-3xl font-bold text-center mb-10">What Our Graduates Say</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Constance Haajila */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <img
                    src={constanceHaajila}
                    alt="Constance Haajila"
                    className="w-20 h-28 object-cover rounded-full mx-auto mb-4"
                  />
                  <h4 className="text-xl font-bold text-center mb-2">Constance Haajila</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Student</p>
                  <p className="italic text-center">
                    "The mentorship has exceeded my expectation, it has taught me to focus and always show up, I am now ready for opportunities."
                  </p>
                </div>

                {/* Chongo Lombe */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <img
                    src={chongoLombe}
                    alt="Chongo Lombe"
                    className="w-20 h-28 object-cover rounded-full mx-auto mb-4"
                  />
                  <h4 className="text-xl font-bold text-center mb-2">Chongo Lombe</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Student</p>
                  <p className="italic text-center">
                    "I can't quantify the personal growth and inspiration gained from the program. It has equipped me with the skills for the corporate world."
                  </p>
                </div>

                {/* Manuel Mwanza */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <img
                    src={manuelMwanza}
                    alt="Manuel Mwanza"
                    className="w-20 h-28 object-cover rounded-full mx-auto mb-4"
                  />
                  <h4 className="text-xl font-bold text-center mb-2">Manuel Mwanza</h4>
                  <p className="text-sm text-gray-500 text-center mb-4">Student</p>
                  <p className="italic text-center">
                    "My journey has been about self-discovery resulting into heightened productivity and confidence in my leadership abilities."
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Graduation;