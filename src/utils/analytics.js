// src/utils/analytics.js
// Utility để tracking số lượt truy cập và số câu hỏi

const STORAGE_KEYS = {
  VISITORS: 'analytics_visitors',
  QUESTIONS: 'analytics_questions',
  VISIT_SESSION: 'analytics_visit_session',
  LAST_VISIT_DATE: 'analytics_last_visit_date'
};

/**
 * Lấy hoặc tạo unique visitor ID
 */
function getVisitorId() {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
}

/**
 * Kiểm tra xem đây có phải là lượt truy cập mới trong ngày không
 */
function isNewVisitToday() {
  const lastVisitDate = localStorage.getItem(STORAGE_KEYS.LAST_VISIT_DATE);
  const today = new Date().toDateString();
  
  if (lastVisitDate !== today) {
    localStorage.setItem(STORAGE_KEYS.LAST_VISIT_DATE, today);
    return true;
  }
  return false;
}

/**
 * Track lượt truy cập trang
 */
export function trackPageVisit() {
  try {
    const visitorId = getVisitorId();
    const now = new Date();
    const today = now.toDateString();
    
    // Lấy dữ liệu visitors hiện tại
    const visitorsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITORS) || '{}');
    
    // Kiểm tra xem visitor này đã truy cập hôm nay chưa
    const isNewVisit = isNewVisitToday();
    
    if (isNewVisit || !visitorsData[today]) {
      // Tăng tổng số lượt truy cập
      visitorsData.totalVisits = (visitorsData.totalVisits || 0) + 1;
      
      // Tăng số lượt truy cập hôm nay
      visitorsData[today] = (visitorsData[today] || 0) + 1;
      
      // Lưu danh sách unique visitors
      if (!visitorsData.uniqueVisitors) {
        visitorsData.uniqueVisitors = new Set();
      } else {
        visitorsData.uniqueVisitors = new Set(visitorsData.uniqueVisitors);
      }
      
      visitorsData.uniqueVisitors.add(visitorId);
      
      // Chuyển Set thành Array để lưu vào localStorage
      const dataToSave = {
        ...visitorsData,
        uniqueVisitors: Array.from(visitorsData.uniqueVisitors),
        lastUpdated: now.toISOString()
      };
      
      localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(dataToSave));
      
      return {
        isNewVisit: true,
        totalVisits: dataToSave.totalVisits,
        todayVisits: dataToSave[today],
        uniqueVisitors: dataToSave.uniqueVisitors.length
      };
    }
    
    return {
      isNewVisit: false,
      totalVisits: visitorsData.totalVisits || 0,
      todayVisits: visitorsData[today] || 0,
      uniqueVisitors: visitorsData.uniqueVisitors ? visitorsData.uniqueVisitors.length : 0
    };
  } catch (error) {
    console.error('Error tracking page visit:', error);
    return null;
  }
}

/**
 * Track câu hỏi được gửi
 */
export function trackQuestion(questionText) {
  try {
    const now = new Date();
    const today = now.toDateString();
    
    // Lấy dữ liệu questions hiện tại
    const questionsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS) || '{}');
    
    // Tăng tổng số câu hỏi
    questionsData.totalQuestions = (questionsData.totalQuestions || 0) + 1;
    
    // Tăng số câu hỏi hôm nay
    questionsData[today] = (questionsData[today] || 0) + 1;
    
    // Lưu câu hỏi gần đây (tối đa 100 câu)
    if (!questionsData.recentQuestions) {
      questionsData.recentQuestions = [];
    }
    
    questionsData.recentQuestions.unshift({
      text: questionText,
      timestamp: now.toISOString(),
      date: today
    });
    
    // Giới hạn danh sách câu hỏi gần đây
    if (questionsData.recentQuestions.length > 100) {
      questionsData.recentQuestions = questionsData.recentQuestions.slice(0, 100);
    }
    
    questionsData.lastUpdated = now.toISOString();
    
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questionsData));
    
    return {
      totalQuestions: questionsData.totalQuestions,
      todayQuestions: questionsData[today]
    };
  } catch (error) {
    console.error('Error tracking question:', error);
    return null;
  }
}

/**
 * Lấy thống kê visitors
 */
export function getVisitorStats() {
  try {
    const visitorsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITORS) || '{}');
    const today = new Date().toDateString();
    
    return {
      totalVisits: visitorsData.totalVisits || 0,
      todayVisits: visitorsData[today] || 0,
      uniqueVisitors: visitorsData.uniqueVisitors ? visitorsData.uniqueVisitors.length : 0,
      lastUpdated: visitorsData.lastUpdated || null
    };
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    return {
      totalVisits: 0,
      todayVisits: 0,
      uniqueVisitors: 0,
      lastUpdated: null
    };
  }
}

/**
 * Lấy thống kê questions
 */
export function getQuestionStats() {
  try {
    const questionsData = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS) || '{}');
    const today = new Date().toDateString();
    
    return {
      totalQuestions: questionsData.totalQuestions || 0,
      todayQuestions: questionsData[today] || 0,
      recentQuestions: questionsData.recentQuestions || [],
      lastUpdated: questionsData.lastUpdated || null
    };
  } catch (error) {
    console.error('Error getting question stats:', error);
    return {
      totalQuestions: 0,
      todayQuestions: 0,
      recentQuestions: [],
      lastUpdated: null
    };
  }
}

/**
 * Lấy tất cả thống kê
 */
export function getAllStats() {
  return {
    visitors: getVisitorStats(),
    questions: getQuestionStats()
  };
}

/**
 * Xóa tất cả dữ liệu analytics (reset)
 */
export function resetAnalytics() {
  try {
    localStorage.removeItem(STORAGE_KEYS.VISITORS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.VISIT_SESSION);
    localStorage.removeItem(STORAGE_KEYS.LAST_VISIT_DATE);
    return true;
  } catch (error) {
    console.error('Error resetting analytics:', error);
    return false;
  }
}

/**
 * Export dữ liệu analytics dưới dạng JSON
 */
export function exportAnalytics() {
  return {
    visitors: JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITORS) || '{}'),
    questions: JSON.parse(localStorage.getItem(STORAGE_KEYS.QUESTIONS) || '{}'),
    exportedAt: new Date().toISOString()
  };
}
