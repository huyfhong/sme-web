function $(selector, context) {
  return (context || document).querySelector(selector);
}

function $$(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}

function formatCurrency(amount) {
  if (!amount) return '0đ';
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function createElement(tag, attrs, children) {
  const el = document.createElement(tag);
  if (attrs) {
    Object.entries(attrs).forEach(([key, val]) => {
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), val);
      } else if (key === 'className') {
        el.className = val;
      } else if (key === 'style' && typeof val === 'object') {
        Object.assign(el.style, val);
      } else if (key === 'innerHTML') {
        el.innerHTML = val;
      } else {
        el.setAttribute(key, val);
      }
    });
  }
  if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (Array.isArray(children)) {
      children.forEach(c => {
        if (typeof c === 'string') el.appendChild(document.createTextNode(c));
        else if (c instanceof HTMLElement) el.appendChild(c);
      });
    }
  }
  return el;
}

function getQueryParams() {
  const hash = window.location.hash;
  const qIndex = hash.indexOf('?');
  if (qIndex === -1) return {};
  const search = hash.slice(qIndex + 1);
  const params = {};
  const pairs = search.split('&');
  pairs.forEach(pair => {
    const [k, v] = pair.split('=');
    if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || '');
  });
  return params;
}

function getHashPath() {
  const hash = window.location.hash.replace('#', '') || '/';
  const qIndex = hash.indexOf('?');
  return qIndex === -1 ? hash : hash.slice(0, qIndex);
}

function showToast(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type || 'info'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-show');
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }, 100);
}
