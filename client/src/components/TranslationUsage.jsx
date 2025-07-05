import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, AlertTriangle, CheckCircle, Globe } from 'lucide-react';
import { aiChatAPI } from '../services/api';

const TranslationUsage = () => {
  const { t } = useTranslation();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async () => {
    try {
      setLoading(true);
      const response = await aiChatAPI.getTranslationUsage();
      setUsage(response.usage);
      setError(null);
    } catch (err) {
      console.error('Error fetching translation usage:', err);
      setError('Failed to load usage data');
    } finally {
      setLoading(false);
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getUsageIcon = (percentage) => {
    if (percentage >= 90) return <AlertTriangle className="w-5 h-5 text-red-600" />;
    if (percentage >= 75) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <CheckCircle className="w-5 h-5 text-green-600" />;
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="text-center text-gray-500">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-500" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!usage) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">
            {t('translation.usageTitle', 'Translation Usage')}
          </h3>
        </div>
        {getUsageIcon(usage.percentage)}
      </div>

      {/* Free Service Badge */}
      <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-xs text-green-700 font-medium">
            {t('translation.freeService', 'Free Google Translate Service')}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              usage.percentage >= 90 ? 'bg-red-500' :
              usage.percentage >= 75 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(usage.percentage, 100)}%` }}
          />
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">{t('translation.used', 'Used')}</p>
            <p className="font-semibold text-gray-900">
              {usage.characters.toLocaleString()} / {usage.limit.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">{t('translation.remaining', 'Remaining')}</p>
            <p className={`font-semibold ${getUsageColor(usage.percentage)}`}>
              {usage.remaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Percentage */}
        <div className="text-center">
          <p className={`text-lg font-bold ${getUsageColor(usage.percentage)}`}>
            {usage.percentage}%
          </p>
          <p className="text-xs text-gray-500">
            {t('translation.monthlyLimit', 'Monthly Monitoring Limit')}
          </p>
        </div>

        {/* Warning Message */}
        {usage.percentage >= 75 && (
          <div className={`p-3 rounded-lg text-sm ${
            usage.percentage >= 90 ? 'bg-red-50 text-red-800' : 'bg-yellow-50 text-yellow-800'
          }`}>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>
                {usage.percentage >= 90 
                  ? t('translation.criticalWarning', 'Critical: Translation usage is very high!')
                  : t('translation.warning', 'Warning: Translation usage is getting high.')
                }
              </span>
            </div>
          </div>
        )}

        {/* Service Info */}
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <p>💡 {t('translation.serviceInfo', 'Using Google\'s free translation service - no API key required')}</p>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={fetchUsage}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
      >
        {t('translation.refresh', 'Refresh Usage')}
      </button>
    </div>
  );
};

export default TranslationUsage; 