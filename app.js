/* CloudPress — app.js — 공통 유틸리티 */
'use strict';

const CP = {
  USERS_KEY: 'cp_users',
  SESSION_KEY: 'cp_session',
  SITES_KEY: 'cp_sites',

  getUsers() { return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]'); },
  saveUsers(u) { localStorage.setItem(this.USERS_KEY, JSON.stringify(u)); },

  getSession() {
    const s = JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null');
    if (s && s.expires > Date.now()) return s;
    localStorage.removeItem(this.SESSION_KEY);
    return null;
  },
  saveSession(s) { localStorage.setItem(this.SESSION_KEY, JSON.stringify(s)); },

  getCurrentUser() {
    const s = this.getSession();
    if (!s) return null;
    return this.getUsers().find(u => u.id === s.userId) || null;
  },

  getSites(userId) {
    const all = JSON.parse(localStorage.getItem(this.SITES_KEY) || '[]');
    return userId ? all.filter(s => s.userId === userId) : all;
  },
  saveSites(sites) { localStorage.setItem(this.SITES_KEY, JSON.stringify(sites)); },

  addSite(site) {
    const sites = this.getSites();
    sites.push(site);
    this.saveSites(sites);
  },
  deleteSite(id) {
    const sites = this.getSites().filter(s => s.id !== id);
    this.saveSites(sites);
  },
  updateSite(id, updates) {
    const sites = this.getSites().map(s => s.id === id ? { ...s, ...updates } : s);
    this.saveSites(sites);
  },
  getSite(id) { return this.getSites().find(s => s.id === id) || null; },

  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    window.location.href = '/';
  },
  requireAuth() {
    if (!this.getSession()) { window.location.href = '/auth.html'; return false; }
    return true;
  },
  requireGuest() {
    if (this.getSession()) { window.location.href = '/dashboard.html'; return false; }
    return true;
  },

  hashPass(p) {
    let h = 5381;
    for (let i = 0; i < p.length; i++) h = ((h << 5) + h) ^ p.charCodeAt(i);
    return 'cp_' + (h >>> 0).toString(16) + '_' + p.length;
  },
  genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); },
  genIP() {
    return `${rnd(10,200)}.${rnd(1,255)}.${rnd(1,255)}.${rnd(1,255)}`;
  },

  register(name, email, password) {
    const users = this.getUsers();
    if (users.find(u => u.email === email)) return { ok: false, msg: '이미 사용 중인 이메일입니다.' };
    const user = { id: this.genId(), name, email, password: this.hashPass(password), plan: 'free', createdAt: Date.now() };
    users.push(user);
    this.saveUsers(users);
    this._startSession(user.id);
    return { ok: true };
  },

  login(email, password) {
    const user = this.getUsers().find(u => u.email === email);
    if (!user) return { ok: false, msg: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    if (user.password !== this.hashPass(password)) return { ok: false, msg: '이메일 또는 비밀번호가 올바르지 않습니다.' };
    this._startSession(user.id);
    return { ok: true };
  },

  _startSession(userId) {
    this.saveSession({ userId, token: this.genId(), expires: Date.now() + 7 * 86400000 });
  },

  formatDate(ts) {
    return new Date(ts).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
  },

  planInfo(plan) {
    const plans = {
      starter:      { name: '스타터',      price: '9,900',  sites: 1,  storage: '20GB', color: '#6366f1' },
      pro:          { name: '프로',        price: '29,900', sites: 5,  storage: '100GB', color: '#f97316' },
      enterprise:   { name: '엔터프라이즈', price: '99,000', sites: -1, storage: '무제한', color: '#ec4899' },
      free:         { name: '무료',        price: '0',      sites: 1,  storage: '5GB',   color: '#6b7280' },
    };
    return plans[plan] || plans.free;
  }
};

function rnd(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

/* ── 공통 Toast ── */
function showToast(msg, type = 'info') {
  let el = document.getElementById('cp-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'cp-toast';
    document.body.appendChild(el);
  }
  el.className = 'cp-toast ' + type;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3000);
}
