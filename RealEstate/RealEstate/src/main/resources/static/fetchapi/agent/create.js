document.getElementById('propertyForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Ngăn việc gửi form mặc định

    // Lấy token từ localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Vui lòng đăng nhập trước khi tạo bất động sản.");
        window.location.href = "http://localhost:8081/login";
        return;
    }

    // Giải mã token JWT để lấy ID người dùng
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    const role = decodedToken.scope;

    if (!role.includes("ROLE_AGENT")) {
        window.location.href = "http://localhost:8081/login";
        return;
    }

    const selectedImages = Array.from(document.getElementById('propertyImages').files); // Lấy ảnh từ input file
    const propertyRequest = {
        name: document.getElementById('propertyName').value,
        address: document.getElementById('propertyAddress').value,
        description: document.getElementById('propertyDescription').value,
        price: parseFloat(document.getElementById('propertyPrice').value),
        squares: document.getElementById('squares').value,
        room: document.getElementById('room').value,
        bathroom: document.getElementById('bathroom').value,

        type: document.querySelector('input[name="propertyType"]:checked').value,

        propertyImages: [],
        user: userId
    };

    try {
        const images = [];

        // Lặp qua tất cả các file đã chọn
        for (let file of selectedImages) {
            const formData = new FormData();
            formData.append('files', file);

            // Gửi yêu cầu upload ảnh lên server
            const uploadResponse = await fetch('http://localhost:8081/api/propertyimages/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (uploadResponse.ok) {
                const uploadData = await uploadResponse.json();

                // Chuyển đổi từ mảng đối tượng [{ images: url }] thành mảng chuỗi [url, url]
                const imageUrls = uploadData.map(item => item.images); // Lấy tất cả URL ảnh từ mảng đối tượng

                // Thêm các URL ảnh vào mảng images
                images.push(...imageUrls);
            } else {
                alert("Lỗi khi tải ảnh lên.");
                return;
            }
        }


        propertyRequest.propertyImages = images;


        const response = await fetch('http://localhost:8081/api/property/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(propertyRequest)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        const propertyResponse = await response.json();
        alert('Tạo bất động sản thành công!');
        console.log(propertyResponse);

        window.location.href = "http://localhost:8081/agent/create";
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
});
