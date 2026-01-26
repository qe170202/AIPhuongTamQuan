# Hướng Dẫn Sử Dụng Hệ Thống Analytics

## Tổng Quan

Hệ thống analytics đã được tích hợp vào ứng dụng để theo dõi:
- **Số lượt truy cập trang**: Tổng lượt truy cập, lượt truy cập hôm nay, và số người truy cập duy nhất
- **Số câu hỏi**: Tổng số câu hỏi đã được hỏi và số câu hỏi hôm nay

## Cách Xem Thống Kê

### 1. Qua Giao Diện (UI)
- Click vào biểu tượng **📊** (biểu đồ) trên thanh navbar (góc trên bên phải)
- Một modal sẽ hiển thị với đầy đủ thống kê:
  - Tổng lượt truy cập
  - Lượt truy cập hôm nay
  - Số người truy cập duy nhất
  - Tổng số câu hỏi
  - Số câu hỏi hôm nay
  - Danh sách 10 câu hỏi gần đây nhất

### 2. Qua Console (Dành cho Developer)

Mở Console của trình duyệt (F12) và sử dụng các hàm sau:

```javascript
// Import module analytics (nếu đang trong môi trường development)
import { getAllStats, getVisitorStats, getQuestionStats, exportAnalytics } from './utils/analytics'

// Lấy tất cả thống kê
getAllStats()

// Chỉ lấy thống kê visitors
getVisitorStats()

// Chỉ lấy thống kê questions
getQuestionStats()

// Xuất dữ liệu dưới dạng JSON
exportAnalytics()
```

Hoặc truy cập trực tiếp từ localStorage:

```javascript
// Xem dữ liệu visitors
JSON.parse(localStorage.getItem('analytics_visitors'))

// Xem dữ liệu questions
JSON.parse(localStorage.getItem('analytics_questions'))
```

## Cấu Trúc Dữ Liệu

### Visitors Data
```json
{
  "totalVisits": 150,
  "2026-01-26": 25,
  "uniqueVisitors": ["visitor_123...", "visitor_456..."],
  "lastUpdated": "2026-01-26T10:30:00.000Z"
}
```

### Questions Data
```json
{
  "totalQuestions": 500,
  "2026-01-26": 45,
  "recentQuestions": [
    {
      "text": "Ngày bầu cử là ngày mấy?",
      "timestamp": "2026-01-26T10:30:00.000Z",
      "date": "2026-01-26"
    }
  ],
  "lastUpdated": "2026-01-26T10:30:00.000Z"
}
```

## Tính Năng

### Tự Động Tracking
- **Visitors**: Tự động track khi người dùng truy cập trang (mỗi ngày chỉ tính 1 lần cho mỗi visitor)
- **Questions**: Tự động track khi người dùng gửi câu hỏi trong chatbot

### Xuất Dữ Liệu
- Click nút "📥 Xuất dữ liệu" trong modal thống kê
- Dữ liệu sẽ được tải xuống dưới dạng file JSON

### Xóa Dữ Liệu
- Click nút "🗑️ Xóa dữ liệu" trong modal thống kê
- Xác nhận để xóa tất cả dữ liệu analytics (không thể hoàn tác)

## Lưu Ý

1. **Dữ liệu được lưu trong localStorage**: 
   - Dữ liệu chỉ tồn tại trên trình duyệt của người dùng
   - Nếu xóa cache/cookie, dữ liệu sẽ bị mất
   - Để lưu trữ lâu dài, cần tích hợp với backend/database

2. **Unique Visitors**:
   - Mỗi trình duyệt có một ID duy nhất
   - Nếu người dùng xóa localStorage, họ sẽ được tính là visitor mới

3. **Tracking Questions**:
   - Chỉ track các câu hỏi từ người dùng (không track tin nhắn từ bot)
   - Lưu tối đa 100 câu hỏi gần đây nhất

## Nâng Cấp Tương Lai

Để lưu trữ dữ liệu lâu dài và có thể truy cập từ nhiều thiết bị, có thể:
1. Tích hợp với Firebase Firestore
2. Tích hợp với backend API (Node.js, Python, etc.)
3. Sử dụng Google Analytics hoặc các dịch vụ analytics khác
