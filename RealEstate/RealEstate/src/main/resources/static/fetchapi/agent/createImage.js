document.getElementById('propertyImageForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Ngăn chặn gửi form mặc định

    // Lấy token từ localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Vui lòng đăng nhập trước khi tải ảnh.");
        window.location.href = "http://localhost:8081/login";
        return;
    }

    // Lấy file từ input
    const fileInput = document.getElementById('propertyImages');
    if (!fileInput || fileInput.files.length === 0) {
        alert('Vui lòng chọn ít nhất một ảnh để tải lên.');
        return;
    }

    // Tạo FormData để gửi file
    const formData = new FormData();
    formData.append('file', fileInput.files[0]); // Key 'file' phải giống key trên API

    try {
        // Gửi yêu cầu upload ảnh
        const response = await fetch('http://localhost:8081/api/propertyimages/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // Thêm token để xác thực
            },
            body: formData // FormData chứa file
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const propertyImageResponse = await response.json(); // Phản hồi trả về URL ảnh
        alert('Tải ảnh thành công!');
        console.log('Ảnh đã tải lên:', propertyImageResponse.images);

        // Có thể lưu URL trả về vào một mảng để gửi kèm khi tạo bất động sản
        const uploadedImageUrl = propertyImageResponse.images;
        console.log('URL ảnh tải lên:', uploadedImageUrl);
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
});
