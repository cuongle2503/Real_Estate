async function fetchTransactions() {
    try {
        const token = localStorage.getItem('authToken');  // Lấy token từ localStorage
        if (!token) {
            alert('Vui lòng đăng nhập trước.');
            return;
        }

        const response = await fetch('http://localhost:8081/api/transaction/getAll', {
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
            <td>${transaction.property.user.name}</td>
            <td>${transaction.user.name}</td>
            <td>
                <button type="button" class="btn btn-success ms-2" onclick="approveTransaction('${transaction.id}')">Approve</button>
                <button type="button" class="btn btn-danger ms-2" onclick="deleteTransaction('${transaction.id}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function approveTransaction(transactionId) {
    try {
        const token = localStorage.getItem('authToken');
        console.error(transactionId);
        const response = await fetch(`http://localhost:8081/api/transaction/approve/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Transaction approved successfully');
            fetchTransactions();
        } else {
            alert('Failed to approve transaction');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

async function deleteTransaction(transactionId) {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`http://localhost:8081/api/transaction/delete/${transactionId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Transaction deleted successfully');
            fetchTransactions();
        } else {
            alert('Failed to delete transaction');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

// Gọi hàm để fetch dữ liệu khi trang được tải
window.onload = fetchTransactions;
