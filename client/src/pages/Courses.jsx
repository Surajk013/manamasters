import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CourseCard from '../components/CourseCard';
import { Search, Filter, BookOpen, Users, Clock, Star } from 'lucide-react';

const Courses = () => {
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock course data - replace with API call
  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        title: 'Operating Systems Fundamentals',
        description: 'Learn the core concepts of operating systems including process management, memory management, and file systems.',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        difficulty: 'beginner',
        duration: 480, // 8 hours
        enrolledStudents: 1247,
        rating: 4.8,
        progress: 0,
        isEnrolled: false,
        modules: [
          { id: 1, title: 'Introduction to OS', lessons: 5 },
          { id: 2, title: 'Process Management', lessons: 8 },
          { id: 3, title: 'Memory Management', lessons: 6 },
          { id: 4, title: 'File Systems', lessons: 7 }
        ],
        lessons: 26,
        quizzes: 8
      },
      {
        id: 2,
        title: 'Advanced Operating Systems',
        description: 'Deep dive into advanced OS concepts including virtualization, distributed systems, and security.',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        difficulty: 'advanced',
        duration: 720, // 12 hours
        enrolledStudents: 856,
        rating: 4.9,
        progress: 35,
        isEnrolled: true,
        modules: [
          { id: 5, title: 'Virtualization', lessons: 6 },
          { id: 6, title: 'Distributed Systems', lessons: 10 },
          { id: 7, title: 'OS Security', lessons: 8 }
        ],
        lessons: 24,
        quizzes: 12
      },
      {
        id: 3,
        title: 'Computer Networks Essentials',
        description: 'Master the fundamentals of computer networking including protocols, routing, and network security.',
        thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        difficulty: 'intermediate',
        duration: 600, // 10 hours
        enrolledStudents: 2103,
        rating: 4.7,
        progress: 0,
        isEnrolled: false,
        modules: [
          { id: 8, title: 'Network Fundamentals', lessons: 6 },
          { id: 9, title: 'TCP/IP Protocols', lessons: 8 },
          { id: 10, title: 'Network Security', lessons: 7 }
        ],
        lessons: 21,
        quizzes: 10
      },
      {
        id: 4,
        title: 'Network Security & Cryptography',
        description: 'Learn advanced network security concepts, cryptography, and threat mitigation strategies.',
        thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        difficulty: 'advanced',
        duration: 540, // 9 hours
        enrolledStudents: 634,
        rating: 4.6,
        progress: 0,
        isEnrolled: false,
        modules: [
          { id: 11, title: 'Cryptography Basics', lessons: 5 },
          { id: 12, title: 'Network Attacks', lessons: 8 },
          { id: 13, title: 'Security Protocols', lessons: 6 }
        ],
        lessons: 19,
        quizzes: 9
      }
    ];

    setCourses(mockCourses);
    setFilteredCourses(mockCourses);
    setLoading(false);
  }, []);

  // Filter and search courses
  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(course => course.difficulty === selectedDifficulty);
    }

    // Category filter (simplified - you can expand this)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => {
        if (selectedCategory === 'operating-systems') {
          return course.title.toLowerCase().includes('operating system');
        } else if (selectedCategory === 'networks') {
          return course.title.toLowerCase().includes('network');
        }
        return true;
      });
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedDifficulty, selectedCategory]);

  const handleEnroll = (course) => {
    // Mock enrollment - replace with API call
    setCourses(prev => prev.map(c => 
      c.id === course.id ? { ...c, isEnrolled: true } : c
    ));
    console.log('Enrolling in course:', course.title);
  };

  const handleContinue = (course) => {
    // Navigate to course learning page
    console.log('Continuing course:', course.title);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{t('courses.title', 'Available Courses')}</h1>
          <p className="text-xl opacity-90">
            {t('courses.subtitle', 'Explore our comprehensive courses on Operating Systems and Computer Networks')}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('courses.searchPlaceholder', 'Search courses...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex gap-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('courses.allDifficulties', 'All Levels')}</option>
                <option value="beginner">{t('courses.difficultyBeginner', 'Beginner')}</option>
                <option value="intermediate">{t('courses.difficultyIntermediate', 'Intermediate')}</option>
                <option value="advanced">{t('courses.difficultyAdvanced', 'Advanced')}</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t('courses.allCategories', 'All Categories')}</option>
                <option value="operating-systems">{t('courses.operatingSystems', 'Operating Systems')}</option>
                <option value="networks">{t('courses.computerNetworks', 'Computer Networks')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              onContinue={handleContinue}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {t('courses.noResults', 'No courses found')}
            </h3>
            <p className="text-gray-500">
              {t('courses.noResultsDescription', 'Try adjusting your search or filters')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses; 