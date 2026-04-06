import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

interface Testimonial {
  id: string;
  name: string;
  title: string;
  content: string;
  image?: string;
}

const Testimonials = () => {
  const [content, setContent] = useState<Record<string, any>>({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Testimonials - Guiding Stars';
    
    // Fetch CMS content
    api.get('/content')
      .then(res => {
        const contentMap = res.data?.data || {};
        setContent(contentMap);
        
        // Parse testimonials from CMS content
        // Look for testimonial_* keys in the content
        const testimonialList: Testimonial[] = [];
        for (let i = 1; i <= 10; i++) {
          const nameKey = `testimonial_${i}_name`;
          const titleKey = `testimonial_${i}_title`;
          const contentKey = `testimonial_${i}_content`;
          const imageKey = `testimonial_${i}_image`;
          
          if (contentMap[nameKey] && contentMap[contentKey]) {
            testimonialList.push({
              id: String(i),
              name: contentMap[nameKey] || '',
              title: contentMap[titleKey] || '',
              content: contentMap[contentKey] || '',
              image: contentMap[imageKey],
            });
          }
        }
        
        // If no testimonials from CMS, use defaults
        if (testimonialList.length === 0) {
          setTestimonials([
            {
              id: '1',
              name: 'Elizabeth Kabanda',
              title: 'Mentor',
              content: 'Being part of Guiding Stars has been transformative. The opportunity to guide and inspire the next generation of leaders is incredibly rewarding.',
              image: '/img/Chongo Lombe.jpg',
            },
            {
              id: '2',
              name: 'Manuel Mwanza',
              title: 'Mentor',
              content: 'I\'ve seen remarkable growth in my mentees. Guiding Stars provides the perfect platform to make a real difference in people\'s careers.',
              image: '/img/Manuel Mwanza.jpg',
            },
            {
              id: '3',
              name: 'Racheal Thole',
              title: 'Mentee',
              content: 'The mentorship I received through Guiding Stars has been invaluable. My mentor provided guidance that accelerated my professional growth significantly.',
              image: '/img/Racheal Thole.jpg',
            },
          ]);
        } else {
          setTestimonials(testimonialList);
        }
      })
      .catch(err => console.error('Failed to load content:', err))
      .finally(() => setLoading(false));
  }, []);

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
            Hear from our mentors and mentees
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span style={{ color: '#FF9148' }}>Impact Stories</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {content.testimonials_description || 'Discover how Guiding Stars has transformed the lives and careers of our mentors and mentees.'}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No testimonials available at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                >
                  {testimonial.image && (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p 
                          className="text-sm font-semibold"
                          style={{ color: '#FF9148' }}
                        >
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      "{testimonial.content}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {content.testimonials_cta || 'Be part of a transformative mentorship experience that will shape your future.'}
          </p>
          <a
            href="/apply"
            className="inline-block text-white px-9 py-4 rounded-lg font-semibold transition hover:brightness-110 text-lg bg-gradient-to-br from-[#FF9148] to-[#E8722E]"
          >
            Apply Now
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
