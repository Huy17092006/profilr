# 🎯 Profilr - Tạo Bio Của Bạn

Ứng dụng tạo bio cá nhân với thanh toán qua MB Bank QR Code.

## ✨ Tính Năng

- ✅ Tạo bio cá nhân với username, tên, ảnh đại diện
- ✅ Thêm mô tả, social links (Instagram, Facebook, TikTok)
- ✅ Thêm link website/sản phẩm
- ✅ Thanh toán qua QR Code MB Bank (30.000đ)
- ✅ Tạo link bio duy nhất: `profilr.com/bio?user=username`
- ✅ Lưu trữ dữ liệu dùng localStorage

## 🚀 Cách Sử Dụng

### Bước 1: Tạo Bio
- Vào `index.html`
- Nhập username, họ tên, ảnh đại diện, mô tả
- Thêm social links (tùy chọn)
- Thêm website/sản phẩm (tùy chọn)
- Click "Tiếp tục → Thanh Toán"

### Bước 2: Thanh Toán
- Scan QR Code MB Bank
- Chuyển 30.000đ tới: **PHUNG GIA HUY (42051799999)**
- Nội dung chuyển: `bio-[username]`
- Click "Đã Thanh Toán - Tạo Link Bio"

### Bước 3: Tạo Link Bio
- Nhận link bio của bạn
- Copy link để chia sẻ
- Link có dạng: `https://[domain]/bio.html?user=username`

## 📋 Thông Tin Thanh Toán

| Thông Tin | Chi Tiết |
|-----------|---------|
| **Số Tài Khoản** | 42051799999 |
| **Chủ Tài Khoản** | PHUNG GIA HUY |
| **Ngân Hàng** | MB Bank |
| **Số Tiền** | 30,000đ |

## 📁 Cấu Trúc File

```
profilr/
├── index.html      # Trang chính (tạo bio & thanh toán)
├── bio.html        # Trang hiển thị bio
├── app.js          # Logic JavaScript
└── README.md       # Hướng dẫn này
```

## 🛠️ Công Nghệ

- HTML5, CSS3, JavaScript (Vanilla)
- QR Code JS library
- LocalStorage (lưu dữ liệu)

## 💾 Dữ Liệu

Dữ liệu được lưu ở LocalStorage:
- `allBios`: Lưu trữ tất cả bios của khách hàng
- `tempBioData`: Dữ liệu tạm thời trong quá trình tạo bio

## 🔒 Lưu Ý

- Username không được trùng lặp
- Username chỉ chứa chữ, số, dấu gạch ngang và gạch dưới
- Tối thiểu 3 ký tự
- Dữ liệu được lưu cục bộ trên browser

## 📱 Responsive Design

✅ Hỗ trợ đầy đủ trên:
- Desktop
- Tablet
- Mobile

## 🎨 Giao Diện

- Gradient xanh tím hiện đại
- Card design với animation mượt mà
- Tối ưu hóa UX/UI

## 🚀 Triển Khai

1. Push code lên GitHub
2. Enable GitHub Pages trong settings
3. Truy cập: `https://huy17092006.github.io/profilr/`

## 📞 Liên Hệ

Tạo bởi: **Huy17092006**

---

**Made with ❤️ for Profilr**
