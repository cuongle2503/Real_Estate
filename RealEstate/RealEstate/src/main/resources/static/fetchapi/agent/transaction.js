async function fetchTransactions() {
    try {
        const token = localStorage.getItem('authToken');  // Lấy token từ localStorage
        if (!token) {
            alert('Vui lòng đăng nhập trước.');
            return;
        }
        // Giải mã token JWT để lấy ID người dùng
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        const response = await fetch(`http://localhost:8081/api/transaction/getByAgent/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu giao dịch');
        }

        const transactions = await response.json();
        populateTransactionTable(transactions);  // Hàm để hiển thị dữ liệu vào bảng
    } catch (error) {
        console.error('Error:', error);
        alert('Lỗi: ' + error.message);
    }
}

// Hàm để hiển thị dữ liệu vào bảng
function populateTransactionTable(transactions) {
    const tableBody = document.getElementById('transactionTableBody');
    tableBody.innerHTML = '';  // Xóa nội dung cũ trong bảng

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${new Date(transaction.date).toLocaleDateString()}</td>
            <td>${transaction.status ? 'Completed' : 'Pending'}</td>
            <td>${transaction.totalAmount}</td>
            <td>${transaction.user.name}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Gọi hàm để fetch dữ liệu khi trang được tải
window.onload = fetchTransactions;
