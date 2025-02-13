async function drawTransactionChart() {
    const token = localStorage.getItem('authToken');

    // Giải mã token JWT để lấy ID người dùng
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
        return;
    }

    try {
        // Gọi API để lấy danh sách giao dịch
        const response = await fetch(`http://localhost:8081/api/transaction/getByAgent/${userId}`, {
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

        const transactions = await response.json();

        // Xử lý dữ liệu để lấy tổng số tiền theo từng ngày
        const dailyData = {};

        transactions.forEach(transaction => {
            if (transaction.status) { // Chỉ tính các giao dịch đã được phê duyệt
                const date = new Date(transaction.date);
                const day = date.toISOString().split('T')[0]; // Lấy ngày (YYYY-MM-DD)

                if (!dailyData[day]) {
                    dailyData[day] = 0;
                }

                dailyData[day] += transaction.totalAmount;
            }
        });

        // Chuyển đổi dữ liệu thành định dạng biểu đồ
        const labels = Object.keys(dailyData).sort(); // Các ngày (YYYY-MM-DD)
        const data = labels.map(day => dailyData[day]); // Tổng số tiền theo ngày

        // Tạo màu sắc cho mỗi cột
        const colors = [
            '#d62728', '#ff7f0e', '#2ca02c', '#1f77b4',
            '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ];

        // Tạo biểu đồ
        const ctx = document.getElementById('transactionChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total (USD)',
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: colors.slice(0, labels.length),
                    borderWidth: 1,
                    barThickness: 20, // Độ dày cột cố định
                    maxBarThickness: 30 // Độ dày tối đa khi không cố định
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Total amount received per day',
                        font: {
                            size: 18,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return context.raw.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                });
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Day',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 10 // Giới hạn số lượng ticks trên trục X
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total (USD)',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            callback: function (value) {
                                return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                            }
                        }
                    }
                },
                maintainAspectRatio: false, // Allow resizing chart dynamically
                responsive: true,
                width: '100%',  // Make the chart width 100% of its container
                height: 500  // You can adjust this height value as per your requirement
            }
        });

    } catch (error) {
        alert('Có lỗi xảy ra khi lấy dữ liệu: ' + error.message);
    }
}





async function getDashboardData()  {
    const token = localStorage.getItem('authToken');

    // Giải mã token JWT để lấy ID người dùng
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
        return;
    }

    //get user
    try {
        const responseUser = await fetch('http://localhost:8081/api/user/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const responseProperty = await fetch(`http://localhost:8081/api/property/getProperties/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Gửi token trong header Authorization
            }
        });

        const responseTransaction = await fetch(`http://localhost:8081/api/transaction/getByAgent/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (!responseUser.ok) {
            const errorMessage = await responseUser.text();
            throw new Error(`Lỗi từ server: ${errorMessage}`);
        }

        if (!responseProperty.ok) {
            const errorMessage = await responseProperty.text();
            throw new Error(`Lỗi từ server: ${errorMessage}`);
        }

        if(!responseTransaction.ok){
            const errorMessage = await responseTransaction.text();
            throw new Error(`Lỗi từ server: ${errorMessage}`);
        }

        //user
        const users = await responseUser.json();
        console.log(users);
        totalCustomer(users);

        //property
        const properties = await responseProperty.json();
        console.log(properties);
        totalProperties(properties)

        //transaction
        const transactions = await responseTransaction.json();
        console.log(transactions);
        totalTransactions(transactions);

    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }



}

function totalCustomer(users) {
    const customerCount = users.filter(user =>
        user.roles.some(role => role.name === 'CUSTOMER')
    ).length;

    const customersElement = document.getElementById('totalCustomers');
    if (customersElement) {
        customersElement.textContent = customerCount;
    } else {
        console.error("Phần tử 'totalCustomers' không tồn tại.");
    }
}

function totalProperties(properties){
    const propertyCount = properties.length;
    const propertyElement = document.getElementById('totalProperties');
    if(propertyElement){
        propertyElement.textContent = propertyCount;
    }else{
        console.error("Phần tử 'totalProperties' không tồn tại");
    }
}

function totalTransactions(transactions){
    const transactionCount = transactions.length;
    const transactionElement = document.getElementById('totalTransactions');
    if(transactionElement){
        transactionElement.textContent = transactionCount;
    }else{
        console.error("Phần tử 'totalTransactions' không tồn tại");
    }
}
window.onload = function (){
    getDashboardData();
    drawTransactionChart();
};