## 1. Nguyên Tắc, Mô Hình Phát Triển Phần Mềm và Thực Tiễn Đang Được Áp Dụng

### 1.1 Nguyên tắc SOLID
Các nguyên tắc thiết kế giúp đảm bảo mã nguồn rõ ràng và dễ bảo trì:
- **S: Single Responsibility Principle**  
  Mỗi lớp chỉ chịu trách nhiệm một nhiệm vụ duy nhất.
- **O: Open/Closed Principle**  
  Các thành phần có thể mở rộng mà không thay đổi mã hiện có.
- **L: Liskov Substitution Principle**  
  Các lớp dẫn xuất có thể thay thế lớp cơ sở mà không gây lỗi.
- **I: Interface Segregation Principle**  
  Các giao diện được tách biệt để tránh các phụ thuộc không cần thiết.
- **D: Dependency Inversion Principle**  
  Ưu tiên phụ thuộc vào các abstractions thay vì các chi tiết cụ thể.

### 1.2 Mô hình MVC (Model-View-Controller)
- **Model:**  
  Quản lý dữ liệu và logic xử lý dữ liệu.  
  _Ví dụ:_ Các lớp như `Property`, `User`, `Transaction` để xử lý đất đai, người dùng, giao dịch,…
- **View:**  
  Đại diện cho giao diện người dùng.  
  _Ví dụ:_ Trang web hiển thị danh sách sản phẩm, thông tin.
- **Controller:**  
  Điều phối tương tác giữa Model và View.  
  _Ví dụ:_ Các lớp điều khiển như `PropertyController` và `UserController`.

### 1.3 Công nghệ và công cụ áp dụng
- **Spring Security:**  
  Quản lý xác thực (Authentication), ủy quyền (Authorization) và bảo vệ các endpoint API.
- **Spring Boot:**  
  Cung cấp cấu hình mặc định, giúp khởi chạy ứng dụng nhanh chóng và hỗ trợ phát triển các ứng dụng phức tạp.
- **Thymeleaf:**  
  Công cụ tạo giao diện web với khả năng tích hợp liền mạch với Spring Boot.
- **Maven:**  
  Quản lý các thư viện phụ thuộc và hỗ trợ quy trình xây dựng, triển khai dự án.
- **Lombok:**  
  Tự động sinh getter, setter và constructor, giúp giảm độ phức tạp của mã nguồn.
- **MapStruct:**  
  Hỗ trợ chuyển đổi giữa các lớp (DTO, Entity) với hiệu suất cao và cấu hình linh hoạt.

---

## 2. Cấu trúc Spring Boot trong dự án
Cấu trúc dự án được tổ chức theo các layer sau:

### 2.1 Configuration
- Chứa các lớp cấu hình như: cấu hình bảo mật (Spring Security), kết nối cơ sở dữ liệu, và các cài đặt chung cho ứng dụng.

### 2.2 Controller
- Nhận và xử lý các yêu cầu HTTP từ client, điều phối tới `Service` và trả kết quả cho người dùng.

### 2.3 Dto (Data Transfer Object)
- **Request DTO:**  
  Nhận dữ liệu từ người dùng khi gửi yêu cầu.  
  _Ví dụ:_ Thông tin người dùng, sản phẩm.
- **Response DTO:**  
  Gửi kết quả xử lý về cho người dùng.

### 2.4 Entity
- Đại diện cho các đối tượng trong cơ sở dữ liệu, được ánh xạ trực tiếp với các bảng thông qua JPA.

### 2.5 Exception
- Xử lý các ngoại lệ, báo cáo lỗi với mã lỗi HTTP phù hợp để người dùng nhận thông báo chính xác.

### 2.6 Mapper
- Dùng để chuyển đổi giữa các đối tượng (Entity ↔ DTO) tự động bằng MapStruct.

### 2.7 Repository
- Tầng trung gian giữa ứng dụng và cơ sở dữ liệu, giúp thực hiện các thao tác CRUD.

### 2.8 Service
- Chứa các logic nghiệp vụ, xử lý yêu cầu từ `Controller`, tương tác với `Repository`, và đảm bảo tính chính xác của dữ liệu.

### 2.9 Validator
- Kiểm tra tính hợp lệ của dữ liệu trước khi xử lý. Nếu dữ liệu không hợp lệ, sẽ ném ra exception.

---

## 3. Công cụ và Thư viện chính
- **Spring Boot**  
- **Spring Security**  
- **Thymeleaf**  
- **Maven**  
- **Lombok**  
- **MapStruct**  
