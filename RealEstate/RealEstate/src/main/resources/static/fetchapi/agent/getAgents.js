async function getAgents() {
    try {
        const response = await fetch(`http://localhost:8081/api/user/getAgents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();  // Lấy thông báo lỗi từ server
            throw new Error(errorMessage);
        }

        // Chuyển đổi dữ liệu nhận được thành JSON
        const agents = await response.json();
        console.log(agents);  // Hiển thị thông tin agent

        // Hiển thị thông tin lên giao diện
        displayAgent(agents);
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error.message);
    }
}


function displayAgent(agents) {  // Chỉnh sửa đối số thành agents để match với data trả về
    const agentBody = document.getElementById('agentBody');
    agentBody.innerHTML = '';  // Xóa nội dung cũ

    agents.forEach((agent, index) => {
        const delays = [0.1, 0.3, 0.5];
        const delay = delays[index % delays.length];

        const agentHTML = `
            <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="${delay}s">
              <div class="team-item rounded overflow-hidden">
                <div class="position-relative">
                  <img class="img-fluid" src="/admin/img/avatar.jpg" alt="${agent.name}" />
                  <div
                    class="position-absolute start-50 top-100 translate-middle d-flex align-items-center"
                  >
                    <a class="btn btn-square mx-1" href="${agent.facebook || '#'}"><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-square mx-1" href="${agent.twitter || '#'}"><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-square mx-1" href="${agent.instagram || '#'}"><i class="fab fa-instagram"></i></a>
                  </div>
                </div>
                <div class="text-center p-4 mt-3">
                  <h5 class="fw-bold mb-0">${agent.name}</h5>
                  <small>${agent.email}</small>
                </div>
              </div>
            </div>
        `;
        agentBody.innerHTML += agentHTML;
    });
}
window.onload = function() {
    getAgents();
};
