async function fetchProperties() {
    // Lấy token từ localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
        return;
    }

    try {
        // Gửi yêu cầu GET với Authorization header chứa token
        const response = await fetch('http://localhost:8081/api/property/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Gửi token trong header Authorization
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();  // Lấy thông báo lỗi từ server
            throw new Error(errorMessage);
        }

        // Chuyển đổi dữ liệu nhận được thành JSON
        const properties = await response.json();
        console.log(properties);  // Hiển thị thông tin bất động sản

        // Hiển thị thông tin lên giao diện
        displayProperties(properties);
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
}

// Hàm để hiển thị dữ liệu bất động sản lên giao diện
function displayProperties(properties) {
    const propertyTableBody = document.getElementById('propertyTableBody');

    propertyTableBody.innerHTML = '';

    properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    properties.forEach((property, index) => {
        const row = document.createElement('tr');


        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${property.name || 'N/A'}</td>
            <td>${property.address || 'N/A'}</td>
            <td>${property.createdAt}</td>  
            <td>${property.type || 'N/A'}</td>
            <td>${property.price ? property.price.toLocaleString() : 'N/A'}</td>
            <td>${property.approved ? 'Yes' : 'No'}</td>
            <td>${property.user ? property.user.name : 'N/A'}</td>
            
            <td>
                <button type="button" class="btn btn-info ms-2" onclick="showDetailProperty('${property.id}')">Detail</button>
                <button type="button" class="btn btn-success ms-2" onclick="approveProperty('${property.id}')">Approve</button>
                <button type="button" class="btn btn-danger ms-2" onclick="deleteProperty('${property.id}')">Delete</button>
            </td>
        `;

        propertyTableBody.appendChild(row);
    });
}


async function approveProperty(propertyId) {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            window.location.href = "http://localhost:8081/login";
        }

        const response = await fetch(`http://localhost:8081/api/property/approve/${propertyId}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.text();
            window.location.href = "http://localhost:8081/admin/property";
        } else {
            const errorData = await response.text();
            alert('Failed to approve property');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

// Function to handle the delete action
function deleteProperty(propertyId) {
    // Gửi yêu cầu xóa đến server
    fetch(`http://localhost:8081/api/property/delete/${propertyId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        }
    })
        .then(response => {
        if (response.ok) {
            console.log('Property deleted');
            fetchProperties(); // Cập nhật lại bảng sau khi xóa
        } else {
            console.error('Error deleting property');
        }
    })
        .catch(error => console.error('Error deleting property:', error));
}


async function showDetailProperty(propertyId) {
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/api/property/getProperty/${propertyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const property = await response.json();
        document.getElementById('propertyName').textContent = property.name || 'N/A';
        document.getElementById('propertyAddress').textContent = property.address || 'N/A';
        document.getElementById('propertyDescription').textContent = property.description || 'N/A';
        document.getElementById('propertyPrice').textContent = property.price ? property.price.toLocaleString() : 'N/A';
        document.getElementById('propertySquares').textContent = property.squares || 'N/A';
        document.getElementById('propertyRoom').textContent = property.room || 'N/A';
        document.getElementById('propertyBathroom').textContent = property.bathroom || 'N/A';
        document.getElementById('propertyType').textContent = property.type || 'N/A';

        const carouselInner = document.getElementById('carouselInner');
        carouselInner.innerHTML = '';


        if (property.propertyImages && property.propertyImages.length > 0) {
            property.propertyImages.forEach((image, index) => {
                const div = document.createElement('div');
                div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                div.innerHTML = `
                    <img src="${image.images}" class="d-block w-100 rounded" style="max-height: 300px; object-fit: cover;" alt="Property Image ${index + 1}">
                `;
                carouselInner.appendChild(div);
            });
        } else {
            const div = document.createElement('div');
            div.className = 'carousel-item active';
            div.innerHTML = `
                <img src="https://via.placeholder.com/600x400?text=No+Image" class="d-block w-100 rounded" style="max-height: 300px; object-fit: cover;" alt="No Image">
            `;
            carouselInner.appendChild(div);
        }


        const propertyModal = new bootstrap.Modal(document.getElementById('propertyDetailModal'));
        propertyModal.show();
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
}



// Gọi hàm fetchProperties khi trang được tải
window.onload = fetchProperties;
