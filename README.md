# Eliana Portfolio - React Version

Đây là website portfolio được xây dựng lại với **React**, **Vite**, và **Tailwind CSS**.

## 📋 Mô tả dự án

Portfolio website cho Eliana Jade - một Frontend Web Developer. Website bao gồm:
- Trang chủ với giới thiệu
- Phần About me
- Phần Services
- Portfolio/My Work
- Form liên hệ
- Dark mode toggle
- Responsive design (mobile-friendly)

## 🛠️ Công nghệ sử dụng

- **React 18**: Framework JavaScript
- **Vite**: Build tool và dev server
- **Tailwind CSS**: Framework CSS utility-first
- **JavaScript (ES6+)**: Xử lý logic với React Hooks
- **Fonts**: Google Fonts (Outfit, Ovo)

## 📦 Cài đặt

### Yêu cầu
- Node.js (phiên bản 16 trở lên)
- Yarn package manager

### Các bước cài đặt

1. **Clone hoặc tải dự án về máy**

2. **Cài đặt dependencies:**
   ```bash
   yarn install
   ```

## 🚀 Cách chạy dự án

### Development mode

Chạy development server với hot reload:

```bash
yarn dev
```

Sau đó mở trình duyệt và truy cập: `http://localhost:5173`

### Build cho production

Để build dự án cho production:

```bash
yarn build
```

File build sẽ được tạo trong thư mục `dist/`

### Preview production build

Để xem preview của production build:

```bash
yarn preview
```

## 📁 Cấu trúc thư mục

```
Eliana-1.0.0/
├── public/
│   ├── assets/          # Hình ảnh và icons
│   └── index.html       # HTML template
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Work.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx          # Component chính
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind CSS directives
├── package.json         # Dependencies và scripts
├── vite.config.js       # Cấu hình Vite
├── tailwind.config.js   # Cấu hình Tailwind CSS
├── postcss.config.js    # Cấu hình PostCSS
└── README.md            # File hướng dẫn này
```

## ✨ Tính năng

- ✅ Dark mode / Light mode toggle (lưu trong localStorage)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scrolling
- ✅ Mobile menu với animation
- ✅ Navbar với backdrop blur effect khi scroll
- ✅ Form liên hệ (cần cấu hình backend để gửi email)
- ✅ React Hooks cho state management

## 🔧 Scripts có sẵn

- `yarn dev` - Chạy development server
- `yarn build` - Build cho production
- `yarn preview` - Preview production build

## 📝 Lưu ý

- Form liên hệ hiện tại chỉ là giao diện, cần tích hợp backend để xử lý gửi email
- Tất cả các link social media (GitHub, LinkedIn, Twitter) đang trỏ đến `#!`, cần cập nhật với link thật
- Dark mode được lưu trong localStorage và tự động áp dụng khi reload trang

## 🎨 Tùy chỉnh

Để tùy chỉnh giao diện:

1. Chỉnh sửa các components trong `src/components/` để thay đổi nội dung
2. Chỉnh sửa `tailwind.config.js` để thay đổi theme colors, fonts...
3. Chỉnh sửa `src/App.jsx` hoặc các components để thay đổi logic
4. Thêm components mới trong `src/components/`

## 🆚 So sánh với phiên bản HTML thuần

- ✅ Code được tổ chức tốt hơn với components
- ✅ Dễ bảo trì và mở rộng
- ✅ Sử dụng React Hooks thay vì vanilla JavaScript
- ✅ Hot reload khi development
- ✅ Build tối ưu với Vite

## 📄 License

© 2025 PrebuiltUI. All rights reserved. Distributed by ThemeWagon
