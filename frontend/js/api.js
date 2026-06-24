const api = {
  async request(url, options) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      ...options,
    };
    const isAdmin = url.startsWith('/admin/');
    const token = isAdmin ? localStorage.getItem('admin_token') : localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}${url}`, config);
      const data = await response.json();
      if (!response.ok) {
        throw { status: response.status, ...data };
      }
      return data;
    } catch (error) {
      if (error.status === 401) {
        if (isAdmin) {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_user');
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      throw error;
    }
  },

  get(url, params) {
    let queryString = '';
    if (params) {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== null && v !== undefined && v !== '')
      );
      const qs = new URLSearchParams(cleanParams).toString();
      if (qs) queryString = `?${qs}`;
    }
    return this.request(`${url}${queryString}`, { method: 'GET' });
  },

  post(url, data) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put(url, data) {
    return this.request(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete(url) {
    return this.request(url, { method: 'DELETE' });
  },

  getBanners() {
    return this.get('/banners');
  },
  getCategories() {
    return this.get('/categories');
  },
  getProducts(params) {
    return this.get('/products', params);
  },
  getProductDetail(id) {
    return this.get(`/products/${id}`);
  },
  getFeaturedProducts() {
    return this.get('/products', { featured: 1, limit: 8 });
  },
  getTestimonials() {
    return this.get('/testimonials');
  },
  getPartners() {
    return this.get('/partners');
  },

  getNews(params) {
    return this.get('/news', params);
  },
  getNewsDetail(slug) {
    return this.get(`/news/${slug}`);
  },
  getNewsCategories() {
    return this.get('/news-categories');
  },

  getLandingPage(alias) {
    return this.get(`/landing-pages/${alias}`);
  },

  login(data) {
    return this.post('/auth/login', data);
  },
  register(data) {
    return this.post('/auth/register', data);
  },
  logout() {
    return this.post('/auth/logout');
  },
  getUserProfile() {
    return this.get('/user/profile');
  },

  getFAQs() {
    return this.get('/faqs');
  },
  getSupportCategories() {
    return this.get('/support/categories');
  },

  submitConsultation(data) {
    return this.post('/consultation', data);
  },

  // --- Admin ---
  getAdminConsultations() {
    return this.get('/admin/consultations');
  },
  updateConsultationStatus(id, status) {
    return this.put(`/admin/consultations/${id}`, { status });
  },
  getAdminUsers() {
    return this.get('/admin/users');
  },

  adminLogin(data) {
    return this.post('/auth/admin-login', data);
  },

  // --- Admin Products ---
  getAdminProducts(params) {
    return this.get('/admin/products', params);
  },
  getAdminProduct(id) {
    return this.get(`/admin/products/${id}`);
  },
  createAdminProduct(data) {
    return this.post('/admin/products', data);
  },
  updateAdminProduct(id, data) {
    return this.put(`/admin/products/${id}`, data);
  },
  deleteAdminProduct(id) {
    return this.delete(`/admin/products/${id}`);
  },
  updateAdminProductDetails(id, data) {
    return this.put(`/admin/products/${id}/details`, data);
  },
  createAdminPackage(productId, data) {
    return this.post(`/admin/products/${productId}/packages`, data);
  },
  updateAdminPackage(id, data) {
    return this.put(`/admin/packages/${id}`, data);
  },
  deletePackage(id) {
    return this.delete(`/admin/packages/${id}`);
  },

  // --- Admin Staff ---
  getStaff() {
    return this.get('/staff');
  },
  getAdminStaff() {
    return this.get('/admin/staff');
  },
  getAdminStaffById(id) {
    return this.get(`/admin/staff/${id}`);
  },
  createAdminStaff(data) {
    return this.post('/admin/staff', data);
  },
  updateAdminStaff(id, data) {
    return this.put(`/admin/staff/${id}`, data);
  },
  deleteAdminStaff(id) {
    return this.delete(`/admin/staff/${id}`);
  },
};
