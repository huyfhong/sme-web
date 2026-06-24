
// REGISTER PAGE

function renderRegister() {
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
          <h2>Đăng ký tài khoản</h2>
          <p>Đăng ký để trải nghiệm các dịch vụ của SME HUB</p>
        </div>
        <form id="register-form">
          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <input type="text" class="form-control" placeholder="Nhập họ tên" id="reg-name">
          </div>
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="Nhập email" id="reg-email">
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input type="tel" class="form-control" placeholder="Nhập số điện thoại" id="reg-phone">
          </div>
          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input type="password" class="form-control" placeholder="Nhập mật khẩu" id="reg-password">
          </div>
          <div class="mb-3">
            <label class="form-label">Xác nhận mật khẩu</label>
            <input type="password" class="form-control" placeholder="Xác nhận mật khẩu" id="reg-confirm">
          </div>
          <button type="submit" class="btn btn-danger btn-lg w-100" id="register-submit">
            Đăng ký
          </button>
        </form>
        <div class="auth-footer">
          Đã có tài khoản? <a href="#/login">Đăng nhập</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;

    if (password !== confirm) {
      showToast('Mật khẩu xác nhận không khớp', 'error');
      return;
    }

    const submitBtn = document.getElementById('register-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Đang xử lý...';

    try {
      const result = await api.register({ name, email, phone, password, password_confirmation: confirm });
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user || { name }));
        showToast('Đăng ký thành công!', 'success');
        router.navigate('/');
        renderHeader();
      }
    } catch (err) {
      showToast(err.message || 'Đăng ký thất bại', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Đăng ký';
    }
  });
}
