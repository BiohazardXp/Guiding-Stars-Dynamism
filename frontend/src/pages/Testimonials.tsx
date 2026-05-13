import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Testimonials organized by cohort with images
const testimonialsByCohort = {
  cohort2: {
    title: "Cohort Two Testimonials",
    testimonials: [
      {
        id: '1',
        name: 'Testimonial 1',
        role: 'Mentee',
        content: 'The mentorship I received through Guiding Stars has been invaluable. My mentor provided guidance that accelerated my professional growth significantly.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.46.jpeg',
      },
      {
        id: '2',
        name: 'Testimonial 2',
        role: 'Mentee',
        content: 'Being part of Guiding Stars has transformed my perspective on leadership and career development. I feel more confident and prepared for the future.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.48.jpeg',
      },
      {
        id: '3',
        name: 'Testimonial 3',
        role: 'Mentee',
        content: 'The support and guidance I received from my mentor has been instrumental in my personal and professional growth. I am grateful for this opportunity.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.50 (1).jpeg',
      },
      {
        id: '4',
        name: 'Testimonial 4',
        role: 'Mentee',
        content: 'This program has given me the tools and confidence I need to succeed. The mentorship experience has been transformational and inspiring.',
        image: '/img/Testimonials/cohort 2/WhatsApp Image 2026-04-30 at 11.48.50.jpeg',
      },
    ]
  },
  cohort3: {
    title: "Cohort Three Testimonials",
    testimonials: [
      {
        id: '1',
        name: 'Testimonial 1',
        role: 'Mentee',
        content: 'Through Guiding Stars, I have discovered my potential and gained the confidence to pursue my dreams. The mentorship has been life-changing.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-04-30 at 11.48.22.jpeg',
      },
      {
        id: '2',
        name: 'Testimonial 2',
        role: 'Mentee',
        content: 'The guidance and support I received has truly transformed my perspective and career trajectory.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-05-12 at 12.38.25.jpeg',
      },
      {
        id: '3',
        name: 'Testimonial 3',
        role: 'Mentee',
        content: 'Being part of this cohort has connected me with amazing individuals and opened doors I never expected.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-05-12 at 12.38.26 (1).jpeg',
      },
      {
        id: '4',
        name: 'Testimonial 4',
        role: 'Mentee',
        content: 'The mentorship program has empowered me to take charge of my future and lead with purpose.',
        image: '/img/Testimonials/cohort 3/WhatsApp Image 2026-05-12 at 12.38.26.jpeg',
      },
    ]
  },
  cohort4: {
    title: "Cohort Four Testimonials",
    testimonials: [
      {
        id: '1',
        name: 'Testimonial 1',
        role: 'Mentee',
        content: 'Guiding Stars has provided me with exceptional mentorship and networking opportunities that have shaped my career path positively.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.08.jpeg',
      },
      {
        id: '2',
        name: 'Testimonial 2',
        role: 'Mentee',
        content: 'The program exceeded my expectations. The guidance, support, and community have been invaluable in my journey.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.13.jpeg',
      },
      {
        id: '3',
        name: 'Testimonial 3',
        role: 'Mentee',
        content: 'I am grateful for the mentorship and the opportunity to grow both personally and professionally through Guiding Stars.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.14 (1).jpeg',
      },
      {
        id: '4',
        name: 'Testimonial 4',
        role: 'Mentee',
        content: 'This mentorship program has been a game-changer for me. I feel empowered and ready to make a difference in my field.',
        image: '/img/Testimonials/cohort 4/WhatsApp Image 2026-04-30 at 11.48.14.jpeg',
      },
    ]
  },
};

const Testimonials = () => {
  const [selectedCohort, setSelectedCohort] = useState('cohort2');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const data = testimonialsByCohort[selectedCohort as keyof typeof testimonialsByCohort];

  return (
    <div className="bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 flex items-center justify-center"
        style={{
          backgroundImage: 'url(/img/Guiding star background image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Testimonials
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Hear from our mentees across different cohorts
          </p>
        </div>
      </section>

      {/* Cohort Tabs */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(testimonialsByCohort).map(([key, cohort]) => (
              <button
                key={key}
                onClick={() => setSelectedCohort(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
                  selectedCohort === key
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                style={{
                  background: selectedCohort === key ? 'linear-gradient(135deg, #FF9148 0%, #E8722E 100%)' : undefined,
                }}
              >
                {cohort.title.split(' ')[0]} {cohort.title.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span style={{ color: '#FF9148' }}>{data.title}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover the impact Guiding Stars has made on our mentees' lives and careers.
            </p>
          </div>

          <div className="space-y-12">
            {data.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg cursor-pointer hover:opacity-80 transition-opacity duration-300"
                      loading="lazy"
                      onClick={() => setSelectedImage(testimonial.image)}
                    />
                  )}
                </div>

                {/* Text Content */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col justify-center">
                    <div className="mb-4 flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {testimonial.name}
                    </h3>
                    <p 
                      className="text-sm font-semibold mb-4"
                      style={{ color: '#FF9148' }}
                    >
                      {testimonial.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Be part of a transformative mentorship experience that will shape your future.
          </p>
          <a
            href="/apply"
            className="inline-block text-white px-9 py-4 rounded-lg font-semibold transition hover:brightness-110 text-lg bg-gradient-to-br from-[#FF9148] to-[#E8722E]"
          >
            Apply Now
          </a>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={selectedImage}
              alt="Full View"
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200 transition text-2xl font-bold text-gray-800"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Testimonials;
