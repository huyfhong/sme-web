let marketplaceState = {
  products: [],
  categories: [],
  limit: 6,
  total: 0,
  search: '',
  category: '',
  loading: false,
};

function renderMarketplace() {
  const params = getQueryParams();
  marketplaceState.search = params.search || '';
  marketplaceState.category = params.category || '';
  marketplaceState.limit = 6;

  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <div class="mp-page">
      <!-- Banner -->
      <section class="mp-banner-section">
        <div class="mp-banner-inner">
          <div class="mp-banner-img">
            <img src="images/banner.png" alt="Market Banner">
          </div>
          <div class="mp-banner-text">
            <h1>CHỢ ỨNG DỤNG <span class="mp-banner-red">VIETTEL</span></h1>
            <p>Mua sắm tiện lợi, cùng chợ ứng dụng Viettel - nơi đáng tin cậy để tìm kiếm sản phẩm chất lượng, với những ưu đãi hấp dẫn và dịch vụ chăm sóc khách hàng tận tâm.</p>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <section class="mp-content-section">
        <div class="mp-content-inner">
          <!-- Sidebar -->
          <aside class="mp-sidebar">
            <div class="mp-search-box">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="mp-search-input" placeholder="Tìm kiếm từ khóa" value="${escapeHtml(marketplaceState.search)}">
            </div>
            <div class="mp-categories" id="mp-categories">
              ${generateCategoryItems()}
            </div>
          </aside>

          <!-- Grid Area -->
          <div class="mp-grid-area">
            <!-- Products Grid -->
            <div class="mp-products-grid" id="mp-products-grid">
              ${generateMpProductSkeleton(6)}
            </div>
            <div class="mp-load-more" id="mp-load-more"></div>
          </div>
        </div>
      </section>
    </div>
  `;

  const searchInput = document.getElementById('mp-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      marketplaceState.search = e.target.value;
      marketplaceState.limit = 6;
      loadMpProducts();
    }, 400));
  }

  loadMpCategories();
  loadMpProducts();
}

function generateCategoryItems() {
  const defaultCats = [
    "Tất cả sản phẩm",
    "Sản phẩm thiết yếu",
    "Quản trị doanh nghiệp",
    "Sản phẩm chuyên ngành",
    "Internet, viễn thông"
  ];
  return defaultCats.map((cat, i) => `
    <div class="mp-cat-item${i === 0 ? ' active' : ''}" data-category="${i === 0 ? '' : cat}">
      <span>${cat}</span>
      <svg class="mp-cat-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </div>
  `).join('');
}

function generateMpProductSkeleton(count) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += `
      <div class="mp-pcard skeleton">
        <div class="mp-pcard-img"><div style="width:100%;height:100%;background:#f0f0f0;border-radius:12px"></div></div>
        <div class="mp-pcard-body">
          <div style="height:16px;background:#f0f0f0;border-radius:4px;width:80%"></div>
          <div style="height:12px;background:#f0f0f0;border-radius:4px;width:40%;margin-top:8px"></div>
        </div>
      </div>
    `;
  }
  return html;
}

async function loadMpCategories() {
  const container = document.getElementById('mp-categories');
  if (!container) return;
  try {
    const result = await api.getCategories();
    const cats = Array.isArray(result) ? result : (result.data || []);
    if (cats.length) {
      container.innerHTML = `<div class="mp-cat-item active" data-category=""><span>Tất cả sản phẩm</span><svg class="mp-cat-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>` +
        cats.map(c => `<div class="mp-cat-item" data-category="${escapeHtml(c.name)}"><span>${c.name}</span><svg class="mp-cat-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>`).join('');
    }
  } catch (e) {}

  $$('.mp-cat-item').forEach(item => {
    item.addEventListener('click', () => {
      $$('.mp-cat-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      marketplaceState.category = item.dataset.category;
      marketplaceState.limit = 6;
      loadMpProducts();
    });
  });

  if (marketplaceState.category) {
    $$('.mp-cat-item').forEach(item => {
      item.classList.toggle('active', item.dataset.category === marketplaceState.category);
    });
  }
}

async function loadMpProducts() {
  if (marketplaceState.loading) return;
  marketplaceState.loading = true;

  const grid = document.getElementById('mp-products-grid');
  if (grid) grid.innerHTML = generateMpProductSkeleton(6);

  try {
    const result = await api.getProducts({
      search: marketplaceState.search || undefined,
      category: marketplaceState.category || undefined,
      page: 1,
      limit: 50,
    });
    marketplaceState.products = (result && result.data) ? result.data : (Array.isArray(result) ? result : []);
    marketplaceState.total = result ? (result.total || marketplaceState.products.length) : 0;
  } catch (err) {
    marketplaceState.products = [
      { id: 1, name: 'Viettel CA - Chữ ký số', short_description: 'Chứng thực chữ ký số điện tử', image: 'images/sinvoice.png', alias: 'CA' },
      { id: 2, name: 'SInvoice - Hóa đơn điện tử', short_description: 'Quản lý hóa đơn trên nền điện tử', image: 'images/sinvoice.png', alias: 'SINVOICE' },
      { id: 3, name: 'Tendoo - Quản lý bán hàng', short_description: 'Nền tảng quản lý bán hàng thông minh', image: 'images/tendoo-quan-ly-ban-hang.png', alias: 'TDO' },
      { id: 4, name: 'VContract - Hợp đồng điện tử', short_description: 'Quản lý hợp đồng trực tuyến', image: 'images/vcontract.png', alias: 'VCONTRACT' },
      { id: 5, name: 'MySign - Ký số từ xa', short_description: 'Ký số từ xa an toàn', image: 'images/mysign.png', alias: 'MYSIGN' },
      { id: 6, name: 'EasyHRM - Quản lý nhân sự', short_description: 'Quản lý nhân sự toàn diện', image: 'images/easyhrm.png', alias: 'EHRM' },
      { id: 7, name: 'SContract - Hợp đồng điện tử', short_description: 'Hợp đồng điện tử cơ bản', image: 'images/scontract.png', alias: 'SCONTRACT' },
      { id: 8, name: 'EasyBooks - Kế toán', short_description: 'Phần mềm kế toán', image: 'images/easybooks.png', alias: 'EBOOKS' },
    ];
    marketplaceState.total = marketplaceState.products.length;
  }

  renderMpProducts();
  renderLoadMore();
  marketplaceState.loading = false;
}

function renderMpProducts() {
  const grid = document.getElementById('mp-products-grid');
  if (!grid) return;
  const visible = marketplaceState.products.slice(0, marketplaceState.limit);

  if (!visible.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:#999">Không tìm thấy sản phẩm</div>`;
    return;
  }

  grid.innerHTML = visible.map(p => {
    const imgSrc = p.image
      ? (p.image.startsWith('http') || p.image.startsWith('images/') ? p.image : 'images/' + p.image)
      : 'images/tendo_logo_update.jpeg';
    const stars = p.rating ? Math.round(p.rating) : 4;
    return `
    <a class="mp-pcard" href="#/product/${p.id}" style="background: #fff">
      <div class="mp-pcard-img">
        <img src="${imgSrc}" alt="${p.name}" onerror="this.style.display='none'">
      </div>
      <div class="mp-pcard-body">
        <h3>${p.name}</h3>
        <div class="mp-pcard-bottom">
          <div class="mp-stars">
            ${[...Array(5)].map((_, j) => `<i class="fa-star${j < stars ? ' fas' : ' far'}" style="color:${j < stars ? '#facc15' : '#d1d5db'}"></i>`).join('')}
          </div>
          <span class="mp-pcard-link">Xem chi tiết <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
        </div>
      </div>
    </a>`;
  }).join('');
}

function renderLoadMore() {
  const container = document.getElementById('mp-load-more');
  if (!container) return;
  if (marketplaceState.products.length === 0) {
    container.innerHTML = '';
    return;
  }
  let html = '';
  if (marketplaceState.limit < marketplaceState.products.length) {
    html += `<button class="mp-load-btn" onclick="loadMoreProducts()"><i class="fas fa-chevron-down" style="margin-right:8px"></i>Xem thêm</button>`;
  }
  if (marketplaceState.limit > 6) {
    html += `<button class="mp-load-btn" onclick="showLessProducts()"><i class="fas fa-chevron-up" style="margin-right:8px"></i>Ẩn bớt</button>`;
  }
  container.innerHTML = html;
}

function loadMoreProducts() {
  marketplaceState.limit += 6;
  renderMpProducts();
  renderLoadMore();
}

function showLessProducts() {
  marketplaceState.limit = 6;
  renderMpProducts();
  renderLoadMore();
}
