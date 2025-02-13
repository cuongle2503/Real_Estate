async function fetchProperties() {
    // Lấy token từ localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
        alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
        return;
    }

    // Giải mã token JWT để lấy ID người dùng
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    try {
        // Gửi yêu cầu GET với Authorization header chứa token
        const response = await fetch(`http://localhost:8081/api/property/getProperties/${userId}`, {
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

// Hàm để hiển thị dữ liệu bất động sản lên giao diện (ví dụ: sử dụng HTML Table)
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
            
            <td>
                <button type="button" class="btn btn-info ms-2" onclick="showDetailProperty('${property.id}')">Detail</button>
                <button type="button" class="btn btn-danger ms-2" onclick="deleteProperty('${property.id}')">Delete</button>
            </td>
        `;

        propertyTableBody.appendChild(row);
    });
}

async function showDetailProperty(propertyId) {
    const token = localStorage.getItem('authToken');

    console.log(propertyId);
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
        console.log(property.id);

        document.getElementById('updatePropertyName').value = property.name || '';
        document.getElementById('updatePropertyAddress').value = property.address || '';
        document.getElementById('updatePropertyPrice').value = property.price || 0;
        document.getElementById('updatePropertyDescription').value = property.description || '';
        document.getElementById('updatePropertySquares').value = property.squares || '0';
        document.getElementById('updatePropertyRooms').value = property.room || '0';
        document.getElementById('updatePropertyBathrooms').value = property.bathroom || '0';

        const propertyTypeRadio = document.querySelector(`input[name="propertyType"][value="${property.type}"]`);
        if (propertyTypeRadio) {
            propertyTypeRadio.checked = true;
        }

        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
        imagePreviewContainer.innerHTML = '';
        if (property.propertyImages && property.propertyImages.length > 0) {
            property.propertyImages.forEach(image => {
                const img = document.createElement('img');
                img.src = image.images;
                img.alt = 'Property Image';
                img.className = 'img-thumbnail m-1';
                img.style.width = '100px';
                img.style.height = '100px';
                imagePreviewContainer.appendChild(img);
            });
        }


        const updateModal = new bootstrap.Modal(document.getElementById('propertyUpdateModal'));
        updateModal.show();


        document.getElementById('updatePropertyForm').onsubmit = function(event) {
            event.preventDefault(); // Ngăn trang reload
            saveUpdatedProperty(propertyId);
        };

    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
}
async function saveUpdatedProperty(propertyId) {
    const token = localStorage.getItem('authToken');
    // Giải mã token JWT để lấy ID người dùng
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    if (!token) {
        alert("Vui lòng đăng nhập trước khi cập nhật bất động sản.");
        window.location.href = "http://localhost:8081/login";
        return;
    }

    if (!propertyId) {
        console.log('Error: propertyId is null or undefined');
        alert("ID bất động sản không hợp lệ.");
        return;
    }

    console.log('propertyId:', propertyId);

    const updatedProperty = {
        name: document.getElementById('updatePropertyName').value,
        address: document.getElementById('updatePropertyAddress').value,
        price: parseFloat(document.getElementById('updatePropertyPrice').value),
        description: document.getElementById('updatePropertyDescription').value,
        squares: document.getElementById('updatePropertySquares').value,
        room: document.getElementById('updatePropertyRooms').value,
        bathroom: document.getElementById('updatePropertyBathrooms').value,

        type: document.querySelector('input[name="propertyType"]:checked').value,

        propertyImages: [],
        user: userId
    };


    console.log('Updated Property:', updatedProperty);
    console.log('Room:', updatedProperty.room);
    console.log('Bathroom:', updatedProperty.bathroom);
    console.log('Type:', updatedProperty.type);
    const selectedImages = Array.from(document.getElementById('updatePropertyImages').files);

    try {
        const imageUrls = [];

        if (selectedImages.length > 0) {
            for (let file of selectedImages) {
                const formData = new FormData();
                formData.append('files', file);

                const uploadResponse = await fetch('http://localhost:8081/api/propertyimages/create', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    const uploadedUrls = uploadData.map(item => item.images);
                    imageUrls.push(...uploadedUrls);
                } else {
                    alert("Lỗi khi tải ảnh lên.");
                    return;
                }
            }
        }

        updatedProperty.propertyImages = imageUrls;

        const response = await fetch(`http://localhost:8081/api/property/update/${propertyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedProperty)
        });
        const properties = await response.json();
        console.log(properties);
        if (response.ok) {
            alert('Cập nhật bất động sản thành công!');
            fetchProperties();
            const updateModal = bootstrap.Modal.getInstance(document.getElementById('propertyUpdateModal'));
            updateModal.hide();
        } else {
            const errorMessage = await response.text();
            alert('Cập nhật bất động sản thất bại: ' + errorMessage);
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật bất động sản:', error);
        alert('Đã có lỗi xảy ra khi cập nhật bất động sản.');
    }
}




// Function to handle the delete action
function deleteProperty(propertyId) {
    // Gửi yêu cầu xóa đến server
    console.log(propertyId)
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

// Gọi hàm fetchProperties khi trang được tải
window.onload = fetchProperties;
