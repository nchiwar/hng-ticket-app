# TicketMaster Pro – React + Vite

**Fully functional ticket management app** built with **React 18 + Vite + React Router**.

---

## Features

- **Wavy hero section** with SVG background
- **Decorative circles** (2+)
- **Max-width: 1440px**, centered layout
- **Login / Signup** (simulated with `localStorage`)
- **Protected routes** (`dashboard`, `tickets`)
- **Dashboard** with ticket stats
- **CRUD Tickets** (Create, Read, Update*, Delete)
  - Title (required)
  - Status: `open`, `in_progress`, `closed`
  - Description (optional)
- **Toast notifications** (success/error)
- **Responsive design** (mobile, tablet, desktop)
- **Accessibility**: Semantic HTML, focus states
- **Status tags**: Green (open), Amber (in_progress), Gray (closed)

---

## Test Credentials

| Field | Value |
|------|-------|
| **Email** | `test@example.com` |
| **Password** | `password` |

> *Signup uses same credentials as login (mock auth)*

---

## Tech Stack

| Tool | Version |
|------|--------|
| React | `^18.2.0` |
| Vite | `^5.0.0` |
| React Router | `^6.22.0` |
| LocalStorage | `ticketapp_session`, `tickets` |

