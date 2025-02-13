async function loginUser(event) {
    event.preventDefault();

    const userRequest = {
        userName: document.getElementById('floatingInput').value,
        password: document.getElementById('floatingPassword').value
    };

    try {
        const response = await fetch('http://localhost:8081/api/user/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        });

        if (!response.ok) {
            const errorMessage = await response.text();  // Lấy thông báo lỗi từ server
            throw new Error(errorMessage);
        }

        const token = await response.text();  // Dùng text để nhận token (chuỗi)
        alert('Đăng nhập thành công');
        console.log(token); // Token JWT

        // Giải mã token JWT
        const decodedToken = jwt_decode(token);
        console.log(decodedToken); // Hiển thị thông tin giải mã

        // Lưu token vào localStorage hoặc sessionStorage nếu cần
        localStorage.setItem('authToken', token);

        // Kiểm tra role trong decoded token và chuyển hướng đến trang phù hợp
        if (decodedToken.scope.includes("ROLE_ADMIN")) {
            window.location.href = "http://localhost:8081/admin/dashboard"; // Trang admin
        } else if (decodedToken.scope.includes("ROLE_CUSTOMER")) {
            window.location.href = "http://localhost:8081/home"; // Trang customer
        } else if (decodedToken.scope.includes("ROLE_AGENT")) {
            window.location.href = "http://localhost:8081/agent/dashboard"; // Trang agent
        } else {
            // Nếu không phải admin hoặc user, có thể chuyển đến trang mặc định
            window.location.href = "http://localhost:8081/error"; // Trang chính
        }
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
}
