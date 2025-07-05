import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle, Clock, Trophy, Star, AlertCircle } from 'lucide-react';

const Quiz = ({ quiz, onComplete }) => {
  const { t } = useTranslation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit || 300); // 5 minutes default
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    if (isSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Calculate score
    let correctAnswers = 0;
    let currentStreak = 0;
    let highestStreak = 0;
    
    quiz.questions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
        currentStreak++;
        highestStreak = Math.max(highestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
    
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(finalScore);
    setStreak(currentStreak);
    setMaxStreak(highestStreak);
    setShowResults(true);
    
    // Call completion callback
    if (onComplete) {
      onComplete({
        score: finalScore,
        totalQuestions,
        correctAnswers,
        timeSpent: (quiz.timeLimit || 300) - timeRemaining,
        streak: highestStreak,
        answers: selectedAnswers
      });
    }
  };

  const getQuestionType = (question) => {
    if (question.type === 'multiple-choice') {
      return t('quiz.multipleChoice', 'Multiple Choice');
    } else if (question.type === 'true-false') {
      return t('quiz.trueFalse', 'True/False');
    } else if (question.type === 'fill-blank') {
      return t('quiz.fillBlank', 'Fill in the Blank');
    }
    return t('quiz.question', 'Question');
  };

  const isAnswerCorrect = (questionIndex, answerIndex) => {
    const question = quiz.questions[questionIndex];
    return answerIndex === question.correctAnswer;
  };

  const isAnswerSelected = (questionIndex, answerIndex) => {
    return selectedAnswers[questionIndex] === answerIndex;
  };

  const getAnswerClass = (questionIndex, answerIndex) => {
    if (!isSubmitted) {
      return isAnswerSelected(questionIndex, answerIndex)
        ? 'bg-blue-100 border-blue-500'
        : 'bg-white hover:bg-gray-50';
    }

    const isCorrect = isAnswerCorrect(questionIndex, answerIndex);
    const isSelected = isAnswerSelected(questionIndex, answerIndex);

    if (isCorrect) {
      return 'bg-green-100 border-green-500';
    } else if (isSelected && !isCorrect) {
      return 'bg-red-100 border-red-500';
    } else {
      return 'bg-gray-50 border-gray-200';
    }
  };

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              {score >= 80 ? (
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
              ) : score >= 60 ? (
                <Star className="w-16 h-16 text-blue-500 mx-auto" />
              ) : (
                <AlertCircle className="w-16 h-16 text-orange-500 mx-auto" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {score >= 80 ? t('gamification.perfectScore') : 
               score >= 60 ? t('gamification.greatJob') : 
               t('gamification.tryAgain')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('learning.score')}: {score}% ({Math.round((score / 100) * totalQuestions)}/{totalQuestions})
            </p>
          </div>

          {/* Score Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{score}%</div>
              <div className="text-sm text-blue-800">{t('learning.score')}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{maxStreak}</div>
              <div className="text-sm text-green-800">{t('gamification.streak')}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{formatTime((quiz.timeLimit || 300) - timeRemaining)}</div>
              <div className="text-sm text-purple-800">{t('learning.timeSpent')}</div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('learning.feedback')}
            </h3>
            {quiz.questions.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3 mb-3">
                  {isAnswerCorrect(index, selectedAnswers[index]) ? (
                    <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border ${
                            isAnswerCorrect(index, optionIndex)
                              ? 'bg-green-100 border-green-300'
                              : isAnswerSelected(index, optionIndex) && !isAnswerCorrect(index, optionIndex)
                              ? 'bg-red-100 border-red-300'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            {isAnswerCorrect(index, optionIndex) && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                            {isAnswerSelected(index, optionIndex) && !isAnswerCorrect(index, optionIndex) && (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span className="text-sm">{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>{t('learning.explanation')}:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                    {question.reference && (
                      <div className="mt-2">
                        <a
                          href={question.reference}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          {t('learning.additionalResources')}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('quiz.retry')}
            </button>
            <button
              onClick={() => onComplete && onComplete({ action: 'continue' })}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('common.continue')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-red-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{formatTime(timeRemaining)}</span>
              </div>
              <div className="text-sm text-gray-600">
                {currentQuestionIndex + 1} / {totalQuestions}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-3">
              {getQuestionType(currentQuestion)}
            </span>
            <h2 className="text-xl font-semibold text-gray-900">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${getAnswerClass(currentQuestionIndex, index)}`}
                disabled={isSubmitted}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isAnswerSelected(currentQuestionIndex, index)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {isAnswerSelected(currentQuestionIndex, index) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('common.previous')}
          </button>

          <div className="flex space-x-3">
            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < totalQuestions}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('common.submit')}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestionIndex]}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {t('common.next')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 