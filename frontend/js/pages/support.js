
// SUPPORT PAGE

function renderSupport() {
  const mainContent = document.getElementById('main-content');

  mainContent.innerHTML = `
    <div class="support-page">
      <div class="container">
        <div class="support-header">
          <h1>Trung tâm hỗ trợ</h1>
          <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
        </div>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col">
            <div class="support-card">
              <div class="icon"><i class="fas fa-question-circle"></i></div>
              <h3>Câu hỏi thường gặp</h3>
              <p>Tổng hợp các câu hỏi và giải đáp từ khách hàng</p>
            </div>
          </div>
          <div class="col">
            <div class="support-card">
              <div class="icon"><i class="fas fa-file-alt"></i></div>
              <h3>Tài nguyên</h3>
              <p>Bộ cài, phần mềm hỗ trợ trong quá trình sử dụng</p>
            </div>
          </div>
          <div class="col">
            <div class="support-card">
              <div class="icon"><i class="fas fa-headset"></i></div>
              <h3>Liên hệ hỗ trợ</h3>
              <p>Hotline: 1800 8091 - CSKH 24/7</p>
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h2>Câu hỏi thường gặp</h2>
          <div class="accordion" id="faq-accordion">
            ${renderFAQs()}
          </div>
        </div>
      </div>
    </div>
  `;

  loadFAQs();
}

function renderFAQs(items) {
  const faqs = items || [
    { question: 'Làm thế nào để đăng ký sử dụng dịch vụ?', answer: 'Bạn có thể đăng ký trực tiếp trên website SME HUB bằng cách chọn sản phẩm mong muốn và nhấn "Mua ngay" hoặc "Nhận tư vấn".' },
    { question: 'Thời gian xử lý đơn hàng trong bao lâu?', answer: 'Sau khi đăng ký thành công, đơn hàng của bạn sẽ được xử lý trong vòng 24 giờ làm việc. Bạn sẽ nhận được thông báo qua email và điện thoại.' },
    { question: 'Tôi có thể hủy đơn hàng không?', answer: 'Có, bạn có thể hủy đơn hàng trong vòng 24 giờ sau khi đặt hàng. Vui lòng liên hệ CSKH 1800 8091 để được hỗ trợ.' },
    { question: 'Các hình thức thanh toán nào được hỗ trợ?', answer: 'Chúng tôi hỗ trợ thanh toán qua chuyển khoản ngân hàng, thẻ tín dụng, ví điện tử và thanh toán tại quầy.' },
    { question: 'Làm sao để tra cứu hóa đơn điện tử?', answer: 'Bạn có thể tra cứu hóa đơn điện tử tại mục "Hóa đơn" trong tài khoản của bạn trên SME HUB hoặc qua ứng dụng vInvoice.' },
  ];
  return faqs.map((faq, i) => `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-${i}">
          ${faq.question}
        </button>
      </h2>
      <div id="faq-${i}" class="accordion-collapse collapse" data-bs-parent="#faq-accordion">
        <div class="accordion-body">${faq.answer}</div>
      </div>
    </div>
  `).join('');
}

async function loadFAQs() {
  try {
    const result = await api.getFAQs();
    if (result.data?.length) {
      document.getElementById('faq-accordion').innerHTML = renderFAQs(result.data);
    }
  } catch (err) {
    console.log('FAQs loaded from static fallback');
  }
}


