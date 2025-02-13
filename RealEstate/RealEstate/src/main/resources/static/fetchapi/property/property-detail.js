async function getPropertyData() {
    try {
        // Lấy URL hiện tại
        const currentUrl = window.location.href;

        // Tách phần `propertyId` từ URL
        const urlParts = currentUrl.split("/");
        const propertyId = urlParts[urlParts.length - 1]; // Lấy đoạn cuối là ID

        if (!propertyId) {
            throw new Error("Không tìm thấy propertyId trong URL.");
        }

        // Gửi yêu cầu GET tới API
        const response = await fetch(`http://localhost:8081/api/property/getProperty/${propertyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error details: ", errorMessage); // Log lỗi từ server
            throw new Error(`Lỗi từ server: ${errorMessage}`);
        }

        // Chuyển đổi dữ liệu nhận được thành JSON
        const property = await response.json();
        console.log(property); // Hiển thị thông tin property để kiểm tra

        // Hiển thị thông tin lên giao diện
        displayProperty(property);
    } catch (error) {
        alert("Có lỗi xảy ra: " + error.message);
    }
}

// Hàm hiển thị thông tin chi tiết Property lên giao diện
function displayProperty(property) {
    const propertyContainer = document.getElementById("propertyDetail");

    // Làm rỗng container trước khi thêm nội dung mới
    propertyContainer.innerHTML = "";

    // Lấy hình ảnh đầu tiên (nếu có)
    const imageUrl = property.propertyImages?.[0]?.images || "img/property-1.jpg";

    // Tạo nội dung HTML
    const propertyHTML = `
        <div class="row g-5 align-items-center">
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                    <div class="about-img position-relative overflow-hidden p-5 pe-0">
                        <div id="propertyCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${property.propertyImages.map((image, index) => `
                                    <div class="carousel-item  ${index === 0 ? 'active' : ''}">
                                        <img src="${image.images}" class="d-block w-100 rounded" style="max-height: 300px; object-fit: cover;" alt="Property Image ${index + 1}">
                                    </div>
                                `).join('')}
                                
                            </div>
                            <!-- Carousel Controls -->
                            <button class="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev" style="z-index: 10;">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next" style="z-index: 10;">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                </div>     
                
                <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                    <h1 class="mb-4" style="color: #00B98E">$ ${property.price}</h1>
                    <h2 class="mb-4" style="color: #0E2E50"> ${property.name}</h2>
                    <p style="font-size: larger"><i class="fa fa-map-marker-alt text-primary me-2"></i>${property.address}</p>
                    
                    <p style="font-size: larger"><i class="fa fa-ruler-combined text-primary me-2"></i>${property.squares} m²</p>
                    <p style="font-size: larger"><i class="fa fa-bed text-primary me-2"></i>${property.room} room</p>
                    <p style="font-size: larger"><i class="fa fa-bath text-primary me-2"></i>${property.bathroom} bathroom</p>
                    <a href="javascript:void(0)" class="btn btn-dark py-3 px-4" id="makeAppointmentButton">
                      <i class="fa fa-calendar-alt me-2"></i>Make Appointment
                    </a>                
                </div>
        </div>
            <div class="row g-5 align-items-center">
                 <div class="row g-5 justify-content-between gy-4 mt-4">
            <div class="col-lg-8" data-aos="fade-up">
              <div class="portfolio-description">
                <h2 style="margin-left: 10px"></h2>
                <p style="margin-left: 10px; border: 2px solid #ccc; border-radius: 10px; padding: 20px; 
                            background-color: #f5f5f5; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
                            font-size: 1.2rem; line-height: 1.6;
                            overflow-y: auto; ">
                  ${property.description}
                </p>

                <div class="testimonial-item">
                  <p></p>
                  <div>
                    <img
                      src="/admin/img/avatar.jpg"
                      class="testimonial-img"
                      alt=""
                      style="width: 70px;
                            border-radius: 50%;
                            border: 6px solid #ccc;
                            float: left;
                            margin: 0 10px 0 0;"
                    />
                    <h3 style="margin-left: 10px">${property.user.name}</h3>
                    <h4 style="margin-left: 10px">Agent</h4>
                  </div>
                </div>
              </div>
             

              <!-- Tab Content -->
              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="real-estate-2-tab1"
                ></div>
                <!-- End Tab 1 Content -->

                <div class="tab-pane fade" id="real-estate-2-tab2">
                  <img
                    src="assets/img/floor-plan.jpg"
                    alt=""
                    class="img-fluid"
                  />
                </div>
                <!-- End Tab 2 Content -->

                <div class="tab-pane fade" id="real-estate-2-tab3">
                  <iframe
                    style="border: 0; width: 100%; height: 400px"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
                    frameborder="0"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <!-- End Tab 3 Content -->
              </div>
              <!-- End Tab Content -->
            </div>

            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">

            </div>
          </div>

            </div>
    `;

    // Thêm nội dung vào container
    propertyContainer.innerHTML = propertyHTML;
    const makeAppointmentButton = document.getElementById('makeAppointmentButton');
    makeAppointmentButton.addEventListener("click", () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('Token không hợp lệ hoặc không tồn tại. Bạn cần đăng nhập.');
            window.location.href = "/login";
        } else {
            const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
            appointmentModal.show();
        }


    });
    const submitAppoitmentButton =  document.getElementById('submitAppointment');
    submitAppoitmentButton.addEventListener("click", async() => {
        const descriptionInput = document.getElementById('appointmentDescription').value;
        const token = localStorage.getItem('authToken');
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        console.log(decodedToken.userId);
        console.log(descriptionInput);


        try{
            const currentUrl = window.location.href;
            const urlParts = currentUrl.split("/");
            const propertyId = urlParts[urlParts.length - 1];

            console.log(propertyId);
            const request = {
                description: descriptionInput,
                property: propertyId,
                user: userId
            }
            const response = await fetch("http://localhost:8081/api/transaction/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(request),
            });

            if(!response.ok){
                const errorMessage = await response.text();
                console.error("Error: ", errorMessage);
                throw new Error(`Lỗi từ server: ${errorMessage}`);
            }
            const result = await response.json();
            console.log("Transaction Result:", result);
            console.log("Status: ", result.id);
            console.log(result.status);
            // console.log(result.transactionPlace);
            // Hiển thị thông báo trong chat sau khi giao dịch được tạo
            addChatMessage("customer", descriptionInput);
            addChatMessage("agent", "Cảm ơn bạn vì đã liên hệ! Agent của chúng tôi sẽ trả lời trong thời gian sớm nhất.");


        }catch (error) {
            console.error("Error:", error.message);
            alert("Có lỗi xảy ra khi gửi cuộc hẹn: " + error.message);
        }


    })
}
// Hàm để lưu tin nhắn vào localStorage
function saveChatMessage(propertyId, sender, message, userId) {
    // Tạo key lưu trữ tin nhắn theo propertyId và userId
    const storageKey = `${propertyId}_${userId}`;

    // Lấy tin nhắn đã lưu theo propertyId và userId từ localStorage
    let propertyMessages = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Thêm tin nhắn mới
    propertyMessages.push({ sender: sender, message: message });

    // Lưu lại vào localStorage theo propertyId và userId
    localStorage.setItem(storageKey, JSON.stringify(propertyMessages));
}



// Hàm để hiển thị lại các tin nhắn khi tải lại trang
function loadChatMessages() {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    const propertyId = urlParts[urlParts.length - 1]; // Lấy `propertyId` từ URL

    const chatBox = document.getElementById("chatMessages");

    // Lấy token người dùng từ localStorage để lấy userId
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Token không hợp lệ hoặc không tồn tại.');
        return;
    }

    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    // Lấy tin nhắn từ localStorage theo `propertyId` và `userId`
    const storageKey = `${propertyId}_${userId}`;
    let propertyMessages = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Hiển thị các tin nhắn
    propertyMessages.forEach(msg => {
        const chatMessage = document.createElement("div");
        chatMessage.style.marginBottom = "15px";
        chatMessage.style.display = "flex";

        if (msg.sender === "customer") {
            chatMessage.style.justifyContent = "flex-end"; // Customer bên phải
            chatMessage.innerHTML = `<span style="background-color: #00B98E; color: white; padding: 10px; border-radius: 10px; max-width: 80%; word-wrap: break-word;">${msg.message}</span>`;
        } else if (msg.sender === "agent") {
            chatMessage.style.justifyContent = "flex-start"; // Agent bên trái
            chatMessage.innerHTML = `<span style="background-color: #ccc; padding: 10px; border-radius: 10px; max-width: 80%; word-wrap: break-word;">${msg.message}</span>`;
        }

        chatBox.appendChild(chatMessage);
    });

    // Cuộn xuống cuối khung chat
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Hàm để thêm tin nhắn vào khung chat và lưu vào localStorage
function addChatMessage(sender, message) {
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split("/");
    const propertyId = urlParts[urlParts.length - 1];

    // Lấy token người dùng từ localStorage để lấy userId
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('Token không hợp lệ hoặc không tồn tại.');
        return;
    }

    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    const chatBox = document.getElementById("chatMessages");
    const placeholder = document.getElementById("chatPlaceholder");

    const chatMessage = document.createElement("div");
    chatMessage.style.marginBottom = "15px";
    chatMessage.style.display = "flex";

    if (sender === "customer") {
        chatMessage.style.justifyContent = "flex-end";
        chatMessage.innerHTML = `<span style="background-color: #00B98E; color: white; padding: 10px; border-radius: 10px; max-width: 80%; word-wrap: break-word;">${message}</span>`;
    } else if (sender === "agent") {
        chatMessage.style.justifyContent = "flex-start";
        chatMessage.innerHTML = `<span style="background-color: #ccc; padding: 10px; border-radius: 10px; max-width: 80%; word-wrap: break-word;">${message}</span>`;
    }

    chatBox.appendChild(chatMessage);

    if (placeholder) {
        placeholder.style.display = "none";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    saveChatMessage(propertyId, sender, message, userId);


    document.getElementById("appointmentDescription").value = '';
}

async function checkAndUpdateTransactionStatus() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error("Không tìm thấy token.");
        return;
    }

    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    try {
        // Lấy propertyId từ URL
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split("/");
        const propertyId = urlParts[urlParts.length - 1]; // `propertyId` từ URL hiện tại

        // Gọi API lấy danh sách giao dịch của user
        const response = await fetch(`http://localhost:8081/api/transaction/getByUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error details:", errorMessage);
            return;
        }

        const transactions = await response.json();

        // Lọc giao dịch liên quan đến `propertyId` hiện tại
        const approvedTransactions = transactions.filter(
            transaction => transaction.property.id === propertyId
        );

        for (const transaction of approvedTransactions) {
            const transactionKey = `messageSent_${transaction.id}`; // Key riêng cho từng transaction

            // Kiểm tra xem đã gửi tin nhắn cho giao dịch này chưa
            if (transaction.status === true && !localStorage.getItem(transactionKey)) {
                // Gửi tin nhắn
                addChatMessage(
                    "agent",
                    `Chào bạn! Hẹn gặp bạn ở ${transaction.transactionPlace} để bàn chi tiết nhé!`
                );
                console.log(`Đã gửi tin nhắn cho transaction ID: ${transaction.id}`);
                // Lưu trạng thái tin nhắn cho giao dịch này
                localStorage.setItem(transactionKey, 'true');
            }
        }


        console.log("Hoàn tất kiểm tra các giao dịch.");
    } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái giao dịch:", error);
    }
}


// Gọi hàm khi trang được tải
window.onload = function() {
    getPropertyData();
    checkAndUpdateTransactionStatus();
    loadChatMessages();
};

