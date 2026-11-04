# Cấu hình Biến Môi Trường (.env)

Dự án này sử dụng các biến môi trường để bảo mật thông tin tài khoản quản trị và cấu hình hệ thống. Do đó, file `.env` không được lưu trữ trên Git. 

Để chạy được bộ test automation, bạn cần tạo file `.env` thủ công theo hướng dẫn sau:

## Hướng dẫn tạo file `.env`

1. Tại thư mục gốc của dự án (ngang hàng với `package.json`), bạn hãy tạo một file mới và đặt tên chính xác là **`.env`**.
2. Sao chép đoạn nội dung mẫu dưới đây dán vào file `.env` vừa tạo:

```env
ADMIN_USER=dien_tai_khoan_admin_cua_ban_vao_day
ADMIN_PASS=dien_mat_khau_admin_cua_ban_vao_day
```