let allProperties = [];
let filteredProperties = [];
let currentPage = 0;
const pageSize = 6;
let currentFilterType = null;

// Load dữ liệu từ API
async function getPropertyData() {
    try {
        const response = await fetch('http://localhost:8081/api/property/getApproved', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error details: ", errorMessage);
            throw new Error(`Server Error: ${errorMessage}`);
        }

        allProperties = await response.json(); // Lưu toàn bộ dữ liệu
        filteredProperties = allProperties; // Ban đầu không lọc, hiển thị tất cả
        displayProperties(); // Hiển thị dữ liệu trang đầu tiên

        // Hiển thị hoặc ẩn nút phân trang
        togglePaginationButtons();
    } catch (error) {
        alert('Error occurred: ' + error.message);
    }
}

// Hiển thị property theo trang
function displayProperties() {
    const propertyContainer = document.getElementById('propertyContainer');
    propertyContainer.innerHTML = ''; // Xóa nội dung cũ

    // Tính toán các mục cần hiển thị cho trang hiện tại
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const propertiesToDisplay = filteredProperties.slice(start, end);

    propertiesToDisplay.forEach((property, index) => {
        const imageUrl = property.propertyImages.length > 0 ? property.propertyImages[0].images : 'N/A';

        const delays = [0.1, 0.3, 0.5];
        const delay = delays[index % delays.length];

        const propertyHTML = `
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
            <div class="property-item rounded overflow-hidden">
                <div class="position-relative overflow-hidden">
                    <a href="/property-details/${property.id}"><img class="img-fluid" src="${imageUrl}" style="height: 300px" alt=""></a>
                    <div class="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">${property.type === 'Sell' ? 'For Sell' : 'For Rent'}</div>
                    <div class="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">Apartment</div>
                </div>
                <div class="p-4 pb-0">
                    <h5 class="text-primary mb-3">$${property.price}</h5>
                    <a class="d-block h5 mb-2" href="/property-details/${property.id}">${property.name}</a>
                    <p><i class="fa fa-map-marker-alt text-primary me-2"></i>${property.address}</p>
                </div>
                <div class="d-flex border-top">
                    <small class="flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined text-primary me-2"></i>${property.squares} m²</small>
                    <small class="flex-fill text-center border-end py-2"><i class="fa fa-bed text-primary me-2"></i>${property.room} room</small>
                    <small class="flex-fill text-center py-2"><i class="fa fa-bath text-primary me-2"></i>${property.bathroom} bathroom</small>
                </div>
            </div>
        </div>
        `;

        propertyContainer.innerHTML += propertyHTML;
    });
}

// Lọc property theo type
function filterPropertiesByType(type) {
    currentFilterType = type;
    currentPage = 0; // Reset về trang đầu tiên
    filteredProperties = type ? allProperties.filter(property => property.type === type) : allProperties; // Lọc theo type hoặc hiển thị tất cả
    displayProperties();

    // Hiển thị hoặc ẩn nút phân trang
    togglePaginationButtons();
}

// Chuyển sang trang trước
function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        displayProperties();
        togglePaginationButtons();
    }
}

// Chuyển sang trang sau
function nextPage() {
    if ((currentPage + 1) * pageSize < filteredProperties.length) {
        currentPage++;
        displayProperties();
        togglePaginationButtons();
    }
}


function togglePaginationButtons() {
    document.getElementById('prevPageBtn').style.display = currentPage === 0 ? 'none' : 'block';
    document.getElementById('nextPageBtn').style.display = (currentPage + 1) * pageSize >= filteredProperties.length ? 'none' : 'block';
}


document.addEventListener('DOMContentLoaded', () => {
    getPropertyData();

    document.getElementById('showRentBtn').addEventListener('click', () => filterPropertiesByType('Rent'));
    document.getElementById('showSellBtn').addEventListener('click', () => filterPropertiesByType('Sell'));
    document.getElementById('showAllBtn').addEventListener('click', () => filterPropertiesByType(null)); // Hiển thị tất cả
});
