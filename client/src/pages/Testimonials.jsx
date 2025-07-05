import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Quote, Award, Users, BookOpen, Trophy } from 'lucide-react';

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Computer Science Student',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'manamasters made learning Operating Systems so much fun! The gamified approach kept me engaged and the AI tutor helped me understand complex concepts easily.',
      rating: 5,
      course: 'Operating Systems Fundamentals',
      achievement: 'Completed with 95% score'
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      role: 'Network Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'The Computer Networks course was incredibly practical. I learned real-world networking concepts that I use daily in my job. The multilingual support was a huge plus!',
      rating: 5,
      course: 'Computer Networks Essentials',
      achievement: 'Earned Network Security Certificate'
    },
    {
      id: 3,
      name: 'Anjali Patel',
      role: 'Software Developer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'As someone who prefers learning in Hindi, manamasters\'s multilingual support was amazing. The AI chat feature helped me clarify doubts instantly.',
      rating: 5,
      course: 'Advanced Operating Systems',
      achievement: 'Top 10% in course rankings'
    },
    {
      id: 4,
      name: 'Suresh Reddy',
      role: 'IT Professional',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'The gamification elements made studying feel like playing a game. I never thought I\'d enjoy learning about OS internals this much!',
      rating: 4,
      course: 'Operating Systems Fundamentals',
      achievement: 'Maintained 30-day learning streak'
    },
    {
      id: 5,
      name: 'Meera Iyer',
      role: 'System Administrator',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'The practical projects and real-world scenarios in the network security course were invaluable. I feel much more confident in my role now.',
      rating: 5,
      course: 'Network Security & Cryptography',
      achievement: 'Completed all advanced modules'
    },
    {
      id: 6,
      name: 'Arjun Singh',
      role: 'Computer Science Graduate',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      content: 'manamasters helped me bridge the gap between theory and practice. The interactive quizzes and AI-powered explanations made complex topics accessible.',
      rating: 5,
      course: 'Computer Networks Essentials',
      achievement: 'Achieved perfect score in final exam'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Learners' },
    { icon: BookOpen, value: '50+', label: 'Courses Completed' },
    { icon: Trophy, value: '95%', label: 'Success Rate' },
    { icon: Star, value: '4.8', label: 'Average Rating' }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t('testimonials.title', 'What Our Learners Say')}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {t('testimonials.subtitle', 'Discover how manamasters is transforming learning experiences for students across India')}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex items-center mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <Quote className="w-6 h-6 text-blue-200" />
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Course and Achievement */}
              <div className="border-t pt-4">
                <div className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Course:</span> {testimonial.course}
                </div>
                <div className="flex items-center text-sm text-green-600">
                  <Award className="w-4 h-4 mr-1" />
                  {testimonial.achievement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t('testimonials.ctaTitle', 'Ready to Start Your Learning Journey?')}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t('testimonials.ctaSubtitle', 'Join thousands of learners who have transformed their careers with manamasters')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {t('testimonials.browseCourses', 'Browse Courses')}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              {t('testimonials.learnMore', 'Learn More')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 