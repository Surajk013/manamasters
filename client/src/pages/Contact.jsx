import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus(null), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email', 'Email'),
      value: 'support@manamasters.com',
      description: t('contact.emailDesc', 'We\'ll respond within 24 hours')
    },
    {
      icon: Phone,
      title: t('contact.phone', 'Phone'),
      value: '+91 98765 43210',
      description: t('contact.phoneDesc', 'Available Mon-Fri, 9AM-6PM IST')
    },
    {
      icon: MapPin,
      title: t('contact.address', 'Address'),
      value: 'Bangalore, Karnataka, India',
      description: t('contact.addressDesc', 'Our main office location')
    },
    {
      icon: Clock,
      title: t('contact.hours', 'Support Hours'),
      value: '9:00 AM - 6:00 PM IST',
      description: t('contact.hoursDesc', 'Monday to Friday')
    }
  ];

  const faqItems = [
    {
      question: t('contact.faq1.question', 'How do I get started with a course?'),
      answer: t('contact.faq1.answer', 'Simply browse our courses, select one that interests you, and click "Start Learning". You can enroll in multiple courses and learn at your own pace.')
    },
    {
      question: t('contact.faq2.question', 'Is the platform available in my language?'),
      answer: t('contact.faq2.answer', 'Yes! We support multiple Indian languages including Hindi, Kannada, Tamil, Telugu, Marathi, and Bengali. You can switch languages anytime from the language menu.')
    },
    {
      question: t('contact.faq3.question', 'How does the AI tutor work?'),
      answer: t('contact.faq3.answer', 'Our AI tutor uses advanced language models to provide personalized help. You can ask questions in your preferred language and get instant, accurate responses.')
    },
    {
      question: t('contact.faq4.question', 'Are the courses free?'),
      answer: t('contact.faq4.answer', 'We offer both free and premium courses. Many of our fundamental courses are completely free, while advanced courses may require a subscription.')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t('contact.title', 'Get in Touch')}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            {t('contact.subtitle', 'Have questions? Need help? We\'re here to support your learning journey.')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('contact.sendMessage', 'Send us a Message')}
            </h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-green-800 font-medium">
                    {t('contact.messageSent', 'Message sent successfully! We\'ll get back to you soon.')}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.name', 'Name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email', 'Email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.subject', 'Subject')} *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.message', 'Message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={t('contact.messagePlaceholder', 'Tell us how we can help you...')}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('contact.sending', 'Sending...')}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact.sendMessage', 'Send Message')}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t('contact.contactInfo', 'Contact Information')}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <info.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-blue-600 font-medium">{info.value}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
                {t('contact.faq', 'Frequently Asked Questions')}
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Support Chat CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-white opacity-80" />
          <h2 className="text-3xl font-bold mb-4">
            {t('contact.aiSupport', 'Need Instant Help?')}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            {t('contact.aiSupportDesc', 'Try our AI-powered chat assistant for quick answers to your questions')}
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center mx-auto">
            <MessageCircle className="w-5 h-5 mr-2" />
            {t('contact.startChat', 'Start AI Chat')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact; 