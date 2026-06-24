
// LOGIN PAGE

function renderLogin() {
  const mainContent = document.getElementById('main-content');

  if (localStorage.getItem('token')) {
    router.navigate('/');
    return;
  }

  mainContent.innerHTML = `
    <div class="auth-page">
      <div class="auth-box">
        <div class="auth-header">
          <img src="images/viettel-logo.24b96913.svg" alt="Viettel" style="height:32px;display:block;margin:0 auto 16px">
          <h2>Đăng nhập</h2>
          <p>Đăng nhập để trải nghiệm các dịch vụ của SME HUB</p>
        </div>
        <form id="login-form">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="Nhập email của bạn" id="login-email">
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" placeholder="Nhập mật khẩu" id="login-password">
          </div>
          <button type="submit" class="btn btn-danger btn-lg w-100" id="login-submit">
            Đăng nhập
          </button>
        </form>
        <div class="auth-footer">
          Chưa có tài khoản? <a href="#/register">Đăng ký ngay</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const submitBtn = document.getElementById('login-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';

    try {
      const result = await api.login({ email, password });
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user || { name: email.split('@')[0] }));
        showToast('Đăng nhập thành công!', 'success');
        renderHeader();
        const params = getQueryParams();
        router.navigate(params.redirect || '/');
      }
    } catch (err) {
      showToast(err.message || 'Đăng nhập thất bại', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Đăng nhập';
    }
  });
}
