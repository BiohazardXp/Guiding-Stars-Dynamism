//import Navbar from '../components/Navbar';
//import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';

// No imports needed for public/ images — just use string paths starting with "/"
const topBanner = "/img/Top-Bunner-1.jpg";
const corporateImage3 = "/img/corporate image 3.jpeg";
const graduationCohort = "/img/graduation cohort.jpeg";

// Graduation data
const graduations = {
  cohort1: {
    title: "First Cohort Graduation",
    date: "June 14, 2024",
    content: "On June 14, 2024, the Guiding Stars Mentorship Program celebrated the graduation of its inaugural cohort, three months after its launch on March 13, 2024. The hybrid event featured both physical and online audiences, showcasing the resilience and determination of the 21 marketing students from Copperbelt University and the University of Lusaka who completed the program.",
    content2: "Mr. Brian J. Silungwe MZIM, Council Secretary of the Zambia Institute of Marketing-ZIM, served as the Guest of Honor, emphasizing the importance of lifelong learning and self-belief in his speech. Ms. Twaambo Chisamba Kayombo, the founder and CEO, also outlined the program's future goals of expansion, innovation, and impact; stating that mentorship should be accessible to all, regardless of background or geography, so that upcoming marketers and business students can reach their full potential, nurturing a global network of inspired and capable individuals.",
    content3: "The event concluded with the presentation of certificates and special packages to the graduates of Cohort One.",
    future: "Cohort Two is anticipated to be larger and more impactful, continuing the program's commitment to advancing nonstop learning, personal growth, and professional development.",
    images: []
  },
  cohort2: {
    title: "Cohort Two Celebrations & Impact",
    date: "February - May 2025",
    content: "Cohort Two's journey culminated in a series of celebrations and impactful events throughout 2025. On 7th February 2025, Guiding Stars held its Meet & Greet for Cohort Two mentees, creating a space for networking and engagement with the team and alumni. The event marked a strong start to the cohort's mentorship journey, setting the tone for growth and continued engagement.",
    content2: "On 28th February 2025, the Guiding Stars Mentorship Program marked the successful graduation of Cohort Two, celebrating mentees who began their journey in December 2024. Following the graduation, on March 8th, Guiding Stars held a post-graduation luncheon in Lusaka to celebrate recent graduates and strengthen alumni connections. Represented by Edward Mwanza Kafusa, the academy presented certificates and encouraged graduates to remain active as ambassadors and mentors.",
    content3: "In May 2025, Guiding Stars expanded its impact beyond the traditional mentorship sphere. On May 18th, Guiding Stars conducted a youth mentorship session at St. Francis Xavier Parish focused on opportunity creation and fearless growth. The session emphasized purpose, taking initiative, and embracing mentorship, alongside interactive activities and networking. These events reinforced Guiding Stars' commitment to empowering young people, continued support, lifelong relationships, and impact beyond the mentorship program.",
    future: "The success of Cohort Two demonstrates our unwavering commitment to transforming lives through mentorship, fostering a lasting community of leaders and changemakers who continue to support and inspire one another.",
    testimonials: [],
    images: [
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.03.46 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.03.46 (2).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.03.46.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.03.47 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.03.47.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.03.48 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.03.48.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.07.09 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.07.09 (2).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.07.09.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.08.15 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.08.15.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.08.16 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.08.16.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.44.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.45 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.45.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.46 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.46 (2).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.46.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.47 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.47.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.10.48.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.14.00 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.14.00 (2).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.14.00.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.14.01 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.14.01.jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.14.02 (1).jpeg",
      "/img/GS2/WhatsApp Image 2026-04-13 at 20.14.02.jpeg"
    ]
  },
  cohort3: {
    title: "Cohort Three Celebrations & Milestones",
    date: "May - July 2025",
    content: "Cohort Three's journey reached new heights with a series of impactful events in 2025. On 23rd May 2025, Guiding Stars Mentorship Academy hosted its first Copperbelt mentees meet and greet at Pamo Hotel, bringing participants together to connect and celebrate their journey. The event featured Brian Silungwe and a surprise appearance by CEO Twaambo Chisamba Kayombo, reinforcing the program's impact and shared vision.",
    content2: "On 7th July 2025, Guiding Stars Mentorship Program held a virtual graduation for its third and largest cohort of 59 mentees. Over three months, participants engaged in mentorship, leadership challenges, and practical learning experiences. CEO Twaambo Chisamba Kayombo encouraged graduates to lead with purpose, while Guest of Honour Eng. Wesley Kaluba highlighted the importance of mentorship in bridging education and industry. The ceremony recognized outstanding mentees and marked another milestone in Guiding Stars' mission to develop future leaders.",
    content3: "Following the graduation, on 14th July 2025, Lusaka graduates kicked off the week with energy, positivity, and a strong sense of purpose. This moment highlighted the power of consistency and encouraged a week driven by passion, growth, and the Guiding Stars spirit.",
    future: "Cohort Three's success demonstrates the exponential growth of Guiding Stars and our commitment to scaling impact across multiple regions. With 59 graduates, we continue to build a thriving community of leaders equipped to drive meaningful change.",
    testimonials: [],
    images: [
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.36 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.36.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.37 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.37.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.38 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.38.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.39 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.39.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.40 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.17.40.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.27.28.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.27.29 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.27.29.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.27.30 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.27.30 (2).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.27.30.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.27.31.jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.30.33 (1).jpeg",
      "/img/GS3/WhatsApp Image 2026-04-13 at 20.30.33.jpeg"
    ]
  },
  cohort4: {
    title: "Cohort Four Milestones & Growth",
    date: "August - December 2025",
    content: "Cohort Four's journey began with unprecedented momentum on 11th August 2025, when Guiding Stars successfully hosted an orientation for over 800 new applicants, marking a significant milestone in its growth. The session introduced participants to the program's mission, values, and culture, with CEO Twaambo Chisamba Kayombo emphasizing purpose-driven leadership.",
    content2: "Alumni shared impactful testimonials on growth and mentorship, reinforcing the power of community. On 26th December 2025, Guiding Stars held its fourth graduation ceremony, marking the completion of a transformative three-month journey for 60 mentees. The event featured insights from Nigerian Guest of Honour Olawande Olowoyeye and Zimbabwean speaker Thabiso Madanhi, alongside remarks from CEO Twaambo Chisamba Kayombo.",
    content3: "The CEO encouraged graduates to embrace continued growth and responsibility, highlighting the importance of carrying the Guiding Stars spirit forward as ambassadors and mentors. The ceremony reflected Guiding Stars' commitment to developing confident, purpose-driven leaders ready to make an impact in their communities and industries.",
    future: "Cohort Four's success marks a turning point in Guiding Stars' expansion, with over 800 applicants demonstrating the growing hunger for transformational mentorship. We remain committed to nurturing the next generation of leaders who will drive positive change across Africa and beyond.",
    testimonials: [],
    images: [
      "/img/GS4/WhatsApp Image 2026-04-13 at 20.35.37.jpeg",
      "/img/GS4/WhatsApp Image 2026-04-13 at 20.35.38 (1).jpeg",
      "/img/GS4/WhatsApp Image 2026-04-13 at 20.35.38.jpeg",
      "/img/GS4/WhatsApp Image 2026-04-13 at 20.35.39 (1).jpeg",
      "/img/GS4/WhatsApp Image 2026-04-13 at 20.35.39 (2).jpeg",
      "/img/GS4/WhatsApp Image 2026-04-13 at 20.35.39.jpeg"
    ]
  }
};

// Rest of your code stays the same//
const Graduation = () => {
  const [selectedCohort, setSelectedCohort] = useState('cohort1');
  const data = graduations[selectedCohort as keyof typeof graduations];
  
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
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Graduation Selector */}
          <div className="mb-8 flex justify-center px-2 md:px-0">
            <select
              value={selectedCohort}
              onChange={(e) => setSelectedCohort(e.target.value)}
              className="w-full md:w-auto px-4 md:px-6 py-3 border-2 border-orange-500 rounded-lg text-base md:text-lg font-semibold bg-white text-gray-800 hover:bg-orange-50 transition"
            >
              <option value="cohort1">First Cohort (June 14, 2024)</option>
              <option value="cohort2">Cohort Two (Feb - May 2025)</option>
              <option value="cohort3">Cohort Three (May - July 2025)</option>
              <option value="cohort4">Cohort Four (Aug - Dec 2025)</option>
            </select>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">
            {data.title}
          </h2>

          <div className="text-gray-600 text-center mb-8 text-sm md:text-base">
            <span className="mr-4"><i className="fas fa-calendar-alt mr-1"></i> {data.date}</span>
            {/* Add comments or other meta if needed */}
          </div>

          <div className="space-y-12 md:space-y-16">
            {/* Content 1 with Image */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center">
              <div className="w-full lg:w-1/2">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {data.content}
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                {selectedCohort === 'cohort1' ? (
                  <img
                    src={corporateImage3}
                    alt="Corporate Image"
                    className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
                  />
                ) : (
                  data.images && data.images[0] && (
                    <img
                      src={data.images[0]}
                      alt="Event Image 1"
                      className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
                    />
                  )
                )}
              </div>
            </div>

            {/* Content 2 with Image (alternating side) */}
            <div className="flex flex-col lg:flex-row-reverse gap-6 md:gap-8 items-center">
              <div className="w-full lg:w-1/2">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {data.content2}
                </p>
              </div>
              <div className="w-full lg:w-1/2">
                {selectedCohort === 'cohort1' ? (
                  <img
                    src={graduationCohort}
                    alt="Graduation Cohort"
                    className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
                  />
                ) : (
                  data.images && data.images[1] && (
                    <img
                      src={data.images[1]}
                      alt="Event Image 2"
                      className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
                    />
                  )
                )}
              </div>
            </div>

            {/* Content 3 with Image (if available) */}
            {data.content3 && (
              <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-center">
                <div className="w-full lg:w-1/2">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {data.content3}
                  </p>
                </div>
                <div className="w-full lg:w-1/2">
                  {data.images && data.images[2] && (
                    <img
                      src={data.images[2]}
                      alt="Event Image 3"
                      className="w-full rounded-lg shadow-lg object-cover h-64 md:h-80"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Remaining Images Gallery */}
            {data.images && data.images.length > 3 && (
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">More Event Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {data.images.slice(3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Event Image ${index + 4}`}
                      className="w-full rounded-lg shadow-lg object-cover h-40 md:h-64 hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Future Section */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 md:p-8 rounded-lg border-l-4" style={{ borderColor: '#FF9148' }}>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base italic font-semibold">
                {data.future}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base mt-4">
                Join us as we continue to rise, aiming higher and brighter, in the pursuit of excellence and growth.
              </p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Graduation;