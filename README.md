# RentManage - Client-Side Rental Management Platform

A lightweight, zero-dependency Single Page Application (SPA) designed to streamline landlord-tenant communication, billing calculations, and utility tracking. 

Built as a personal portfolio project to demonstrate clean frontend architecture, responsive layout design, and robust client-side state persistence without external framework overhead.

---

## 🎯 Project Core & Purpose

Managing rental properties usually involves manual ledger calculations, tracking electricity utility meters, and resolving partial payment states. **RentManage** addresses this by providing a smart, offline-first dashboard platform that handles automated rent calculations, partial invoice settlement, and carry-forward balances directly in the browser.

---

## 🚀 Key Features

### 1. Multi-Role Account Dashboards
- **System Administrator Console**: Track global metrics (total users, active property listings, system value), and manage landlord verification states.
- **Property Landlords (Owners)**: 
  - Register properties and generate unique Property Codes.
  - Dynamically add/edit rental units (features automated next-room suggestions).
  - Manage tenant leases, base rents, and security deposits.
  - Calculate monthly utility bills by inputting current electricity meter readings.
  - Record payments (supports partial values and auto-settles status badges).
  - Transition calendar months to generate new invoices while carrying forward unpaid balances.
- **Tenants**: 
  - Passwordless, secure portal access using Property Code + Room ID.
  - View real-time statements, utility usage history, and download/print summaries.

### 2. Custom Accounting Ledger Engine
- Replaces basic "paid/unpaid" flags with a formal accounting ledger.
- Formulates: $\text{Total Outstanding} = \text{Base Rent} + \text{Utility Bill} + \text{Previous Carried Dues}$.
- Dynamically computes payment statuses: `Paid`, `Partially Paid` (with live remaining balance), and `Unpaid`.
- Carries unpaid balances over automatically as previous dues to subsequent billing cycles.

### 3. Responsive SaaS Styling & Unified Theme System
- Features a split-screen login page with a high-resolution, full-cover real-estate hero banner and dark overlay.
- Consolidated **Light** and **Dark** mode theme variables.
- Designed with 100% matching sizing tokens (padding, margins, radii) to guarantee **zero layout shift (CLS)** during theme switches.
- Butter-smooth animations for theme toggling and interactive card components.

---

## 🛠️ Tech Stack & Architecture
- **HTML5 & CSS3**: Responsive CSS Grid/Flexbox layouts, custom variables, transition keyframes.
- **Vanilla ES6+ JavaScript**: Client-side SPA routing, template engine rendering, LocalStorage database engine, and accounting state logic.
- **Zero Dependencies**: Built entirely with raw web standards (no React, Vue, Tailwind, or backend servers required).

---

## 💻 Running the App Locally

Since the app is entirely client-side, setup is instant.

1. **Clone the repo**:
   ```bash
   git clone https://github.com/jrfarkade/rent-manager.git
   cd rent-manager
   ```

2. **Serve the files**:
   - Run via VS Code's **Live Server** extension.
   - Or start a quick Python local server in your terminal:
     ```bash
     python -m http.server 8080
     ```
     Navigate to `http://localhost:8080`.
     
*Designed and engineered as a personal frontend portfolio project.*
 
