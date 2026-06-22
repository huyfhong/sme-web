class Router {
  constructor() {
    this.routes = {};
    this.currentPath = null;
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  addRoute(path, handler) {
    const pattern = path.replace(/:([^/]+)/g, '(?<$1>[^/]+)');
    this.routes[path] = {
      pattern: new RegExp(`^${pattern}$`),
      handler,
      paramNames: [...path.matchAll(/:([^/]+)/g)].map(m => m[1]),
    };
  }

  navigate(path) {
    window.location.hash = path;
  }

  getParams(routeDef) {
    const match = window.location.hash.replace('#', '').match(routeDef.pattern);
    if (!match) return {};
    const params = {};
    routeDef.paramNames.forEach(name => {
      params[name] = match.groups?.[name] || match[name];
    });
    return params;
  }

  handleRoute() {
    document.body.classList.remove('admin-mode');
    window.scrollTo(0, 0);
    const path = getHashPath();
    if (path === this.currentPath) return;
    this.currentPath = path;

    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div class="page-loading"><div class="spinner"></div></div>';

    for (const [, route] of Object.entries(this.routes)) {
      if (route.pattern.test(path)) {
        const params = this.getParams(route);
        route.handler(params);
        return;
      }
    }

    this.show404();
  }

  show404() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
      <div class="page-404">
        <div class="container">
          <h1>404</h1>
          <p>Trang bạn tìm kiếm không tồn tại.</p>
          <button class="btn btn-danger" onclick="router.navigate('/')">Về trang chủ</button>
        </div>
      </div>
    `;
  }

  init() {
    this.handleRoute();
  }
}
