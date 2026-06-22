// ============================================
// NEWS PAGE
// ============================================

let newsState = {
  articles: [],
  currentPage: 1,
  pageSize: 9,
  total: 0,
};

function renderNews() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="news-page">
      <div class="container">
        <div class="marketplace-header">
          <h1>Tin tức</h1>
          <p>Cập nhật tin tức, sự kiện và khuyến mãi mới nhất từ Viettel</p>
        </div>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" id="news-grid">
          ${generateNewsSkeleton()}
        </div>
        <nav><ul class="pagination justify-content-center" id="news-pagination"></ul></nav>
      </div>
    </div>
  `;
  loadNews();
}

function generateNewsSkeleton() {
  const news = [
    { title: 'Chương trình quay số may mắn dành cho chủ shop dùng Viettel Tendoo', date: '2026-05-15', desc: 'Hưởng ứng ngày hội chuyển đổi số quốc gia, Viettel Telecom triển khai chương trình quay số may mắn...' },
    { title: 'Giải pháp chuyển đổi số toàn diện cho doanh nghiệp SME', date: '2026-05-10', desc: 'Viettel ra mắt hệ sinh thái số giúp doanh nghiệp vừa và nhỏ tối ưu hoạt động...' },
    { title: 'Viettel CA đạt mốc 1 triệu khách hàng doanh nghiệp', date: '2026-04-28', desc: 'Dịch vụ chữ ký số Viettel CA chính thức cán mốc 1 triệu khách hàng doanh nghiệp...' },
    { title: 'Hướng dẫn sử dụng hóa đơn điện tử vInvoice', date: '2026-04-20', desc: 'Các bước cơ bản để bắt đầu sử dụng hóa đơn điện tử vInvoice cho doanh nghiệp...' },
    { title: 'Tendoo ra mắt tính năng AI hỗ trợ bán hàng', date: '2026-04-15', desc: 'Nền tảng quản lý bán hàng Tendoo cập nhật tính năng trợ lý AI thông minh...' },
    { title: 'Bảo mật thông tin doanh nghiệp trong thời đại số', date: '2026-04-08', desc: 'Các giải pháp an ninh mạng giúp bảo vệ dữ liệu doanh nghiệp hiệu quả...' },
  ];
  newsState.total = news.length;
  newsState.articles = news;

  return news.map(item => `
    <div class="col">
      <div class="news-card" onclick="router.navigate('/news/${slugify(item.title)}')">
        <div class="thumb">
          <i class="fas fa-newspaper"></i>
        </div>
        <div class="body">
          <div class="date"><i class="far fa-calendar-alt"></i> ${formatDate(item.date)}</div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      </div>
    </div>
  `).join('');
}

async function loadNews() {
  try {
    const result = await api.getNews({ page: newsState.currentPage, limit: newsState.pageSize });
    if (result.data?.length) {
      newsState.articles = result.data;
      newsState.total = result.total || result.data.length;
      renderNewsGrid();
      renderNewsPagination();
    }
  } catch (err) {
    console.log('News loaded from static fallback');
  }
}

function renderNewsGrid() {
  const grid = document.getElementById('news-grid');
  grid.innerHTML = newsState.articles.map(item => `
    <div class="col">
      <div class="news-card" onclick="router.navigate('/news/${slugify(item.title)}')">
        <div class="thumb">
          ${item.image ? `<img src="${item.image}" alt="${item.title}" style="width:100%;height:100%;object-fit:cover">` : `<i class="fas fa-newspaper"></i>`}
        </div>
        <div class="body">
          <div class="date"><i class="far fa-calendar-alt"></i> ${formatDate(item.created_at || item.date)}</div>
          <h3>${item.title}</h3>
          <p>${item.short_description || item.desc || ''}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderNewsPagination() {
  const container = document.getElementById('news-pagination');
  const totalPages = Math.ceil(newsState.total / newsState.pageSize);
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `<li class="page-item ${newsState.currentPage === 1 ? 'disabled' : ''}"><button class="page-link" onclick="goNewsPage(${newsState.currentPage - 1})"><i class="fas fa-chevron-left"></i></button></li>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${i === newsState.currentPage ? 'active' : ''}"><button class="page-link" onclick="goNewsPage(${i})">${i}</button></li>`;
  }
  html += `<li class="page-item ${newsState.currentPage === totalPages ? 'disabled' : ''}"><button class="page-link" onclick="goNewsPage(${newsState.currentPage + 1})"><i class="fas fa-chevron-right"></i></button></li>`;
  container.innerHTML = html;
}

function goNewsPage(page) {
  const totalPages = Math.ceil(newsState.total / newsState.pageSize);
  if (page < 1 || page > totalPages) return;
  newsState.currentPage = page;
  loadNews();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
