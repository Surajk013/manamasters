import React from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Clock, Users, Star, Play, Award } from 'lucide-react';

const CourseCard = ({ course, onEnroll, onContinue }) => {
  const { t } = useTranslation();

  const {
    id,
    title,
    description,
    thumbnail,
    difficulty,
    duration,
    enrolledStudents,
    rating,
    progress = 0,
    isEnrolled = false,
    isCompleted = false,
    modules = [],
    lessons = [],
    quizzes = []
  } = course;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return t('courses.difficultyBeginner', 'Beginner');
      case 'intermediate':
        return t('courses.difficultyIntermediate', 'Intermediate');
      case 'advanced':
        return t('courses.difficultyAdvanced', 'Advanced');
      default:
        return difficulty;
    }
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Progress Overlay */}
        {isEnrolled && progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <div className="flex items-center justify-between text-sm">
              <span>{t('learning.progress')}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
              <div
                className="bg-green-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Completion Badge */}
        {isCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
            <Award className="w-4 h-4" />
          </div>
        )}

        {/* Difficulty Badge */}
        <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {getDifficultyText(difficulty)}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(duration)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{modules.length} {t('courses.modules')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{enrolledStudents}</span>
            </div>
          </div>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{rating}</span>
            </div>
          )}
        </div>

        {/* Course Features */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {lessons.length} {t('learning.lessons')}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
            {quizzes.length} {t('learning.quizzes')}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
            {t('learning.certificate')}
          </span>
        </div>

        {/* Action Button */}
        <div className="flex space-x-3">
          {isEnrolled ? (
            <button
              onClick={() => onContinue(course)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>{t('courses.continueLearning')}</span>
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course)}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('courses.startLearning')}</span>
            </button>
          )}
        </div>

        {/* Progress Indicator */}
        {isEnrolled && progress > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>{t('learning.completion')}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard; 