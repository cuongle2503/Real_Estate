// Hàm để lấy username từ token JWT
function getUsernameFromToken() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
        return null;
    }

    // JWT có 3 phần: header.payload.signature
    const payload = token.split('.')[1];

    // Giải mã Base64URL phần Payload
    const decodedPayload = decodeBase64Url(payload);

    // Chuyển đổi từ JSON string thành object
    const payloadObj = JSON.parse(decodedPayload);

    // Truy xuất thông tin userName từ payload
    const name = payloadObj.name;

    if (!name) {
        alert('Không tìm thấy thông tin người dùng trong token.');
        return null;
    }

    return name;
}

// Hàm giải mã Base64URL (không giống Base64 chuẩn)
function decodeBase64Url(base64Url) {
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return atob(base64);
}

// Hàm để hiển thị username lên navbar
function displayUserNameInNavbar(name) {
    const userNameDisplays = document.querySelectorAll('#username');
    if (userNameDisplays.length === 0) {
        console.error('Không tìm thấy phần tử có ID là #username.');
        return;
    }

    userNameDisplays.forEach(element => {
        element.textContent = name || 'N/A';
    });
}

// Gọi hàm sau khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
    const name = getUsernameFromToken();
    if (name) {
        displayUserNameInNavbar(name);
    } else {
        console.error('Không thể lấy username từ token.');
    }
});
