const router = new Router();
let currentUser = null;

function renderHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('token');

  const headerEl = document.getElementById('header');
  headerEl.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#" onclick="router.navigate('/')">
          <img src="images/viettel-logo.24b96913.svg" alt="Viettel">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="header-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button">Sản phẩm</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#/product/2" data-path="/product/1">Chữ ký số từ xa MySign</a></li>
                <li><a class="dropdown-item" href="#/product/1" data-path="/product/2">Hóa đơn điện tử SInvoice</a></li>
                <li><a class="dropdown-item" href="#/product/10" data-path="/product/3">Tendoo - Quản lý bán hàng</a></li>
                <li><a class="dropdown-item" href="#/product/3" data-path="/product/4">VContract - Hợp đồng điện tử</a></li>
              </ul>
            </li>
            <li class="nav-item"><a class="nav-link" href="#/market-place" data-path="/market-place">Chợ ứng dụng</a></li>
            <li class="nav-item"><a class="nav-link" href="#/goi-giai-phap" data-path="/goi-giai-phap">Gói giải pháp</a></li>
            <li class="nav-item"><a class="nav-link" href="#/support" data-path="/support">Hỗ trợ</a></li>
            <li class="nav-item"><a class="nav-link" href="#/news" data-path="/news">Tin Tức</a></li>
            <li class="nav-item"><a class="nav-link" href="#/team" data-path="/team">Giới thiệu nhân viên</a></li>
          </ul>
          <div class="d-flex align-items-center gap-2">
            <button class="header-bell" aria-label="Thông báo">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span class="header-bell-dot"></span>
            </button>
            <span class="header-separator"></span>
            <a href="#/login" class="btn btn-outline-danger btn-sm">Đăng nhập</a>
            <button class="btn btn-danger btn-sm" onclick="router.navigate('/register')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
              Đăng ký
            </button>
            ${isLoggedIn ? `
              <div class="header-user dropdown">
                <div class="avatar dropdown-toggle" data-bs-toggle="dropdown" role="button">${(user?.name || 'U').charAt(0).toUpperCase()}</div>
                <span class="user-name">${user?.name || 'User'}</span>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li><a class="dropdown-item" href="#/profile">Thông tin tài khoản</a></li>
                  <li><a class="dropdown-item" href="#" id="logout-btn">Đăng xuất</a></li>
                </ul>
              </div>
            ` : ``
            }
          </div>
        </div>
      </div>
    </nav>
  `;

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      currentUser = null;
      router.navigate('/');
    });
  }

  updateActiveNav();
}

function renderFooter() {
  const footerEl = document.getElementById('footer');
  footerEl.innerHTML = `
    <div class="footer-inner-card">
      <div class="footer-top-row">
        <a href="https://sme.viettel.vn/" target="_blank" class="footer-logo">
          <img src="images/viettel-logo.24b96913.svg" alt="Viettel">
        </a>
        <a href="http://online.gov.vn/Home/WebDetails/114173" target="_blank" class="footer-bct">
          <img src="images/logoBaoCaoBoCongThuong.png" alt="BCT">
        </a>
        <div class="footer-desc">
          Cơ quan chủ quản: Tổng Công ty Viễn thông Viettel (Viettel Telecom) – Chi nhánh Tập đoàn Công nghiệp – Viễn thông Quân đội - Mã số doanh nghiệp: 0100109106-011 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp lần đầu ngày 18/07/2005
        </div>
      </div>
      <div class="row row-cols-2 row-cols-lg-4 g-4 mx-0">
        <div class="col">
          <div class="footer-col">
            <h4>Khám phá</h4>
            <ul>
              <li><a href="#">Về Viettel</a></li>
              <li><a href="#/market-place">Chợ ứng dụng</a></li>
              <li><a href="#/news">Tin tức</a></li>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="footer-col">
            <h4>Liên hệ</h4>
            <ul>
              <li><a href="https://zalo.me/viettelkhdn" target="_blank">Chat online CSKH</a></li>
              <li><a href="https://viettel.com.vn/" target="_blank">Dành cho đối tác</a></li>
              <li><a href="tel:18008098">Hotline: 1800 8098</a></li>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="footer-col">
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="#/support">Câu hỏi thường gặp</a></li>
              <li><a href="#">Điều khoản sử dụng</a></li>
              <li><a href="#">Điều khoản mua hàng</a></li>
            </ul>
          </div>
        </div>
        <div class="col">
          <div class="footer-col">
            <h4>Theo dõi để nhận khuyến mại</h4>
            <div class="footer-newsletter">
              <input type="email" placeholder="Nhập email của bạn">
              <button onclick="showToast('Đăng ký thành công!', 'success')">Đồng ý</button>
            </div>
            <div class="footer-social">
              <a href="https://www.facebook.com/Vietteltelecom/" target="_blank" aria-label="Facebook"><img src="images/logos_facebook.png" alt="Facebook"></a>
              <a href="https://www.youtube.com/user/Viettelchannels" target="_blank" aria-label="Youtube"><img src="images/logos_ytb.png" alt="Youtube"></a>
              <a href="https://zalo.me/viettelkhdn" target="_blank" aria-label="Zalo"><img src="images/logos_zalo.png" alt="Zalo"></a>
              <a href="https://twitter.com/" target="_blank" aria-label="Twitter"><img src="images/logos_x.png" alt="Twitter"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
}

function updateActiveNav() {
  const currentPath = getHashPath();
  $$('#header-nav .nav-link').forEach(link => {
    const linkPath = link.dataset.path;
    if (linkPath) {
      link.classList.toggle('active', linkPath === currentPath);
    }
  });
}

async function openConsultationModal(productName) {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');

  container.className = 'modal-container consultation-modal';

  let products = ['Khác'];
  try {
    const res = await api.getProducts({ limit: 100 });
    if (res.data && res.data.length) {
      products = res.data.map(p => p.name);
      if (!products.includes('Khác')) products.push('Khác');
    }
  } catch (err) {}

  content.innerHTML = `
    <span class="modal-close" onclick="closeModal()">&times;</span>
    <h2>Nhận tư vấn</h2>
    <p class="modal-subtitle">Vui lòng để lại thông tin, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</p>
    <form class="consultation-form" id="consultation-form" onsubmit="submitConsultationForm(event)">
      <div class="form-group">
        <label>Họ và tên <span style="color:var(--primary)">*</span></label>
        <input type="text" name="name" required placeholder="Nhập họ tên của bạn">
      </div>
      <div class="form-group">
        <label>Số điện thoại <span style="color:var(--primary)">*</span></label>
        <input type="tel" name="phone" required placeholder="Nhập số điện thoại" pattern="[0-9]{10}" maxlength="10" title="Vui lòng nhập đúng 10 chữ số">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" name="email" placeholder="Nhập địa chỉ email">
      </div>
      <div class="form-group">
        <label>Sản phẩm quan tâm</label>
        <select name="product">
          <option value="">-- Chọn sản phẩm --</option>
          ${products.map(p => `
            <option value="${p}" ${p === productName ? 'selected' : ''}>${p}</option>
          `).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Nội dung</label>
        <textarea name="message" rows="3" placeholder="Nhập nội dung bạn muốn tư vấn"></textarea>
      </div>
      <button type="submit" class="btn-submit">Gửi yêu cầu</button>
    </form>
  `;

  overlay.classList.remove('hidden');
  container.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
  document.getElementById('modal-container').classList.add('hidden');
}

function showAdminSuccessDialog(message, callback) {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  container.className = 'modal-container';
  content.innerHTML = `
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:60px;color:#28a745;margin-bottom:20px"><i class="fas fa-check-circle"></i></div>
      <h3 style="font-weight:700;margin-bottom:12px">Thành công!</h3>
      <p style="color:#666;margin-bottom:24px;font-size:15px">${escapeHtml(message)}</p>
      <button class="btn btn-danger" id="admin-success-btn">Đóng</button>
    </div>
  `;
  overlay.classList.remove('hidden');
  container.classList.remove('hidden');
  document.getElementById('admin-success-btn').addEventListener('click', () => {
    closeModal();
    if (typeof callback === 'function') callback();
  });
}

async function submitConsultationForm(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    product: form.product.value,
    message: form.message.value,
  };

  const phone = data.phone;
  if (!/^\d{10}$/.test(phone)) {
    showToast('Số điện thoại phải gồm 10 chữ số.', 'toast-error');
    return;
  }

  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Đang gửi...';

  try {
    await api.submitConsultation(data);
    closeModal();
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer && chatContainer.style.display !== 'none') {
      renderMessage('Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu tư vấn và sẽ liên hệ lại với bạn trong thời gian sớm nhất.', 'bot');
    } else {
      showSuccessDialog();
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Gửi yêu cầu';
    showToast(err.message || 'Gửi yêu cầu thất bại. Vui lòng thử lại sau.', 'error');
  }
}

function showSuccessDialog() {
  const overlay = document.getElementById('modal-overlay');
  const container = document.getElementById('modal-container');
  const content = document.getElementById('modal-content');
  container.className = 'modal-container';
  content.innerHTML = `
    <div style="text-align:center;padding:40px 20px">
      <div style="font-size:60px;color:#28a745;margin-bottom:20px"><i class="fas fa-check-circle"></i></div>
      <h3 style="font-weight:700;margin-bottom:12px">Gửi yêu cầu thành công!</h3>
      <p style="color:#666;margin-bottom:24px;font-size:15px">Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ liên hệ lại trong thời gian sớm nhất.</p>
      <button class="btn btn-danger" onclick="closeModal()">Đóng</button>
    </div>
  `;
  overlay.classList.remove('hidden');
  container.classList.remove('hidden');
}

document.getElementById('modal-overlay').addEventListener('click', closeModal);

router.addRoute('/', (params) => renderHome());
router.addRoute('/goi-giai-phap', (params) => renderSolution());
router.addRoute('/goi-giai-phap/:id', (params) => renderSolutionDetail(parseInt(params.id)));
router.addRoute('/market-place', (params) => renderMarketplace());
router.addRoute('/product/:id', (params) => renderProductDetail(params.id));
router.addRoute('/landing/:alias', (params) => renderLandingPage(params.alias));
router.addRoute('/news', (params) => renderNews());
router.addRoute('/news/:slug', (params) => renderNewsDetail(params.slug));
router.addRoute('/login', (params) => renderLogin());
router.addRoute('/register', (params) => renderRegister());
router.addRoute('/support', (params) => renderSupport());
router.addRoute('/team', (params) => renderTeam());
router.addRoute('/admin', (params) => renderAdmin());

renderHeader();
renderFooter();
router.init();

window.addEventListener('hashchange', updateActiveNav);
