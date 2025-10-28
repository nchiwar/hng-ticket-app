// twig/js/app.js
class TicketApp {
  static init() {
    this.checkAuth();
    this.highlightActiveLink();
    this.bindForms();
    this.renderDashboardStats();
    this.renderTickets();
  }

  static checkAuth() {
    const path = location.pathname.split('/').pop();
    const protectedPages = ['dashboard.html', 'tickets.html'];
    if (protectedPages.includes(path) && !localStorage.getItem('ticketapp_session')) {
      location.href = 'auth/login.html';
    }
  }

  static highlightActiveLink() {
    const path = location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
      const href = link.getAttribute('href').split('/').pop();
      link.classList.toggle('active', href === path);
    });
  }

  static toast(msg, type = 'success') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  }

  // === AUTH ===
  static login(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pwd = document.getElementById('password').value;
    if (email === 'test@example.com' && pwd === 'password') {
      localStorage.setItem('ticketapp_session', JSON.stringify({ token: 'mock-jwt', user: email }));
      location.href = '../dashboard.html';
    } else {
      this.toast('Invalid email or password', 'error');
    }
  }

  static logout() {
    localStorage.removeItem('ticketapp_session');
    location.href = 'auth/login.html';
  }

  // === TICKETS CRUD ===
  static bindForms() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.onsubmit = this.login.bind(this);

    const ticketForm = document.getElementById('ticketForm');
    if (ticketForm) ticketForm.onsubmit = this.createTicket.bind(this);
  }

  static createTicket(e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const desc = document.getElementById('description').value.trim();
    const status = document.getElementById('status').value;

    if (!title) return this.toast('Title is required', 'error');
    if (!['open', 'in_progress', 'closed'].includes(status)) return this.toast('Invalid status', 'error');

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const newTicket = { id: Date.now(), title, description: desc, status };
    tickets.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    this.toast('Ticket created successfully!', 'success');
    e.target.reset();
    setTimeout(() => this.renderTickets(), 500);
  }

  static renderTickets() {
    const list = document.getElementById('ticketList');
    if (!list) return;

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    list.innerHTML = tickets.map(t => `
      <div class="card">
        <h3>${t.title}</h3>
        <p>${t.description || 'No description'}</p>
        <span class="tag ${t.status}">${t.status.replace('_', ' ')}</span>
        <div style="margin-top: .5rem;">
          <button class="btn small edit-btn" data-id="${t.id}">Edit</button>
          <button class="btn small" style="background: #dc3545; margin-left: .5rem;" 
                  onclick="TicketApp.deleteTicket(${t.id})">Delete</button>
        </div>
      </div>
    `).join('');
  }

  static deleteTicket(id) {
    if (!confirm('Delete this ticket?')) return;
    let tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    tickets = tickets.filter(t => t.id != id);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    this.toast('Ticket deleted', 'success');
    setTimeout(() => this.renderTickets(), 500);
  }

  static renderDashboardStats() {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const total = tickets.length;
    const open = tickets.filter(t => t.status !== 'closed').length;
    const closed = tickets.filter(t => t.status === 'closed').length;

    const totalEl = document.getElementById('total');
    const openEl = document.getElementById('open');
    const closedEl = document.getElementById('closed');

    if (totalEl) totalEl.textContent = total;
    if (openEl) openEl.textContent = open;
    if (closedEl) closedEl.textContent = closed;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => TicketApp.init());