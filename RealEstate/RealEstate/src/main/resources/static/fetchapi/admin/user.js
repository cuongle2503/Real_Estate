async function getUserData() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
        return;
    }

    try {
        // Gửi yêu cầu GET với Authorization header chứa token
        const response = await fetch('http://localhost:8081/api/user/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Lỗi từ server: ${errorMessage}`);
        }

        // Chuyển đổi dữ liệu nhận được thành JSON
        const users = await response.json();
        console.log(users);


        const selectedRole = document.getElementById('roleSelect').value;
        const filteredUsers = selectedRole ? users.filter(user => user.roles.some(role => role.name.toLowerCase() === selectedRole.toLowerCase())) : users;

        displayUsers(filteredUsers);
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
}


function displayUsers(users) {
    const userTable = document.getElementById('userTableBody');

    userTable.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.name || 'N/A'}</td>
            <td>${user.userName || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.phone || 'N/A'}</td>
            <td>${user.roles.map(role => role.name).join(', ') || 'N/A'}</td>
        `;

        userTable.appendChild(row);
    });
}


function handleRoleSelection() {
    getUserData();
}


window.onload = function() {
    getUserData();
};
