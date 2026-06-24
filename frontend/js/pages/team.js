async function renderTeam() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="team-page">
      <div class="container">
        <h2 class="team-title">Giới thiệu nhân viên</h2>
        <p class="team-subtitle">Đội ngũ chuyên nghiệp, tận tâm, sẵn sàng hỗ trợ bạn</p>
        <div class="team-grid" id="team-grid">
          <div class="text-center py-5"><div class="spinner-border text-danger" role="status"></div></div>
        </div>
      </div>
    </div>
  `;

  try {
    const res = await api.get('/staff');
    const list = Array.isArray(res) ? res : (res.data || []);
    const grid = document.getElementById('team-grid');
    if (!list.length) {
      grid.innerHTML = '<p class="text-center text-muted py-5">Chưa có thông tin nhân viên.</p>';
      return;
    }
    grid.innerHTML = list.map(s => `
      <div class="team-card">
        <div class="team-avatar-wrap">
          ${s.avatar
            ? `<div class="team-avatar team-avatar-img" style="background-image: url('${s.avatar.startsWith('http') || s.avatar.startsWith('images/') ? s.avatar : 'images/' + s.avatar}')"></div>`
            : `<div class="team-avatar team-avatar-placeholder">${s.name.charAt(0).toUpperCase()}</div>`
          }
        </div>
        <div class="team-card-body">
          <h3 class="team-name">${escapeHtml(s.name)}</h3>
          <div class="team-position">${escapeHtml(s.position || '')}</div>
          ${s.phone ? `<div class="team-info"><i class="fas fa-phone"></i> ${escapeHtml(s.phone)}</div>` : ''}
          ${s.email ? `<div class="team-info"><i class="fas fa-envelope"></i> ${escapeHtml(s.email)}</div>` : ''}
        </div>
      </div>
    `).join('');
  } catch (err) {
    document.getElementById('team-grid').innerHTML = '<p class="text-center text-muted py-5">Không thể tải danh sách nhân viên.</p>';
  }
}
