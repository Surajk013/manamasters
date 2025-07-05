import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  BookOpen, 
  Award, 
  MessageSquare, 
  Settings, 
  BarChart3,
  Activity,
  Globe
} from 'lucide-react';
import TranslationUsage from '../components/TranslationUsage';

const Admin = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalUsers: 1250,
    activeCourses: 8,
    totalLessons: 156,
    completionRate: 78,
    aiChats: 3420,
    translations: 15600
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'user_registration',
      message: 'New user registered: Priya Sharma',
      timestamp: '2 minutes ago',
      icon: '👤'
    },
    {
      id: 2,
      type: 'course_completion',
      message: 'Course completed: Operating Systems Basics',
      timestamp: '15 minutes ago',
      icon: '🎓'
    },
    {
      id: 3,
      type: 'ai_chat',
      message: 'AI chat session: Process Management questions',
      timestamp: '1 hour ago',
      icon: '🤖'
    },
    {
      id: 4,
      type: 'translation',
      message: 'Translation used: Hindi to English',
      timestamp: '2 hours ago',
      icon: '🌐'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('admin.dashboard', 'Admin Dashboard')}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {t('admin.overview', 'Manage your learning platform')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t('admin.settings', 'Settings')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.totalUsers', 'Total Users')}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.activeCourses', 'Active Courses')}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeCourses}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.completionRate', 'Completion Rate')}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completionRate}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t('admin.aiChats', 'AI Chats')}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.aiChats.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Translation Usage & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Translation Usage */}
            <TranslationUsage />

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {t('admin.quickActions', 'Quick Actions')}
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  {t('admin.addCourse', 'Add New Course')}
                </button>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  {t('admin.manageUsers', 'Manage Users')}
                </button>
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  {t('admin.viewAnalytics', 'View Analytics')}
                </button>
                <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  {t('admin.aiSettings', 'AI Settings')}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('admin.recentActivity', 'Recent Activity')}
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('admin.userGrowth', 'User Growth')}
                  </h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    {t('admin.chartPlaceholder', 'Chart will be displayed here')}
                  </p>
                </div>
              </div>

              {/* Course Performance */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t('admin.coursePerformance', 'Course Performance')}
                  </h3>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-sm">
                    {t('admin.chartPlaceholder', 'Chart will be displayed here')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 