
// PRODUCT DETAIL PAGE (API-based)

const fallbackProducts = [
  { id: 1, name: 'Viettel CA - Chữ ký số', short_description: 'Chứng thực chữ ký số điện tử', image: 'images/sinvoice.png', alias: 'CA' },
  { id: 2, name: 'SInvoice - Hóa đơn điện tử', short_description: 'Quản lý hóa đơn trên nền điện tử', image: 'images/sinvoice.png', alias: 'SINVOICE' },
  { id: 3, name: 'Tendoo - Quản lý bán hàng', short_description: 'Nền tảng quản lý bán hàng thông minh', image: 'images/tendoo-quan-ly-ban-hang.png', alias: 'TDO' },
  { id: 4, name: 'VContract - Hợp đồng điện tử', short_description: 'Quản lý hợp đồng trực tuyến', image: 'images/vcontract.png', alias: 'VCONTRACT' },
  { id: 5, name: 'MySign - Ký số từ xa', short_description: 'Ký số từ xa an toàn', image: 'images/mysign.png', alias: 'MYSIGN' },
  { id: 6, name: 'EasyHRM - Quản lý nhân sự', short_description: 'Quản lý nhân sự toàn diện', image: 'images/easyhrm.png', alias: 'EHRM' },
  { id: 7, name: 'SContract - Hợp đồng điện tử', short_description: 'Hợp đồng điện tử cơ bản', image: 'images/scontract.png', alias: 'SCONTRACT' },
  { id: 8, name: 'EasyBooks - Kế toán', short_description: 'Phần mềm kế toán', image: 'images/easybooks.png', alias: 'EBOOKS' },
];

function getFallbackProduct(id) {
  const fb = fallbackProducts.find(p => String(p.id) === String(id));
  if (!fb) return null;
  const lp = landingProducts[fb.alias];
  const overview = lp ? lp.introDesc.join('<br>') : 'Chưa có dữ liệu tổng quan.';
  const features = lp ? lp.features.map(f => `<strong>${f.title}</strong>: ${f.desc}`).join('<br>') : 'Chưa có dữ liệu tính năng.';
  const packages = lp ? lp.plans.map(plan => ({
    package_name: plan.name,
    quantity: '1',
    duration_time: plan.period,
    setup_fee: plan.total || '0',
    total_price: plan.total || '0',
  })) : [];
  const product = {
    id: fb.id,
    name: fb.name,
    image: fb.image,
    slogan: fb.short_description || '',
    rating: '5.0',
    developer: 'Viettel',
    overview,
    feature_content: features,
  };
  const related = fallbackProducts.filter(p => String(p.id) !== String(id)).slice(0, 3).map(p => ({
    id: p.id,
    name: p.name,
    image: p.image,
    short_description: p.short_description,
  }));
  return { product, packages, related };
}

function renderProductDetail(id) {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '<div class="page-loading"><div class="spinner-border text-danger" role="status"></div></div>';

  api.getProductDetail(id)
    .then(product => {
      if (!product) {
        showProduct404(mainContent);
        return;
      }

      const detail = (product.details && product.details[0]) || {};
      const viewProduct = {
        id: product.id,
        name: product.name,
        image: product.image,
        slogan: detail.slogan || product.short_description || '',
        rating: product.rating || '5.0',
        developer: product.developer || 'Viettel',
        overview: detail.overview || 'Chưa có dữ liệu tổng quan.',
        feature_content: detail.feature_content || 'Chưa có dữ liệu tính năng.',
        category_id: product.category_id,
      };

      const packages = product.packages || [];

      api.getProducts({ category_id: product.category_id, limit: 4 })
        .then(relatedRes => {
          const allRelated = relatedRes.data || [];
          const relatedProducts = allRelated
            .filter(p => String(p.id) !== String(id))
            .slice(0, 3);
          renderProductDetailView(mainContent, viewProduct, packages, relatedProducts);
        })
        .catch(() => {
          renderProductDetailView(mainContent, viewProduct, packages, []);
        });
    })
    .catch(err => {
      if (err.status === 404) {
        showProduct404(mainContent);
      } else {
        // Fallback: use landing data if available
        const fallback = getFallbackProduct(id);
        if (fallback) {
          renderProductDetailView(mainContent, fallback.product, fallback.packages, fallback.related);
          return;
        }
        mainContent.innerHTML = `
          <div class="page-404">
            <div class="container">
              <h1>Lỗi</h1>
              <p>Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.</p>
              <button class="btn btn-danger" onclick="router.navigate('/market-place')">Quay lại chợ ứng dụng</button>
            </div>
          </div>
        `;
      }
    });
}

function showProduct404(container) {
  container.innerHTML = `
    <div class="page-404">
      <div class="container">
        <h1>404</h1>
        <p>Sản phẩm không tồn tại.</p>
        <button class="btn btn-danger" onclick="router.navigate('/market-place')">Quay lại chợ ứng dụng</button>
      </div>
    </div>
  `;
}

function renderProductDetailView(container, product, packages, relatedProducts) {
  container.innerHTML = `
    <div class="product-detail-page">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/market-place">Chợ ứng dụng</a>
          <span>></span>
          <span>${escapeHtml(product.name)}</span>
        </div>

        <section class="product-detail">
          <div class="detail-card">
            <div class="detail-left">
              <img src="${getProductImage(product.image)}" alt="${escapeHtml(product.name)}">
            </div>
            <div class="detail-right">
              <h1>${escapeHtml(product.name)}</h1>
              <p class="slogan">${escapeHtml(product.slogan)}</p>
              <div class="rating">${'★'.repeat(5)} ${escapeHtml(product.rating)}</div>
              <div class="developer">${escapeHtml(product.developer)}</div>
            </div>
          </div>

          <div class="detail-tabs" id="detail-tabs">
            <button class="tab-btn active" data-tab="overview">Tổng quan</button>
            <button class="tab-btn" data-tab="feature">Tính năng</button>
            <button class="tab-btn" data-tab="price">Bảng giá</button>
            <button class="tab-btn" data-tab="guide">Hướng dẫn và Tài nguyên</button>
          </div>

          <div class="tab-content" id="tab-content">
            ${renderTabContent('overview', product, packages)}
          </div>

          ${relatedProducts.length > 0 ? `
            <div class="related-section">
              <h2>Sản phẩm liên quan</h2>
              <div class="related-carousel">
                ${relatedProducts.map(item => `
                  <div class="related-card">
                    <img src="${getProductImage(item.image)}" alt="${escapeHtml(item.name)}">
                    <h3>${escapeHtml(item.name)}</h3>
                    <p>${escapeHtml(item.short_description || '')}</p>
                    <button class="related-btn detail-btn" onclick="router.navigate('/product/${item.id}')">
                      Xem chi tiết
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </section>
      </div>
    </div>
  `;

  setupTabListeners(container, product, packages);
}

function renderTabContent(tab, product, packages) {
  switch (tab) {
    case 'overview':
      return (product.overview || 'Chưa có dữ liệu.').replace(/\n/g, '<br>');

    case 'feature':
      return (product.feature_content || 'Chưa có dữ liệu.').replace(/\n/g, '<br>');

    case 'price':
      return `
        <div class="price-layout">
          <div class="price-filter">
            <h3>Bộ lọc</h3>
            <input type="text" placeholder="Tìm kiếm từ khóa" class="filter-input">
            <div class="filter-group">
              <h4>Khoảng giá</h4>
              <input type="range" min="0" max="100000000" value="100000000" class="price-range">
              <div class="price-range-values">
                <div class="price-box min-price">0đ</div>
                <div class="price-box max-price">100.000.000đ</div>
              </div>
            </div>
            <button class="clear-filter-btn">Xóa bộ lọc</button>
          </div>
          <div class="row row-cols-1 row-cols-md-2 g-4">
            ${packages.length > 0
              ? packages.map(item => `
                  <div class="col">
                    <div class="package-card">
                      <h3>${escapeHtml(item.package_name)}</h3>
                      <div class="package-info">
                        <p><span>Số lượng</span><strong>${escapeHtml(item.quantity)}</strong></p>
                        <p><span>Thời gian sử dụng</span><strong>${escapeHtml(item.duration_time)}</strong></p>
                        <p><span>Phí khởi tạo</span><strong>${Number(item.setup_fee).toLocaleString()} đ</strong></p>
                      </div>
                      <div class="package-price">
                        <span>Tổng tiền</span>
                        <h2>${Number(item.total_price).toLocaleString()} đ</h2>
                      </div>
                      <button class="buy-btn" data-product="${escapeHtml(product.name)}">Mua ngay</button>
                    </div>
                  </div>
                `).join('')
              : '<div class="col-12 text-center text-secondary py-5">Chưa có gói dịch vụ nào.</div>'}
          </div>
        </div>
      `;

    case 'guide':
      return `
        <div class="support-center">
          <h2>TRUNG TÂM <span>HỖ TRỢ NGƯỜI DÙNG</span></h2>
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
              <div class="support-card">
                <h3>Hướng dẫn sử dụng</h3>
                <p>Văn bản, công văn, nghị định và hướng dẫn sử dụng sản phẩm</p>
                <button>Xem nội dung</button>
              </div>
            </div>
            <div class="col">
              <div class="support-card">
                <h3>Tài nguyên</h3>
                <p>Bộ cài, các phần mềm hỗ trợ trong quá trình sử dụng sản phẩm</p>
                <button>Xem tài nguyên</button>
              </div>
            </div>
            <div class="col">
              <div class="support-card">
                <h3>Câu hỏi thường gặp</h3>
                <p>Tổng hợp các câu hỏi và giải đáp từ khách hàng.</p>
                <button>Xem danh sách</button>
              </div>
            </div>
            <div class="col">
              <div class="support-card">
                <h3>Điều khoản và chính sách</h3>
                <p>Tổng hợp các điều khoản và chính sách của Viettel.</p>
                <button>Xem nội dung</button>
              </div>
            </div>
            <div class="col">
              <div class="support-card">
                <h3>Nội dung cập nhật phiên bản</h3>
                <p>Xem các thay đổi và thông báo về các tính năng mới.</p>
                <button>Xem nội dung</button>
              </div>
            </div>
          </div>
        </div>
      `;

    default:
      return '';
  }
}

function setupTabListeners(container, product, packages) {
  const tabs = container.querySelectorAll('.tab-btn');
  const tabContent = container.querySelector('#tab-content');

  tabs.forEach(btn => {
    btn.addEventListener('click', function () {
      tabs.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const tab = this.dataset.tab;
      tabContent.innerHTML = renderTabContent(tab, product, packages);

      if (tab === 'price') {
        tabContent.querySelectorAll('.buy-btn').forEach(b => {
          b.addEventListener('click', function () {
            openConsultationModal(this.dataset.product);
          });
        });
      }
    });
  });
}

function getProductImage(filename) {
  if (!filename) return 'images/vinvoice-icon.png';
  if (filename.startsWith('http://') || filename.startsWith('https://')) return filename;
  if (filename.startsWith('images/')) return filename;
  return 'images/' + filename;
}

// ============================================
// LEGACY: Landing Pages (keep for /landing/:alias route)
// ============================================

const productImageMap = {
  TDO: 'images/tendo_logo_update.jpeg',
  SINVOICE: 'images/vinvoice-icon.png',
  VCONTRACT: 'images/our_product_vcontract.png',
  CA: 'images/tendo_logo_update.jpeg',
};

const landingProducts = {
  TDO: {
    name: 'Tendoo',
    fullName: 'Tendoo - Quản lý bán hàng',
    icon: 'fa-store',
    image: 'images/tendo_logo_update.jpeg',
    tagline: 'QUẢN LÝ DỄ DÀNG - BÁN HÀNG HIỆU QUẢ',
    subtitle: 'Bán hàng thông minh, doanh thu bứt phá',
    introTitle: 'GIỚI THIỆU VỀ TENDOO',
    introHeading: 'Tendoo là gì?',
    introDesc: [
      'Tendoo là nền tảng quản lý bán hàng thông minh, được thiết kế để đồng hành cùng doanh nghiệp, hộ kinh doanh và cá nhân kinh doanh trong việc vận hành và phát triển hoạt động kinh doanh bán hàng một cách hiệu quả.',
      'Từ nhập hàng với nhiều nhà cung cấp trong và ngoài nước, kiểm soát tồn kho, theo dõi đơn hàng, doanh thu – đến quản lý nhân viên và chăm sóc khách hàng, Tendoo giúp mọi quy trình trở nên đơn giản – liền mạch – dễ kiểm soát, mang đến trải nghiệm quản lý toàn diện trong một ứng dụng duy nhất.',
    ],
    benefits: [
      { icon: 'fa-clock', title: 'Tiết kiệm thời gian', desc: 'Tự động hóa quy trình bán hàng, giảm thiểu thao tác thủ công' },
      { icon: 'fa-chart-line', title: 'Tăng doanh thu', desc: 'Phân tích dữ liệu bán hàng, đưa ra chiến lược kinh doanh hiệu quả' },
      { icon: 'fa-boxes', title: 'Quản lý tồn kho', desc: 'Kiểm soát nhập xuất tồn kho chính xác, tránh thất thoát' },
      { icon: 'fa-users-cog', title: 'Quản lý nhân viên', desc: 'Phân quyền, theo dõi hiệu suất làm việc của từng nhân viên' },
    ],
    features: [
      { title: 'Phần mềm bán hàng với CRM', desc: 'Tích hợp sàn thương mại điện tử, hệ thống vận chuyển' },
      { title: 'Nền tảng trợ lý AI', desc: 'Cho DN SME và HKD bán hàng nhanh chóng, thông minh' },
      { title: 'Tích hợp nền tảng bán buôn', desc: 'Kết nối nhà cung cấp, mở rộng kênh phân phối' },
      { title: 'Cloud', desc: 'Dữ liệu được đồng bộ và lưu trữ trên nền tảng đám mây' },
      { title: 'Tài chính, tín dụng online', desc: 'Hỗ trợ vay vốn cho HKD, DN dễ dàng và nhanh chóng' },
    ],
    plans: [
      { name: 'Gói 1 năm', price: '423.000', period: '/tháng', total: '5.076.000', popular: false },
      { name: 'Gói 2 năm', price: '307.800', period: '/tháng', total: '3.693.600', popular: true },
    ],
    testimonials: [
      { name: 'Ông Nguyễn Hoàng Sơn', role: 'Công ty TNHH Sao Ánh Dương', text: 'Sản phẩm tuyệt vời giúp tối ưu quy trình và tăng hiệu suất của chúng tôi lên rất nhiều. Lựa chọn giải pháp của Viettel cũng giúp chúng tôi yên tâm và tin tưởng khi sử dụng.' },
      { name: 'Ông Lê Văn Tiệp', role: 'Công ty Cổ phần Tư vấn MCI Việt Nam', text: 'Không những phần mềm thông minh mà đội hỗ trợ CSKH của Viettel cũng rất nhiệt tình. Tôi luôn được hỗ trợ mọi lúc và được giải quyết vấn đề nhanh chóng.' },
      { name: 'Bà Huỳnh Thanh Vân', role: 'Công ty Cổ phần Nhựa và Môi trường xanh An Phát', text: 'Thao tác rất nhanh, chúng tôi rất hài lòng khi sử dụng. Dịch vụ quản lý bán hàng Tendoo thuận tiện cho người sử dụng.' },
    ],
  },
  SINVOICE: {
    name: 'vInvoice',
    fullName: 'vInvoice - Hóa đơn điện tử',
    icon: 'fa-file-invoice',
    image: 'images/vinvoice-icon.png',
    tagline: 'HÓA ĐƠN ĐIỆN TỬ - GIẢI PHÁP SỐ TOÀN DIỆN',
    subtitle: 'Quản lý hóa đơn thông minh, tuân thủ pháp luật',
    introTitle: 'GIỚI THIỆU VỀ VINVOICE',
    introHeading: 'vInvoice là gì?',
    introDesc: [
      'vInvoice là phần mềm hóa đơn điện tử được phát triển bởi Viettel, tuân thủ Nghị định 119/2018/NĐ-CP về khởi tạo, phát hành và sử dụng hóa đơn điện tử.',
      'Giải pháp giúp doanh nghiệp tiết kiệm chi phí in ấn, lưu trữ, vận chuyển hóa đơn, đồng thời đảm bảo an toàn và bảo mật dữ liệu.',
    ],
    benefits: [
      { icon: 'fa-file-invoice-dollar', title: 'Tiết kiệm chi phí', desc: 'Giảm chi phí in ấn, lưu trữ và vận chuyển hóa đơn' },
      { icon: 'fa-bolt', title: 'Tăng tốc xử lý', desc: 'Tạo và gửi hóa đơn trong vài giây, tự động hóa quy trình' },
      { icon: 'fa-shield-alt', title: 'An toàn bảo mật', desc: 'Dữ liệu được mã hóa và lưu trữ an toàn trên hệ thống Viettel' },
      { icon: 'fa-handshake', title: 'Tuân thủ pháp luật', desc: 'Đáp ứng đầy đủ các quy định của Bộ Tài chính về hóa đơn điện tử' },
    ],
    features: [
      { title: 'Tạo hóa đơn nhanh chóng', desc: 'Tạo hóa đơn điện tử với đầy đủ thông tin, tự động tính thuế' },
      { title: 'Tích hợp phần mềm kế toán', desc: 'Kết nối dễ dàng với các phần mềm kế toán phổ biến' },
      { title: 'Tra cứu hóa đơn trực tuyến', desc: 'Tra cứu hóa đơn mọi lúc mọi nơi qua internet' },
      { title: 'Chuyển đổi hóa đơn', desc: 'Chuyển đổi hóa đơn điện tử sang hóa đơn giấy khi cần thiết' },
    ],
    plans: [
      { name: 'Gói Cơ bản', price: '99.000', period: '/tháng', total: '1.188.000', popular: false },
      { name: 'Gói Chuyên nghiệp', price: '199.000', period: '/tháng', total: '2.388.000', popular: true },
    ],
    testimonials: [
      { name: 'Chị Nguyễn Thị Hoa', role: 'Kế toán trưởng - Công ty ABC', text: 'Từ khi sử dụng vInvoice, công việc xuất hóa đơn của chúng tôi trở nên nhanh chóng và chính xác hơn rất nhiều.' },
      { name: 'Anh Trần Văn Nam', role: 'Giám đốc tài chính - Công ty XYZ', text: 'vInvoice giúp chúng tôi tiết kiệm đáng kể chi phí vận hành và đảm bảo tuân thủ đúng quy định của pháp luật.' },
    ],
  },
  VCONTRACT: {
    name: 'VContract',
    fullName: 'VContract - Hợp đồng điện tử',
    icon: 'fa-file-signature',
    image: 'images/our_product_vcontract.png',
    tagline: 'HỢP ĐỒNG ĐIỆN TỬ - CHUYỂN ĐỔI SỐ DOANH NGHIỆP',
    subtitle: 'Quản lý hợp đồng trực tuyến, ký kết mọi lúc mọi nơi',
    introTitle: 'GIỚI THIỆU VỀ VCONTRACT',
    introHeading: 'VContract là gì?',
    introDesc: [
      'VContract là nền tảng hợp đồng điện tử giúp doanh nghiệp tạo lập, ký kết và quản lý hợp đồng hoàn toàn trực tuyến.',
      'Với công nghệ chữ ký số tiên tiến, VContract đảm bảo tính pháp lý và bảo mật cho mọi giao dịch hợp đồng của doanh nghiệp.',
    ],
    benefits: [
      { icon: 'fa-rocket', title: 'Ký kết nhanh chóng', desc: 'Ký hợp đồng mọi lúc mọi nơi, không cần gặp mặt trực tiếp' },
      { icon: 'fa-file-alt', title: 'Quản lý tập trung', desc: 'Kho lưu trữ hợp đồng tập trung, dễ dàng tra cứu và theo dõi' },
      { icon: 'fa-check-circle', title: 'Tính pháp lý cao', desc: 'Sử dụng chữ ký số đảm bảo tính pháp lý theo quy định' },
      { icon: 'fa-bell', title: 'Nhắc nhở thông minh', desc: 'Tự động nhắc nhở gia hạn, thanh lý hợp đồng sắp hết hạn' },
    ],
    features: [
      { title: 'Tạo hợp đồng mẫu', desc: 'Xây dựng kho mẫu hợp đồng chuẩn cho doanh nghiệp' },
      { title: 'Ký số điện tử', desc: 'Tích hợp chữ ký số Viettel CA, ký mọi lúc mọi nơi' },
      { title: 'Quản lý quy trình', desc: 'Theo dõi trạng thái hợp đồng theo từng bước phê duyệt' },
      { title: 'Lưu trữ đám mây', desc: 'Dữ liệu được lưu trữ an toàn trên nền tảng Cloud của Viettel' },
    ],
    plans: [
      { name: 'Gói Cơ bản', price: '1.200.000', period: '/năm', total: '1.200.000', popular: false },
      { name: 'Gói Doanh nghiệp', price: '2.200.000', period: '/năm', total: '2.200.000', popular: true },
    ],
    testimonials: [
      { name: 'Anh Phạm Văn Hùng', role: 'Giám đốc kinh doanh', text: 'VContract giúp chúng tôi rút ngắn thời gian ký kết hợp đồng với khách hàng từ vài ngày xuống còn vài phút.' },
    ],
  },
  CA: {
    name: 'Viettel CA',
    fullName: 'Viettel CA - Chữ ký số',
    icon: 'fa-signature',
    image: 'images/vinvoice-icon.png',
    tagline: 'CHỮ KÝ SỐ - AN TOÀN GIAO DỊCH ĐIỆN TỬ',
    subtitle: 'Chứng thực chữ ký điện tử, giao dịch an toàn',
    introTitle: 'GIỚI THIỆU VỀ VIETTEL CA',
    introHeading: 'Viettel CA là gì?',
    introDesc: [
      'Dịch vụ Chữ ký số Viettel CA là dịch vụ chứng thực chữ ký điện tử do Viettel cung cấp cho thuê bao để xác thực thuê bao là người đã ký số trên thông điệp dữ liệu.',
      'Viettel CA đáp ứng các tiêu chuẩn bảo mật cao nhất, được Bộ Thông tin và Truyền thông cấp phép hoạt động.',
    ],
    benefits: [
      { icon: 'fa-shield-alt', title: 'Bảo mật cao', desc: 'Công nghệ mã hóa RSA 2048 bit đảm bảo an toàn tuyệt đối' },
      { icon: 'fa-gavel', title: 'Tính pháp lý', desc: 'Có giá trị pháp lý theo Luật Giao dịch điện tử' },
      { icon: 'fa-sync-alt', title: 'Đa nền tảng', desc: 'Sử dụng trên máy tính, điện thoại, USB token' },
    ],
    features: [
      { title: 'Ký số văn bản, hợp đồng', desc: 'Ký các văn bản điện tử, hợp đồng với đối tác' },
      { title: 'Kê khai thuế qua mạng', desc: 'Ký và nộp tờ khai thuế điện tử' },
      { title: 'Giao dịch ngân hàng điện tử', desc: 'Xác thực giao dịch ngân hàng trực tuyến' },
      { title: 'Đăng ký kinh doanh trực tuyến', desc: 'Thực hiện các thủ tục đăng ký doanh nghiệp' },
    ],
    plans: [
      { name: 'USB Token 1 năm', price: '1.760.000', period: '/năm', total: '1.760.000', popular: true },
      { name: 'USB Token 2 năm', price: '3.080.000', period: '/2 năm', total: '3.080.000', popular: false },
    ],
    testimonials: [
      { name: 'Chị Lê Thị Mai', role: 'Kế toán - Công ty CP Đầu tư XYZ', text: 'Viettel CA giúp tôi kê khai thuế và ký hợp đồng điện tử một cách nhanh chóng, tiện lợi.' },
    ],
  },
};

function renderLandingPage(alias) {
  const product = landingProducts[alias];

  if (!product) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
      <div class="page-404">
        <div class="container">
          <h1>404</h1>
          <p>Sản phẩm không tồn tại.</p>
          <button class="btn btn-danger" onclick="router.navigate('/market-place')">Quay lại chợ ứng dụng</button>
        </div>
      </div>
    `;
    return;
  }

  const mainContent = document.getElementById('main-content');

  mainContent.innerHTML = `
    <div class="landing-page">
      <section class="landing-hero">
        <div class="container">
          <div class="landing-hero-content">
            <div class="landing-hero-text">
              <h1>${product.tagline}</h1>
              <p class="tagline">${product.subtitle}</p>
              <div class="landing-hero-actions">
                <button class="btn btn-danger btn-lg" onclick="openConsultationModal('${product.fullName}')">
                  <i class="fas fa-phone-alt"></i> Nhận tư vấn
                </button>
                <button class="btn btn-outline-danger btn-lg" onclick="router.navigate('/market-place')">
                  <i class="fas fa-shopping-cart"></i> Mua ngay
                </button>
              </div>
            </div>
            <div class="landing-hero-image">
              <div class="hero-icon-wrap">
                <img src="${product.image || 'images/vinvoice-icon.png'}" alt="${product.name}" style="width:80px;height:80px;object-fit:contain">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="landing-section">
        <div class="container">
          <h2 class="landing-section-title">${product.introTitle}</h2>
          <p class="landing-section-subtitle">${product.introHeading}</p>
          <div class="landing-intro-grid">
            <div class="landing-intro-text">
              ${product.introDesc.map(p => `<p>${p}</p>`).join('')}
            </div>
            <div class="landing-intro-image">
              <img src="${product.image || 'images/vinvoice-icon.png'}" alt="${product.name}" style="max-width:300px;object-fit:contain">
            </div>
          </div>
        </div>
      </section>

      <section class="landing-section landing-section-alt">
        <div class="container">
          <h2 class="landing-section-title">Lợi ích mang lại</h2>
          <p class="landing-section-subtitle">Những giá trị vượt trội mà ${product.name} mang đến cho doanh nghiệp</p>
          <div class="landing-benefits-grid">
            ${product.benefits.map(b => `
              <div class="landing-benefit-card">
                <div class="icon"><i class="fas ${b.icon}"></i></div>
                <h3>${b.title}</h3>
                <p>${b.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="landing-section">
        <div class="container">
          <h2 class="landing-section-title">TÍNH NĂNG NỔI BẬT</h2>
          <p class="landing-section-subtitle">Những tính năng giúp doanh nghiệp vận hành hiệu quả</p>
          <div class="landing-features-list">
            ${product.features.map((f, i) => `
              <div class="landing-feature-item">
                <div class="num">${i + 1}</div>
                <div class="content">
                  <h4>${f.title}</h4>
                  <p>${f.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="landing-section landing-section-alt">
        <div class="container">
          <h2 class="landing-section-title">Bảng giá</h2>
          <p class="landing-section-subtitle">Lựa chọn gói phù hợp với nhu cầu doanh nghiệp</p>
          <div class="landing-pricing-grid">
            ${product.plans.map(plan => `
              <div class="landing-pricing-card ${plan.popular ? 'popular' : ''}">
                <div class="pricing-header">
                  <h3>${plan.name}</h3>
                  <div class="price">${plan.price}đ</div>
                  <div class="price-sub">${plan.period}</div>
                </div>
                <div class="pricing-body">
                  <ul>
                    <li><i class="fas fa-check"></i> Đầy đủ tính năng</li>
                    <li><i class="fas fa-check"></i> Hỗ trợ 24/7</li>
                    <li><i class="fas fa-check"></i> Bảo mật tuyệt đối</li>
                    ${plan.total ? `<li><i class="fas fa-tag"></i> Tổng tiền: <strong>${plan.total}đ</strong></li>` : ''}
                  </ul>
                </div>
                <div class="pricing-footer">
                  <button class="btn ${plan.popular ? 'btn-danger' : 'btn-outline-danger'}" onclick="openConsultationModal('${product.fullName}')">
                    <i class="fas fa-phone-alt"></i> Nhận tư vấn
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="landing-section">
        <div class="container">
          <h2 class="landing-section-title">KHÁCH HÀNG NÓI GÌ VỀ CHÚNG TÔI</h2>
          <p class="landing-section-subtitle">Sự hài lòng của khách hàng là thành công của chúng tôi</p>
          <div class="testimonials-grid">
            ${product.testimonials.map(t => `
              <div class="testimonial-card">
                <p class="text">${t.text}</p>
                <div class="author">
                  <div class="avatar">${t.name.charAt(3)}</div>
                  <div>
                    <div class="name">${t.name}</div>
                    <div class="role">${t.role}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="landing-cta-section">
        <div class="container">
          <h2>Bạn cần tư vấn?</h2>
          <p>Để lại thông tin, chúng tôi sẽ liên hệ và tư vấn giải pháp phù hợp nhất cho doanh nghiệp của bạn</p>
          <button class="btn btn-lg" onclick="openConsultationModal('${product.fullName}')">
            <i class="fas fa-phone-alt"></i> Nhận tư vấn ngay
          </button>
        </div>
      </section>
    </div>
  `;
}
