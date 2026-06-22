let adminTab = 'users';

function renderAdmin() {
  document.body.classList.add('admin-mode');
  const mainContent = document.getElementById('main-content');
  const token = localStorage.getItem('admin_token');

  if (!token) {
    renderAdminLogin(mainContent);
    return;
  }

  mainContent.innerHTML = `
    <div class="admin-page">
      <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="admin-title mb-0">Quản trị hệ thống</h1>
          <button class="btn btn-outline-danger btn-sm" onclick="handleAdminLogout()">Đăng xuất</button>
        </div>

        <ul class="nav nav-tabs admin-tabs mb-4" id="admin-tabs">
          <li class="nav-item">
            <button class="nav-link ${adminTab === 'users' ? 'active' : ''}" data-tab="users">
              <i class="fas fa-users"></i> Tài khoản
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link ${adminTab === 'consultations' ? 'active' : ''}" data-tab="consultations">
              <i class="fas fa-headset"></i> Tư vấn
            </button>
          </li>
          <li class="nav-item">
            <button class="nav-link ${adminTab === 'products' ? 'active' : ''}" data-tab="products">
              <i class="fas fa-box"></i> Sản phẩm
            </button>
          </li>
        </ul>

        <div id="admin-content">
          <div class="text-center py-5">
            <div class="spinner-border text-danger" role="status"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  $$('.admin-tabs .nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.admin-tabs .nav-link').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      adminTab = btn.dataset.tab;
      renderAdminContent();
    });
  });

  renderAdminContent();
}

function renderAdminLogin(container) {
  document.body.classList.add('admin-mode');
  container.innerHTML = `
    <div class="admin-page">
      <div class="container mt-4" style="max-width:480px">
        <h1 class="admin-title text-center mb-4">Đăng nhập quản trị</h1>
        <form id="admin-login-form">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" id="admin-email" placeholder="admin@sme.vn" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" id="admin-password" placeholder="•••••••" required>
          </div>
          <div id="admin-login-error" class="alert alert-danger d-none"></div>
          <button type="submit" class="btn btn-danger w-100">Đăng nhập</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const errorEl = document.getElementById('admin-login-error');
    errorEl.classList.add('d-none');
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Đang đăng nhập...';

    try {
      const res = await api.adminLogin({ email, password });
      localStorage.setItem('admin_token', res.token);
      localStorage.setItem('admin_user', JSON.stringify(res.user));
      renderAdmin();
    } catch (err) {
      errorEl.textContent = err.message || 'Đăng nhập thất bại';
      errorEl.classList.remove('d-none');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Đăng nhập';
    }
  });
}

function handleAdminLogout() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_user');
  document.body.classList.remove('admin-mode');
  adminTab = 'users';
  renderAdmin();
}

function renderAdminContent() {
  const container = document.getElementById('admin-content');
  container.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-danger" role="status"></div></div>';

  if (adminTab === 'users') {
    loadAdminUsers(container);
  } else if (adminTab === 'consultations') {
    loadAdminConsultations(container);
  } else {
    loadAdminProducts(container);
  }
}

async function loadAdminUsers(container) {
  try {
    const users = await api.getAdminUsers();
    const list = Array.isArray(users) ? users : [];
    container.innerHTML = `
      <div class="admin-table-wrap">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Tổng số: <strong>${list.length}</strong> tài khoản</span>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Ngày sinh</th>
                <th>Địa chỉ</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              ${list.length ? list.map((u, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${escapeHtml(u.name)}</td>
                  <td>${escapeHtml(u.email)}</td>
                  <td>${escapeHtml(u.phone || '—')}</td>
                  <td>${u.birthdate ? formatDate(u.birthdate) : '—'}</td>
                  <td>${escapeHtml(u.address || '—')}</td>
                  <td>${formatDate(u.created_at)}</td>
                </tr>
              `).join('') : `
                <tr><td colspan="7" class="text-center text-muted py-4">Chưa có tài khoản nào.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = '<div class="alert alert-danger">Không thể tải danh sách tài khoản.</div>';
  }
}

async function loadAdminConsultations(container) {
  try {
    const consultations = await api.getAdminConsultations();
    const list = Array.isArray(consultations) ? consultations : [];
    container.innerHTML = `
      <div class="admin-table-wrap">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Tổng số: <strong>${list.length}</strong> yêu cầu</span>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Họ tên</th>
                <th>SĐT</th>
                <th>Email</th>
                <th>Sản phẩm</th>
                <th>Nội dung</th>
                <th>Trạng thái</th>
                <th>Ngày gửi</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              ${list.length ? list.map((c, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${escapeHtml(c.name)}</td>
                  <td>${escapeHtml(c.phone)}</td>
                  <td>${escapeHtml(c.email || '—')}</td>
                  <td>${escapeHtml(c.product || '—')}</td>
                  <td class="text-truncate" style="max-width:200px" title="${escapeHtml(c.message || '')}">${escapeHtml(c.message || '—')}</td>
                  <td>${statusBadgeHtml(c.status)}</td>
                  <td>${formatDate(c.created_at)}</td>
                  <td>
                    <div class="d-flex gap-1">
                      ${c.status !== 'contacted' ? `<button class="btn btn-sm btn-outline-primary" onclick="updateConsultationStatus(${c.id}, 'contacted')">Đã liên hệ</button>` : ''}
                      ${c.status !== 'closed' ? `<button class="btn btn-sm btn-outline-secondary" onclick="updateConsultationStatus(${c.id}, 'closed')">Đóng</button>` : ''}
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr><td colspan="9" class="text-center text-muted py-4">Chưa có yêu cầu tư vấn nào.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = '<div class="alert alert-danger">Không thể tải danh sách yêu cầu tư vấn.</div>';
  }
}

function statusBadgeHtml(status) {
  const map = {
    pending: '<span class="badge bg-warning text-dark">Chờ xử lý</span>',
    contacted: '<span class="badge bg-info text-white">Đã liên hệ</span>',
    closed: '<span class="badge bg-secondary">Đã đóng</span>',
  };
  return map[status] || escapeHtml(status);
}

async function updateConsultationStatus(id, status) {
  try {
    await api.updateConsultationStatus(id, status);
    showAdminSuccessDialog('Cập nhật trạng thái thành công!', renderAdminContent);
  } catch (err) {
    showToast('Cập nhật thất bại!', 'error');
  }
}

// ============================================
// ADMIN — Product Management
// ============================================

let editingProductId = null;
let managingProductId = null;

async function loadAdminProducts(container) {
  try {
    const res = await api.getAdminProducts();
    const list = Array.isArray(res.data) ? res.data : [];
    const cats = await api.getCategories();
    const categories = Array.isArray(cats) ? cats : [];

    container.innerHTML = `
      <div class="admin-table-wrap">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Tổng số: <strong>${list.length}</strong> sản phẩm</span>
          <button class="btn btn-danger btn-sm" onclick="showAddProductForm()"><i class="fas fa-plus"></i> Thêm sản phẩm</button>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Developer</th>
                <th>Nổi bật</th>
                <th>Đánh giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              ${list.length ? list.map((p, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td><strong>${escapeHtml(p.name)}</strong></td>
                  <td>${escapeHtml(p.category_name || '—')}</td>
                  <td>${escapeHtml(p.developer || '—')}</td>
                  <td>${p.is_featured ? '<span class="badge bg-danger">Nổi bật</span>' : '<span class="badge bg-light text-muted">Thường</span>'}</td>
                  <td>${p.rating || '—'}</td>
                  <td>
                    <div class="d-flex gap-1 flex-wrap">
                      <button class="btn btn-sm btn-outline-primary" onclick="showEditProductForm(${p.id})"><i class="fas fa-edit"></i> Sửa</button>
                      <button class="btn btn-sm btn-outline-info" onclick="showProductDetailManager(${p.id})"><i class="fas fa-cog"></i> Chi tiết</button>
                      <button class="btn btn-sm btn-outline-danger" onclick="handleDeleteProduct(${p.id})"><i class="fas fa-trash"></i> Xoá</button>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr><td colspan="7" class="text-center text-muted py-4">Chưa có sản phẩm nào.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = '<div class="alert alert-danger">Không thể tải danh sách sản phẩm.</div>';
  }
}

async function showAddProductForm() {
  editingProductId = null;
  await renderProductForm(null);
}

async function showEditProductForm(id) {
  editingProductId = id;
  try {
    const product = await api.getAdminProduct(id);
    await renderProductForm(product);
  } catch (err) {
    showToast('Không thể tải thông tin sản phẩm.', 'toast-error');
  }
}

async function renderProductForm(product) {
  const container = document.getElementById('admin-content');
  const cats = await api.getCategories();
  const categories = Array.isArray(cats) ? cats : [];
  const isEdit = !!product;
  const p = product || {};

  container.innerHTML = `
    <div class="admin-table-wrap">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">${isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}</h5>
        <button class="btn btn-outline-secondary btn-sm" onclick="cancelProductForm()"><i class="fas fa-arrow-left"></i> Quay lại</button>
      </div>
      <form id="product-form" onsubmit="handleSaveProduct(event)">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Tên sản phẩm <span class="text-danger">*</span></label>
            <input type="text" class="form-control" name="name" value="${escapeHtml(p.name || '')}" required>
          </div>
          <div class="col-md-6">
            <label class="form-label">Slug</label>
            <input type="text" class="form-control" name="slug" value="${escapeHtml(p.slug || '')}" placeholder="Để trống tự động tạo">
          </div>
          <div class="col-md-6">
            <label class="form-label">Danh mục</label>
            <select class="form-select" name="category_id">
              <option value="">-- Chọn danh mục --</option>
              ${categories.map(c => `
                <option value="${c.id}" ${(p.category_id || '') == c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>
              `).join('')}
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Developer</label>
            <input type="text" class="form-control" name="developer" value="${escapeHtml(p.developer || '')}">
          </div>
          <div class="col-md-3">
            <label class="form-label">Đánh giá</label>
            <input type="number" class="form-control" name="rating" step="0.1" min="0" max="5" value="${p.rating || '0'}">
          </div>
          <div class="col-md-6">
            <label class="form-label">Hình ảnh</label>
            <input type="file" class="form-control" accept="image/*" id="product-image-file">
            <div class="mt-2 d-flex align-items-center gap-2">
              <div id="image-preview" style="display:${p.image ? 'block' : 'none'}">
                <img src="${p.image ? (p.image.startsWith('http') || p.image.startsWith('images/') ? p.image : 'images/' + p.image) : ''}" style="max-width:120px;max-height:120px;border:1px solid #ddd;border-radius:4px;object-fit:contain">
              </div>
              <span id="upload-status" class="text-muted small"></span>
            </div>
            <input type="hidden" name="image" value="${escapeHtml(p.image || '')}">
          </div>
          <div class="col-md-6">
            <div class="form-check mt-4">
              <input type="checkbox" class="form-check-input" name="is_featured" id="pf-featured" value="1" ${p.is_featured ? 'checked' : ''}>
              <label class="form-check-label" for="pf-featured">Sản phẩm nổi bật</label>
            </div>
          </div>
          <div class="col-12">
            <label class="form-label">Mô tả ngắn</label>
            <input type="text" class="form-control" name="short_description" value="${escapeHtml(p.short_description || '')}">
          </div>
          <div class="col-12">
            <label class="form-label">Mô tả chi tiết</label>
            <textarea class="form-control" name="description" rows="4">${escapeHtml(p.description || '')}</textarea>
          </div>
        </div>
        <div class="mt-3">
          <button type="submit" class="btn btn-danger">${isEdit ? 'Cập nhật' : 'Thêm mới'}</button>
          <button type="button" class="btn btn-outline-secondary ms-2" onclick="cancelProductForm()">Huỷ</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('product-image-file')?.addEventListener('change', handleImageUpload);
}

function cancelProductForm() {
  editingProductId = null;
  renderAdminContent();
}

async function handleSaveProduct(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    name: form.name.value,
    slug: form.slug.value,
    category_id: parseInt(form.category_id.value) || 0,
    short_description: form.short_description.value,
    description: form.description.value,
    image: form.image.value,
    developer: form.developer.value,
    rating: parseFloat(form.rating.value) || 0,
    is_featured: form.is_featured.checked ? 1 : 0,
  };

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Đang lưu...';

  try {
    if (editingProductId) {
      await api.updateAdminProduct(editingProductId, data);
      showAdminSuccessDialog('Cập nhật sản phẩm thành công!', () => { editingProductId = null; renderAdminContent(); });
    } else {
      await api.createAdminProduct(data);
      showAdminSuccessDialog('Thêm sản phẩm thành công!', () => { editingProductId = null; renderAdminContent(); });
    }
  } catch (err) {
    showToast(err.message || 'Lỗi khi lưu sản phẩm.', 'toast-error');
    btn.disabled = false;
    btn.textContent = editingProductId ? 'Cập nhật' : 'Thêm mới';
  }
}

async function handleDeleteProduct(id) {
  if (!confirm('Bạn có chắc muốn xoá sản phẩm này? Toàn bộ dữ liệu chi tiết và gói dịch vụ sẽ bị xoá.')) return;
  try {
    await api.deleteAdminProduct(id);
    showAdminSuccessDialog('Xoá sản phẩm thành công!', renderAdminContent);
  } catch (err) {
    showToast(err.message || 'Lỗi khi xoá sản phẩm.', 'toast-error');
  }
}

let uploadedImageUrl = '';

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const status = document.getElementById('upload-status');
  const preview = document.getElementById('image-preview');
  preview.style.display = 'block';
  preview.innerHTML = `<img src="${URL.createObjectURL(file)}" style="max-width:120px;max-height:120px;border:1px solid #ddd;border-radius:4px;object-fit:contain">`;
  const reader = new FileReader();
  reader.onload = () => {
    document.querySelector('input[name="image"]').value = reader.result;
    status.textContent = 'Sẵn sàng';
  };
  reader.onerror = () => { status.textContent = 'Lỗi đọc file'; };
  reader.readAsDataURL(file);
}

async function showProductDetailManager(id) {
  managingProductId = id;
  const container = document.getElementById('admin-content');

  try {
    const product = await api.getAdminProduct(id);
    const detail = (product.details && product.details[0]) || {};
    const packages = product.packages || [];

    container.innerHTML = `
      <div class="admin-table-wrap">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0"><i class="fas fa-cog"></i> Chi tiết sản phẩm: <strong>${escapeHtml(product.name)}</strong></h5>
          <button class="btn btn-outline-secondary btn-sm" onclick="cancelProductDetailManager()"><i class="fas fa-arrow-left"></i> Quay lại</button>
        </div>

        <form id="product-detail-form" onsubmit="handleSaveDetails(event)">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Slogan</label>
              <input type="text" class="form-control" name="slogan" value="${escapeHtml(detail.slogan || '')}">
            </div>
          </div>
          <div class="col-12">
            <label class="form-label">Tổng quan (overview)</label>
            <textarea class="form-control" name="overview" rows="6">${escapeHtml(detail.overview || '')}</textarea>
          </div>
          <div class="col-12">
            <label class="form-label">Tính năng (feature_content)</label>
            <textarea class="form-control" name="feature_content" rows="6">${escapeHtml(detail.feature_content || '')}</textarea>
          </div>
          <div class="col-12">
            <label class="form-label">Hướng dẫn (guide_content)</label>
            <textarea class="form-control" name="guide_content" rows="6">${escapeHtml(detail.guide_content || '')}</textarea>
          </div>
          <div class="mt-3">
            <button type="submit" class="btn btn-danger">Lưu chi tiết</button>
          </div>
        </form>

        <hr class="my-4">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0">Gói dịch vụ (<span id="pkg-count">${packages.length}</span>)</h5>
          <button class="btn btn-danger btn-sm" onclick="showAddPackageForm()"><i class="fas fa-plus"></i> Thêm gói</button>
        </div>

        <div id="package-form-container"></div>

        <div class="table-responsive">
          <table class="table table-bordered admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên gói</th>
                <th>Số lượng</th>
                <th>Thời gian</th>
                <th>Phí tạo</th>
                <th>Tổng tiền</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody id="packages-tbody">
              ${packages.length ? packages.map((pkg, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${escapeHtml(pkg.package_name)}</td>
                  <td>${pkg.quantity}</td>
                  <td>${escapeHtml(pkg.duration_time || '—')}</td>
                  <td>${Number(pkg.setup_fee).toLocaleString()} đ</td>
                  <td>${Number(pkg.total_price).toLocaleString()} đ</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editPackage(${pkg.id}, '${escapeHtml(pkg.package_name)}', ${pkg.quantity}, '${escapeHtml(pkg.duration_time || '')}', ${pkg.setup_fee}, ${pkg.total_price})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="handleDeletePackage(${pkg.id})"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              `).join('') : `
                <tr><td colspan="7" class="text-center text-muted py-4">Chưa có gói dịch vụ nào.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = '<div class="alert alert-danger">Không thể tải chi tiết sản phẩm.</div>';
  }
}

let editingPackageId = null;

function cancelProductDetailManager() {
  managingProductId = null;
  renderAdminContent();
}

async function handleSaveDetails(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    slogan: form.slogan.value,
    overview: form.overview.value,
    feature_content: form.feature_content.value,
    guide_content: form.guide_content.value,
  };
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Đang lưu...';
  try {
    await api.updateAdminProductDetails(managingProductId, data);
    showAdminSuccessDialog('Cập nhật chi tiết thành công!');
    btn.disabled = false;
    btn.textContent = 'Lưu chi tiết';
  } catch (err) {
    showToast(err.message || 'Lỗi khi lưu chi tiết.', 'toast-error');
    btn.disabled = false;
    btn.textContent = 'Lưu chi tiết';
  }
}

function showAddPackageForm() {
  editingPackageId = null;
  renderPackageForm(null);
}

function editPackage(id, name, quantity, duration, setupFee, totalPrice) {
  editingPackageId = id;
  renderPackageForm({ id, package_name: name, quantity, duration_time: duration, setup_fee: setupFee, total_price: totalPrice });
}

function renderPackageForm(pkg) {
  const container = document.getElementById('package-form-container');
  const isEdit = !!pkg;
  const p = pkg || {};

  container.innerHTML = `
    <div class="card card-body mb-3 bg-light">
      <form id="package-form" onsubmit="handleSavePackage(event)">
        <div class="row g-2">
          <div class="col-md-4">
            <input type="text" class="form-control" name="package_name" placeholder="Tên gói *" value="${escapeHtml(p.package_name || '')}" required>
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control" name="quantity" placeholder="SL" value="${p.quantity || 1}">
          </div>
          <div class="col-md-2">
            <input type="text" class="form-control" name="duration_time" placeholder="Thời gian" value="${escapeHtml(p.duration_time || '')}">
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control" name="setup_fee" placeholder="Phí tạo" step="1000" value="${p.setup_fee || 0}">
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control" name="total_price" placeholder="Tổng tiền" step="1000" value="${p.total_price || 0}">
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-danger btn-sm">${isEdit ? 'Cập nhật' : 'Thêm'}</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" onclick="cancelPackageForm()">Huỷ</button>
        </div>
      </form>
    </div>
  `;
}

function cancelPackageForm() {
  editingPackageId = null;
  document.getElementById('package-form-container').innerHTML = '';
}

async function handleSavePackage(event) {
  event.preventDefault();
  const form = event.target;
  const data = {
    package_name: form.package_name.value,
    quantity: parseInt(form.quantity.value) || 1,
    duration_time: form.duration_time.value,
    setup_fee: parseFloat(form.setup_fee.value) || 0,
    total_price: parseFloat(form.total_price.value) || 0,
  };
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Đang lưu...';
  try {
    if (editingPackageId) {
      await api.updateAdminPackage(editingPackageId, data);
      showAdminSuccessDialog('Cập nhật gói thành công!', () => {
        editingPackageId = null;
        document.getElementById('package-form-container').innerHTML = '';
        showProductDetailManager(managingProductId);
      });
    } else {
      await api.createAdminPackage(managingProductId, data);
      showAdminSuccessDialog('Thêm gói thành công!', () => {
        editingPackageId = null;
        document.getElementById('package-form-container').innerHTML = '';
        showProductDetailManager(managingProductId);
      });
    }
  } catch (err) {
    showToast(err.message || 'Lỗi khi lưu gói.', 'toast-error');
    btn.disabled = false;
    btn.textContent = editingPackageId ? 'Cập nhật' : 'Thêm';
  }
}

async function handleDeletePackage(id) {
  if (!confirm('Xoá gói dịch vụ này?')) return;
  try {
    await api.deleteAdminPackage(id);
    showAdminSuccessDialog('Xoá gói thành công!', () => showProductDetailManager(managingProductId));
  } catch (err) {
    showToast(err.message || 'Lỗi khi xoá gói.', 'toast-error');
  }
}
