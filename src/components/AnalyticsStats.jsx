// src/components/AnalyticsStats.jsx
// Component để hiển thị thống kê số lượt truy cập và số câu hỏi

import { useState, useEffect } from 'react'
import { getAllStats, exportAnalytics, resetAnalytics } from '../utils/analytics'

const AnalyticsStats = ({ isVisible, onClose }) => {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isVisible) {
      loadStats()
      // Auto refresh every 5 seconds when visible
      const interval = setInterval(loadStats, 5000)
      return () => clearInterval(interval)
    }
  }, [isVisible])

  const loadStats = () => {
    setIsLoading(true)
    const data = getAllStats()
    setStats(data)
    setIsLoading(false)
  }

  const handleExport = () => {
    const data = exportAnalytics()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleReset = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu thống kê? Hành động này không thể hoàn tác.')) {
      resetAnalytics()
      loadStats()
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-darkTheme rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b-2 border-gray-200 dark:border-white/20 flex items-center justify-between bg-gradient-to-r from-[#b820e6]/10 to-[#da7d20]/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#b820e6] to-[#da7d20] bg-clip-text text-transparent">
            📊 Thống Kê
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 dark:hover:bg-darkHover rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b820e6]"></div>
            </div>
          ) : stats ? (
            <div className="space-y-6">
              {/* Visitors Stats */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700/50">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center gap-2">
                  👥 Lượt Truy Cập
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-darkHover/50 rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tổng lượt truy cập</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.visitors.totalVisits.toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-darkHover/50 rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hôm nay</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {stats.visitors.todayVisits.toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-darkHover/50 rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Người truy cập duy nhất</div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.visitors.uniqueVisitors.toLocaleString('vi-VN')}
                    </div>
                  </div>
                </div>
                {stats.visitors.lastUpdated && (
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Cập nhật lần cuối: {new Date(stats.visitors.lastUpdated).toLocaleString('vi-VN')}
                  </div>
                )}
              </div>

              {/* Questions Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700/50">
                <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 flex items-center gap-2">
                  💬 Câu Hỏi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-darkHover/50 rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tổng số câu hỏi</div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {stats.questions.totalQuestions.toLocaleString('vi-VN')}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-darkHover/50 rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hôm nay</div>
                    <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                      {stats.questions.todayQuestions.toLocaleString('vi-VN')}
                    </div>
                  </div>
                </div>
                {stats.questions.lastUpdated && (
                  <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    Cập nhật lần cuối: {new Date(stats.questions.lastUpdated).toLocaleString('vi-VN')}
                  </div>
                )}
              </div>

              {/* Recent Questions */}
              {stats.questions.recentQuestions && stats.questions.recentQuestions.length > 0 && (
                <div className="bg-gray-50 dark:bg-darkHover/30 rounded-xl p-6 border-2 border-gray-200 dark:border-white/20">
                  <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">
                    📝 Câu hỏi gần đây (10 câu đầu)
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {stats.questions.recentQuestions.slice(0, 10).map((q, idx) => (
                      <div
                        key={idx}
                        className="bg-white dark:bg-darkHover/50 rounded-lg p-3 text-sm border border-gray-200 dark:border-white/20"
                      >
                        <div className="text-gray-800 dark:text-gray-200 mb-1">{q.text}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(q.timestamp).toLocaleString('vi-VN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              Không có dữ liệu thống kê
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t-2 border-gray-200 dark:border-white/20 flex gap-3 justify-end bg-gray-50 dark:bg-darkHover/30">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            📥 Xuất dữ liệu
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            🗑️ Xóa dữ liệu
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsStats
