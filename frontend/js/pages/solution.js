const solutions = [
  { id: 1, name: 'GIẢI PHÁP QUẢN TRỊ TOÀN DIỆN – 1OFFICE', start: 1, end: 5 },
  { id: 2, name: 'GIẢI PHÁP QRCODE VIETTEL', start: 6, end: 15 },
  { id: 3, name: 'GIẢI PHÁP RFID', start: 16, end: 19 },
  { id: 4, name: 'GIẢI PHÁP QUẢN LÝ NĂNG SUẤT', start: 20, end: 24 },
  { id: 5, name: 'DMS KÊNH PHÂN PHỐI', start: 25, end: 26 },
  { id: 6, name: 'DỊCH VỤ KHÁCH HÀNG', start: 27, end: 27 },
  { id: 7, name: 'HẠ TẦNG VIỄN THÔNG', start: 28, end: 28 },
  { id: 8, name: 'LOGISTICS – VIETTELPOST', start: 29, end: 29 },
  { id: 9, name: 'NĂNG LƯỢNG MẶT TRỜI', start: 30, end: 30 },
];

function imgPath(num) {
  return `images/solu/02.2026 VIETTEL GIAI PHAP CHUYEN DOI SO DOANH NGHIEP_smallpdf_${num}.jpg`;
}

function getImages(sol) {
  const imgs = [];
  for (let i = sol.start; i <= sol.end; i++) imgs.push(imgPath(i));
  return imgs;
}

function renderSolution() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="solution-page">
      <div class="container">
        <h2 class="solution-page-title">Gói giải pháp</h2>
        <p class="solution-page-subtitle">Khám phá các giải pháp số toàn diện từ Viettel</p>
        <div class="solution-grid">
          ${solutions.map(s => `
            <div class="solution-card" onclick="renderSolutionDetail(${s.id})">
              <div class="solution-card-top">
                <span class="solution-card-num">${String(s.id).padStart(2, '0')}</span>
              </div>
              <div class="solution-card-name">${s.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

function renderSolutionDetail(id) {
  const sol = solutions.find(s => s.id === id);
  if (!sol) { router.navigate('/goi-giai-phap'); return; }

  const images = getImages(sol);
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="solution-detail">
      <div class="solution-detail-head">
        <div class="container">
          <button class="solution-back-btn" onclick="renderSolution()">
            <i class="fas fa-arrow-left"></i> Quay lại danh sách
          </button>
          <h2 class="solution-detail-title">${sol.name}</h2>
        </div>
      </div>
      <div class="solution-detail-body">
        <div class="container">
          ${images.map(src => `
            <div class="solution-img-wrap">
              <img src="${src}" alt="${sol.name}" loading="lazy" onerror="this.parentElement.style.display='none'">
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
  initScrollReveal();
};

function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.solution-img-wrap').forEach(el => observer.observe(el));
}
