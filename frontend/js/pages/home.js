async function renderHome() {
  const mainContent = document.getElementById('main-content');

  let banners, testimonials, stats, categories, featuredProducts;
  try {
    const res = await Promise.all([
      api.getBanners().catch(() => null),
      api.getTestimonials().catch(() => null),
      api.getPartners().catch(() => null),
      api.get('/statistics').catch(() => null),
      api.getCategories().catch(() => null),
      api.getProducts({ limit: 12 }).catch(() => null),
    ]);
    banners = res[0];
    testimonials = res[1];
    stats = res[3];
    categories = res[4];
    featuredProducts = (res[5] && res[5].data) ? res[5].data : res[5];
  } catch (e) {
    // API failed, use fallback
  }

  mainContent.innerHTML = `
    <!-- Hero -->
    <section class="hero-section">
      <div class="hero-carousel" id="hero-carousel">
        <div class="hero-carousel-track" id="hero-carousel-track">
          ${generateHeroSlides(banners)}
        </div>
        <div class="hero-dots" id="hero-dots"></div>
      </div>
    </section>

    <!-- SME HUB là gì? -->
    <section class="sme-intro-section">
      <div class="container">
        <div class="section-title-split">
          <span class="red">SME HUB</span> <span class="dark">là gì ?</span>
        </div>
        <p class="section-subtitle-split">Tìm hiểu về Hệ sinh thái số dành cho doanh nghiệp SME</p>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          <div class="col">
            <div class="icon-card">
              <img src="images/sme_hub_introduction_icon_1.png" alt="icon">
              <p>SME Hub cung cấp hệ sinh thái hỗ trợ toàn diện từ tư vấn tới cung cấp các giải pháp chuyển đổi số tùy chỉnh theo nhu cầu</p>
            </div>
          </div>
          <div class="col">
            <div class="icon-card">
              <img src="images/sme_hub_introduction_icon_3.png" alt="icon">
              <p>SME Hub giúp doanh nghiệp tiết kiệm thời gian và chi phí trong vận hành</p>
            </div>
          </div>
          <div class="col">
            <div class="icon-card">
              <img src="images/sme_hub_introduction_icon_1.png" alt="icon">
              <p>Cam kết mang đến sự tin cậy và bảo mật cho mọi giao dịch và dữ liệu</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DỊCH VỤ CHẤT LƯỢNG -->
    <section class="services-section">
      <div class="container">
        <div class="services-card">
          <div class="services-header">
            <div class="section-title-split" style="margin-bottom:0;text-align:left">
              <span class="dark">DỊCH VỤ</span> <span class="red">CHẤT LƯỢNG</span>
            </div>
            <div class="pill-search">
              <input type="text" placeholder="Bạn đang tìm gì..." id="service-search">
              <button class="btn-pill-consult-outline" onclick="openConsultationModal()">Nhận tư vấn</button>
            </div>
          </div>
          <div class="product-category-carousel" id="product-category-carousel">
            <div class="product-category-track" id="product-category-track">
              ${generateProductCategorySlides(categories, featuredProducts)}
            </div>
            <div class="carousel-dots" id="category-dots"></div>
          </div>
          <div style="text-align:center;margin-top:32px">
            <button class="btn-view-more" onclick="router.navigate('/market-place')">
              Xem thêm tại Chợ Ứng dụng <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VÌ SAO CHỌN SME HUB -->
    <section class="why-section">
      <div class="container">
        <div class="section-title-split">
          <span class="red">VÌ SAO CHỌN</span> <span class="dark">SME HUB CỦA VIETTEL?</span>
        </div>
        <p class="section-subtitle-split">Những lý do khiến doanh nghiệp tin tưởng lựa chọn chúng tôi</p>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div class="col">
            <div class="why-card">
              <div class="why-card-icon">
                <img src="images/sme_hub_introduction_icon_1.png" alt="Quality">
              </div>
              <h3 class="why-card-title">Chất lượng đảm bảo</h3>
              <p class="why-card-desc">Sản phẩm và dịch vụ đạt tiêu chuẩn chất lượng cao, được kiểm định bởi các tổ chức uy tín</p>
            </div>
          </div>
          <div class="col">
            <div class="why-card">
              <div class="why-card-icon">
                <img src="images/sme_hub_introduction_icon_1.png" alt="Payment">
              </div>
              <h3 class="why-card-title">Thanh toán linh hoạt</h3>
              <p class="why-card-desc">Đa dạng phương thức thanh toán, hỗ trợ trả góp và thanh toán theo tháng</p>
            </div>
          </div>
          <div class="col">
            <div class="why-card">
              <div class="why-card-icon">
                <img src="images/sme_hub_introduction_icon_1.png" alt="Support">
              </div>
              <h3 class="why-card-title">Hỗ trợ tận tâm</h3>
              <p class="why-card-desc">Đội ngũ CSKH chuyên nghiệp, hỗ trợ 24/7 mọi lúc mọi nơi</p>
            </div>
          </div>
        </div>
        <div class="why-video-wrap" id="why-video">
          <iframe src="https://www.youtube.com/embed/lcONWHcvE08" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
      </div>
    </section>

    <!-- THỐNG KÊ VỀ CHÚNG TÔI -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-layout">
          <div class="stats-left">
            <div class="section-title-split" style="text-align:left;margin-bottom:40px">
              <span class="red">THỐNG KÊ</span> <span class="dark">VỀ CHÚNG TÔI</span>
            </div>
            <div class="stats-vertical-carousel" id="stats-vertical-carousel">
              ${generateStatVerticalItems(stats)}
            </div>
          </div>
          <div class="stats-right" id="stats-featured">
            <div class="stats-featured-content">
              <div class="stats-featured-number">0</div>
              <div class="stats-featured-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#EE0033" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>
                </svg>
              </div>
              <div class="stats-featured-label"></div>
              <div class="stats-featured-desc"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ĐỐI TÁC NÓI GÌ VỀ CHÚNG TÔI -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-title-split">
          <span class="red">ĐỐI TÁC</span> <span class="dark">NÓI GÌ VỀ CHÚNG TÔI</span>
        </div>
        <p class="section-subtitle-split">Sự hài lòng của khách hàng là động lực của chúng tôi</p>
        <div class="testimonials-layout" id="testimonials-layout">
          <div class="testimonials-main" id="testimonial-main">
            ${generateTestimonialMain(testimonials)}
          </div>
          <div class="testimonials-side" id="testimonials-side">
            ${generateTestimonialSide(testimonials)}
          </div>
        </div>
      </div>
    </section>

  `;

  const searchInput = document.getElementById('service-search');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        router.navigate('/market-place?search=' + encodeURIComponent(e.target.value));
      }
    });
  }

  initHeroCarousel();
  initServiceCarousel();
  initStatsCarousel();
}

function generateHeroSlides(banners) {
  const fallback = [
    { image: 'images/sme_hub_banner.png', title: 'Banner 1' },
    { image: 'images/sme_hub_banner.png', title: 'Banner 2' },
    { image: 'images/sme_hub_banner.png', title: 'Banner 3' },
  ];
  const list = Array.isArray(banners) && banners.length ? banners : fallback;
  return list.map((b, i) => `
    <div class="hero-slide"><img src="${b.image}" alt="${b.title || 'Banner ' + (i + 1)}"></div>
  `).join('');
}

function generateProductCategorySlides(categories, products) {
  const fallback = [
    {
      title: 'Sản phẩm thiết yếu',
      products: [
        { icon: 'images/tendo_logo_update.jpeg', name: 'Tendoo', desc: 'Quản lý bán hàng thông minh' },
        { icon: 'images/vinvoice-icon.png', name: 'vInvoice', desc: 'Hóa đơn điện tử' },
        { icon: 'images/our_product_vcontract.png', name: 'VContract', desc: 'Hợp đồng điện tử' },
        { icon: 'images/tendo_logo_update.jpeg', name: 'Chữ ký số CA', desc: 'Chứng thực chữ ký số' },
      ]
    },
    {
      title: 'Sản phẩm nâng cao',
      products: [
        { icon: 'images/Logo_Viettel_Office.png', name: 'Viettel Office', desc: 'Văn phòng số' },
        { icon: 'images/Logo_1CRM.png', name: '1CRM', desc: 'Quản trị quan hệ khách hàng' },
        { icon: 'images/Logo_1HRm.png', name: '1HRM', desc: 'Quản trị nhân sự' },
        { icon: 'images/logo-easybook-1-01.png', name: 'EasyBook', desc: 'Phần mềm kế toán' },
      ]
    },
    {
      title: 'Sản phẩm đặc thù',
      products: [
        { icon: 'images/Logo_Viettel_Office.png', name: 'Cloud Server', desc: 'Máy chủ ảo đám mây' },
        { icon: 'images/tendo_logo_update.jpeg', name: 'Voice Brandname', desc: 'Cuộc gọi thương hiệu' },
        { icon: 'images/vinvoice-icon.png', name: 'Camera ND10', desc: 'Camera giám sát hành trình' },
        { icon: 'images/our_product_vcontract.png', name: 'mCC', desc: 'Tổng đài ảo doanh nghiệp' },
      ]
    },
  ];

  if (Array.isArray(categories) && categories.length && Array.isArray(products) && products.length) {
    const grouped = categories.map(cat => {
      const catProducts = products.filter(p => p.category_id === cat.id).slice(0, 4).map(p => ({
        icon: p.image ? (p.image.startsWith('images/') ? p.image : `images/${p.image}`) : 'images/tendo_logo_update.jpeg',
        name: p.name,
        desc: p.short_description || '',
      }));
      while (catProducts.length < 4) {
        catProducts.push({ icon: '', name: '', desc: '', empty: true });
      }
      return { title: cat.name, products: catProducts };
    }).filter(g => g.products.some(p => !p.empty));
    if (grouped.length) {
      return grouped.map(c => `
        <div class="product-category-slide">
          <div class="pcs-header">
            <div class="pcs-header-bg">
              <svg viewBox="0 0 400 100" preserveAspectRatio="none" width="100%" height="100%">
                <path d="M0,30 C80,100 160,0 240,30 C320,100 400,0 400,30 L400,100 L0,100 Z" fill="#EF0033" opacity="0.08"/>
                <path d="M0,50 C100,0 200,100 300,50 C350,25 380,50 400,40 L400,100 L0,100 Z" fill="#EF0033" opacity="0.04"/>
              </svg>
            </div>
            <h3>${c.title}</h3>
          </div>
          <div class="pcs-body">
              ${c.products.map(p => `
              <div class="pcs-product${p.empty ? ' is-empty' : ''}">
                <div class="pcs-product-icon"><img src="${p.icon || 'images/tendo_logo_update.jpeg'}" alt="${p.name}" onerror="this.style.display='none'"></div>
                <div class="pcs-product-info">
                  <strong>${p.name}</strong>
                  <span>${p.desc}</span>
                </div>
                ${p.empty ? '' : '<svg class="pcs-product-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('');
    }
  }

  // fallback
  return fallback.map(c => `
    <div class="product-category-slide">
      <div class="pcs-header">
        <div class="pcs-header-bg">
          <svg viewBox="0 0 400 100" preserveAspectRatio="none" width="100%" height="100%">
            <path d="M0,30 C80,100 160,0 240,30 C320,100 400,0 400,30 L400,100 L0,100 Z" fill="#EF0033" opacity="0.08"/>
            <path d="M0,50 C100,0 200,100 300,50 C350,25 380,50 400,40 L400,100 L0,100 Z" fill="#EF0033" opacity="0.04"/>
          </svg>
        </div>
        <h3>${c.title}</h3>
      </div>
      <div class="pcs-body">
        ${c.products.map(p => `
          <div class="pcs-product">
            <div class="pcs-product-icon"><img src="${p.icon}" alt="${p.name}" onerror="this.style.display='none'"></div>
            <div class="pcs-product-info">
              <strong>${p.name}</strong>
              <span>${p.desc}</span>
            </div>
            <svg class="pcs-product-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function generateStatVerticalItems(stats) {
  const fallback = [
    { number: '2000+', label: 'Giờ', description: 'Phát triển', icon: 'clock' },
    { number: '4.231+', label: 'Khách hàng', description: 'sử dụng', icon: 'users' },
    { number: '15+', label: 'Giải Thưởng', description: 'Đã nhận', icon: 'star' },
    { number: '9+', label: 'Sản phẩm', description: 'Dịch vụ', icon: 'shopping-bag' },
  ];
  const list = Array.isArray(stats) && stats.length ? stats : fallback;
  return list.map((s, i) => `
    <div class="sv-item${i === 0 ? ' active' : ''}" data-index="${i}" data-number="${s.number}" data-label="${s.label}" data-desc="${s.description}" data-icon="${s.icon || 'bar-chart'}">
      <div class="sv-item-number">${s.number}</div>
      <div class="sv-item-info">
        <strong>${s.label}</strong>
        <span>${s.description}</span>
      </div>
    </div>
  `).join('');
}

function generateTestimonialMain(testimonials) {
  let t;
  if (Array.isArray(testimonials) && testimonials.length) {
    t = testimonials[0];
  } else {
    t = {
      name: 'Nguyễn Văn An',
      role: 'Giám đốc',
      quote: 'Đội ngũ bán hàng và CSKH của Viettel rất nhiệt tình, hỗ trợ 24/7. Khi sử dụng dịch vụ của Viettel chúng tôi rất an tâm.',
      avatar: 'images/feedback_2.png',
      rating: 5,
    };
  }
  const stars = Array.from({ length: Math.round(t.rating || 5) }, () => '<i class="fas fa-star"></i>').join('');
  return `
    <div class="tm-card">
      <div class="tm-stars">${stars}</div>
      <p class="tm-quote">${t.quote}</p>
      <div class="tm-author">
        <img src="${t.avatar}" alt="${t.name}">
        <div>
          <strong>${t.name}</strong>
          <span>${t.role}</span>
        </div>
      </div>
    </div>
  `;
}

function generateTestimonialSide(testimonials) {
  let items;
  if (Array.isArray(testimonials) && testimonials.length > 1) {
    items = testimonials.slice(1);
  } else {
    items = [
      { avatar: 'images/feedback_3.png', name: 'Trần Thị Bình', role: 'Chủ doanh nghiệp', quote: 'Các giải pháp số của Viettel đã giúp doanh nghiệp chúng tôi tiết kiệm 40% chi phí vận hành.', rating: 5 },
      { avatar: 'images/feedback_3.png', name: 'Lê Văn Cường', role: 'Chủ cửa hàng', quote: 'Phần mềm quản lý bán hàng Tendoo rất dễ sử dụng, giúp tôi quản lý cửa hàng hiệu quả hơn.', rating: 4 },
    ];
  }
  return items.map((t, i) => {
    const stars = Array.from({ length: Math.round(t.rating || 5) }, () => '<i class="fas fa-star"></i>').join('');
    return `
      <div class="ts-item${i === 0 ? ' active' : ''}" data-idx="${i}">
        <div class="ts-stars">${stars}</div>
        <p class="ts-quote">${t.quote}</p>
        <div class="ts-author">
          <img src="${t.avatar}" alt="${t.name}">
          <div>
            <strong>${t.name}</strong>
            <span>${t.role}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function initHeroCarousel() {
  const track = document.getElementById('hero-carousel-track');
  const dotsContainer = document.getElementById('hero-dots');
  if (!track || !dotsContainer) return;
  const slides = track.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  const total = slides.length;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.dataset.idx = i;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  let current = 0;
  function goToSlide(idx) {
    current = idx;
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    dotsContainer.querySelectorAll('.hero-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }
  setInterval(() => {
    goToSlide((current + 1) % total);
  }, 5000);
}

function initServiceCarousel() {
  const track = document.getElementById('product-category-track');
  const dotsContainer = document.getElementById('category-dots');
  if (!track || !dotsContainer) return;
  const slides = track.querySelectorAll('.product-category-slide');
  if (!slides.length) return;
  const total = slides.length;
  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.dataset.idx = i;
    dot.addEventListener('click', () => goToPage(i));
    dotsContainer.appendChild(dot);
  }
  let current = 0;
  function goToPage(idx) {
    current = idx;
    track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }
}

function initStatsCarousel() {
  const items = document.querySelectorAll('#stats-vertical-carousel .sv-item');
  const featuredNumber = document.querySelector('#stats-featured .stats-featured-number');
  const featuredIcon = document.querySelector('#stats-featured .stats-featured-icon');
  const featuredLabel = document.querySelector('#stats-featured .stats-featured-label');
  const featuredDesc = document.querySelector('#stats-featured .stats-featured-desc');
  if (!items.length || !featuredNumber) return;
  let current = 0;
  function updateFeatured(idx) {
    items.forEach((it, i) => it.classList.toggle('active', i === idx));
    const item = items[idx];
    featuredNumber.textContent = item.dataset.number;
    featuredLabel.textContent = item.dataset.label;
    featuredDesc.textContent = item.dataset.desc;
    current = idx;
  }
  items.forEach((item, idx) => {
    item.addEventListener('click', () => updateFeatured(idx));
  });
  updateFeatured(0);
}
