document.getElementById('submitBtn').addEventListener('click', function (event) {
    event.preventDefault();  // Ngăn việc gửi form mặc định

    // Lấy giá trị từ các trường nhập liệu
    const name = document.getElementById('floatingName').value;
    const userName = document.getElementById('floatingUserName').value;
    const password = document.getElementById('floatingPassword').value;
    const email = document.getElementById('floatingEmail').value;
    const phone = document.getElementById('floatingPhone').value;
    const rolesSelect = document.getElementById('floatingRoles');
    const selectedRoles = Array.from(rolesSelect.selectedOptions).map(option => option.value);

    // Tạo đối tượng userData
    const userData = {
        name: name,
        userName: userName,
        password: password,
        email: email,
        phone: phone,
        roles: selectedRoles
    };

    // Gửi yêu cầu POST đến API
    fetch('http://localhost:8081/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
        if (!response.ok) {
            // Nếu phản hồi không thành công (ví dụ: 400, 500), kiểm tra xem có phải là JSON không
            return response.text().then(text => {
                throw new Error(text);  // Ném lỗi nếu phản hồi không phải là JSON
            });
        }
        return response.json();  // Nếu phản hồi là JSON
    })
        .then(data => {
        console.log('Success:', data);
        alert('User created successfully!');
        // Chuyển hướng hoặc xử lý sau khi tạo thành công
        window.location.href = "http://localhost:8081/login";
    })
        .catch(error => {
        console.error('Error:', error);
        alert('Error creating user: ' + error.message);
    });
});
