import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// AI Chat API
export const aiChatAPI = {
  chat: async (message, language = 'en', context = 'general') => {
    try {
      const response = await api.post('/api/ai/chat', {
        message,
        language,
        context
      });
      return response.data;
    } catch (error) {
      console.error('AI Chat API Error:', error);
      throw error;
    }
  },

  speechToText: async (audioData, language = 'en') => {
    try {
      const response = await api.post('/api/ai/speech-to-text', {
        audioData,
        language
      });
      return response.data;
    } catch (error) {
      console.error('Speech to Text API Error:', error);
      throw error;
    }
  },

  textToSpeech: async (text, language = 'en', voice = 'alloy') => {
    try {
      const response = await api.post('/api/ai/text-to-speech', {
        text,
        language,
        voice
      });
      return response.data;
    } catch (error) {
      console.error('Text to Speech API Error:', error);
      throw error;
    }
  },

  generateQuestions: async (topic, difficulty = 'beginner', count = 5, language = 'en') => {
    try {
      const response = await api.post('/api/ai/generate-questions', {
        topic,
        difficulty,
        count,
        language
      });
      return response.data;
    } catch (error) {
      console.error('Generate Questions API Error:', error);
      throw error;
    }
  },

  summarizeContent: async (content, language = 'en') => {
    try {
      const response = await api.post('/api/ai/summarize', {
        content,
        language
      });
      return response.data;
    } catch (error) {
      console.error('Summarize Content API Error:', error);
      throw error;
    }
  },

  generateLearningPath: async (userProfile, goals, language = 'en') => {
    try {
      const response = await api.post('/api/ai/learning-path', {
        userProfile,
        goals,
        language
      });
      return response.data;
    } catch (error) {
      console.error('Generate Learning Path API Error:', error);
      throw error;
    }
  },

  getTranslationUsage: async () => {
    try {
      const response = await api.get('/api/ai/translation-usage');
      return response.data;
    } catch (error) {
      console.error('Get translation usage error:', error);
      throw error;
    }
  },
};

// User Authentication API
export const authAPI = {
  signIn: async (email, password) => {
    try {
      const response = await api.post('/api/users/signin', {
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Sign In API Error:', error);
      throw error;
    }
  },

  signUp: async (userData) => {
    try {
      const response = await api.post('/api/users/signup', userData);
      return response.data;
    } catch (error) {
      console.error('Sign Up API Error:', error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      const response = await api.post('/api/users/signout');
      return response.data;
    } catch (error) {
      console.error('Sign Out API Error:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get('/api/users/profile');
      return response.data;
    } catch (error) {
      console.error('Get Profile API Error:', error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/api/users/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Update Profile API Error:', error);
      throw error;
    }
  }
};

// Courses API
export const coursesAPI = {
  getAllCourses: async () => {
    try {
      const response = await api.get('/api/courses');
      return response.data;
    } catch (error) {
      console.error('Get Courses API Error:', error);
      throw error;
    }
  },

  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/api/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Get Course API Error:', error);
      throw error;
    }
  },

  enrollInCourse: async (courseId) => {
    try {
      const response = await api.post(`/api/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      console.error('Enroll Course API Error:', error);
      throw error;
    }
  },

  getCourseProgress: async (courseId) => {
    try {
      const response = await api.get(`/api/courses/${courseId}/progress`);
      return response.data;
    } catch (error) {
      console.error('Get Course Progress API Error:', error);
      throw error;
    }
  }
};

// Quizzes API
export const quizzesAPI = {
  getQuizByLesson: async (lessonId) => {
    try {
      const response = await api.get(`/api/lessons/${lessonId}/quiz`);
      return response.data;
    } catch (error) {
      console.error('Get Quiz API Error:', error);
      throw error;
    }
  },

  submitQuiz: async (quizId, answers) => {
    try {
      const response = await api.post(`/api/quizzes/${quizId}/submit`, {
        answers
      });
      return response.data;
    } catch (error) {
      console.error('Submit Quiz API Error:', error);
      throw error;
    }
  },

  getQuizResults: async (quizId) => {
    try {
      const response = await api.get(`/api/quizzes/${quizId}/results`);
      return response.data;
    } catch (error) {
      console.error('Get Quiz Results API Error:', error);
      throw error;
    }
  }
};

// Contact API
export const contactAPI = {
  sendMessage: async (messageData) => {
    try {
      const response = await api.post('/api/contact', messageData);
      return response.data;
    } catch (error) {
      console.error('Send Message API Error:', error);
      throw error;
    }
  }
};

export default api; 