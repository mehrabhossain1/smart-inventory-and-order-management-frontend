# Smart Inventory & Order Management System - Frontend

![Frontend CI](https://github.com/mehrabhossain1/smart-inventory-and-order-management-frontend/actions/workflows/ci.yml/badge.svg)

A modern, responsive dashboard application for managing products, stock levels, customer orders, and fulfillment workflows with real-time validation and conflict handling.

## Live URLs

- **Frontend**: [https://smart-inventory-and-order-managemen-mu.vercel.app](https://smart-inventory-and-order-managemen-mu.vercel.app)
- **Backend API**: [https://smart-inventory-and-order-management.onrender.com](https://smart-inventory-and-order-management.onrender.com)
- **API Docs**: [https://smart-inventory-and-order-management.onrender.com/api-docs](https://smart-inventory-and-order-management.onrender.com/api-docs)

## Demo Credentials

| Role    | Email                    | Password   |
| ------- | ------------------------ | ---------- |
| Admin   | `demo@admin.com`         | `demo123`  |
| Manager | `demo.manager@test.com`  | `demo123`  |

## Features

### Authentication
- Email + password signup and login
- **Demo Login** button for instant access with pre-filled credentials
- JWT-based session with auto-redirect on expiry
- Protected dashboard routes with auth guard

### Dashboard
- Real-time KPI cards: Orders Today, Pending Orders, Delivered, Low Stock Count, Revenue Today
- Product stock summary sorted by lowest stock
- Recent activity feed with relative timestamps
- Responsive grid layout adapting to all screen sizes

### Product & Category Management
- Full CRUD for categories and products (admin only)
- Products display: name, category, price, quantity, threshold, and status badges
- Low stock warning indicators on products approaching threshold
- **Search** products by name
- **Filter** by category and stock status (Active / Out of Stock)
- **Pagination** for large product datasets

### Order Management
- Create orders with **dynamic product rows** (add/remove items)
- Auto-calculated subtotals and order total
- **Real-time conflict detection**:
  - Duplicate product warning: *"This product is already added to the order."*
  - Out-of-stock blocking: *"This product is currently unavailable."*
  - Insufficient stock warning: *"Only X items available in stock."*
- Order detail view with full item breakdown
- **Status workflow**: Pending > Confirmed > Shipped > Delivered
- One-click status transitions with confirmation dialogs
- Order cancellation with stock restoration
- Filter orders by status and date range

### Restock Queue
- Auto-populated queue for products below minimum stock threshold
- Priority badges: **High** (0 stock), **Medium** (below half threshold), **Low** (below threshold)
- Sorted by lowest stock first
- Restock dialog to add inventory with quantity input
- Manual queue removal option

### Activity Log
- Timeline of recent system actions (latest 10-20)
- Action-specific icons for visual scanning
- Relative timestamps with exact time on hover
- Tracks: order creation, status changes, cancellations, stock updates, restocks, product changes

### Role-Based Access Control
| Feature            | Admin | Manager |
| ------------------ | ----- | ------- |
| View Dashboard     | Yes   | Yes     |
| Create Orders      | Yes   | Yes     |
| Manage Order Status| Yes   | Yes     |
| Create/Edit/Delete Products | Yes | No |
| Create/Edit/Delete Categories | Yes | No |
| Restock Products   | Yes   | No      |
| View Activity Log  | Yes   | Yes     |
| Messages           | Yes   | Yes     |

---

## Advanced Features

### Dark Mode
- System-preference detection + manual toggle (sun/moon icon in header)
- Full dark theme across every component, table, card, dialog, and chart
- Persists user preference in localStorage via `next-themes`

### Analytics Dashboard (Recharts)
- **Revenue Trend** — line chart showing daily revenue for the last 7 days
- **Orders by Status** — donut chart with legend (Pending, Confirmed, Shipped, Delivered, Cancelled)
- **Top Selling Products** — horizontal bar chart, top 5 products by units sold
- **Stock Level Overview** — color-coded bar chart (red = out of stock, amber = low, green = healthy)
- Powered by a dedicated `GET /api/dashboard/analytics` endpoint with MongoDB aggregation pipelines

### Real-Time Updates (WebSocket)
- **Socket.io** integration with JWT-authenticated connections
- Live toast notifications when orders are created, statuses change, or stock updates
- **Auto-refresh** — products, orders, and restock tables update in real-time without manual reload
- Connection status indicator (green wifi icon) in the header
- Custom `useSocketRefresh` hook for declarative event-driven data fetching

### Persistent Notification System
- **Notification bell** in header with unread count badge
- **Slide-out notification panel** (Sheet) with full history
- Color-coded icons per notification type (order, stock, restock)
- Click to navigate directly to the related entity (order detail, products page, etc.)
- **Mark as read** (single or all) + **delete** individual notifications
- Backend: MongoDB `Notification` model with 30-day TTL auto-cleanup
- Targeted delivery via Socket.io user rooms (`user:<id>`)

### Real-Time Messaging
- **Admin <-> Manager** direct messaging for inventory coordination
- Full chat UI: contact list with search, message bubbles, timestamps, read receipts (single/double checkmarks)
- **Typing indicator** ("typing..." shown in real-time)
- **Online status** (green dot on avatar + "online" text)
- **Unread message badges** — header icon (green badge) + sidebar nav link (purple badge)
- Toast notifications with sender name and message preview when not on messages page
- Messages persist in MongoDB with compound indexes for fast conversation queries

### PDF/CSV Export
- **Orders page** — "CSV" button exports filtered orders as spreadsheet
- **Order detail** — "Download Invoice" generates branded PDF with item table and total
- **Products page** — "CSV" button exports product inventory
- Uses `jspdf` + `jspdf-autotable` for PDF, native Blob API for CSV

### Debounced Search
- Product search waits 400ms after typing stops before making API calls
- Prevents excessive requests on every keystroke

---

## Testing

### Frontend Tests (Vitest + Happy-DOM)
```bash
npm test        # 21 tests across 3 suites
```
- **Utility tests** — formatCurrency, formatDate, formatRelativeTime, formatActionLabel, truncateId
- **Store tests** — auth store hydration, localStorage handling, error clearing
- **Export tests** — CSV generation, comma/quote escaping, empty data handling

### CI/CD (GitHub Actions)
- Automated pipeline on every push/PR to `main`
- Runs: lint > tests > build
- Tests on Node.js 20 + 22
- Status badge at top of this README

## Tech Stack

| Layer         | Technology                                          |
| ------------- | --------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                             |
| Language      | TypeScript 5                                        |
| UI Components | shadcn/ui (Radix UI primitives)                     |
| Styling       | Tailwind CSS 4                                      |
| State         | Zustand 5 (auth, notifications, messages, UI)       |
| Real-Time     | Socket.io Client (WebSocket)                        |
| Charts        | Recharts 3                                          |
| HTTP Client   | Custom fetch wrapper with JWT auto-attach           |
| Theme         | next-themes (dark mode + system detection)          |
| Export        | jsPDF + jspdf-autotable (PDF), native Blob (CSV)    |
| Testing       | Vitest + Testing Library + Happy-DOM                |
| CI/CD         | GitHub Actions (lint, test, build)                  |
| Icons         | Lucide React                                        |
| Notifications | Sonner (toast) + custom notification panel          |
| Fonts         | Viga (primary), Geist, Roboto (via next/font)       |

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/mehrabhossain1/smart-inventory-and-order-management-frontend
cd smart-inventory-and-order-management-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
NEXT_PUBLIC_API_URL=https://smart-inventory-and-order-management.onrender.com/api
```

For local backend development:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Run

```bash
npm run dev       # Development server at http://localhost:3000
npm run build     # Production build
npm start         # Serve production build
npm run lint      # Run ESLint
npm test          # Run test suite (21 tests)
npm run test:watch # Run tests in watch mode
```

## Project Structure

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── layout.tsx                  # Auth guard + sidebar shell
│   └── dashboard/
│       ├── page.tsx                # Dashboard home
│       ├── categories/page.tsx
│       ├── products/page.tsx
│       ├── orders/page.tsx
│       ├── orders/[id]/page.tsx    # Order detail
│       ├── restock/page.tsx
│       ├── activity/page.tsx
│       └── messages/page.tsx
├── layout.tsx                      # Root layout with fonts
├── page.tsx                        # Redirects to /login
└── globals.css

src/
├── components/ui/                  # shadcn/ui components (Button, Input, Dialog, Table, etc.)
├── config/
│   ├── api-endpoints.ts            # All backend endpoint paths
│   └── paths.ts                    # Frontend route constants
├── features/                       # Domain-driven feature modules
│   ├── auth/                       # Login & Register forms
│   ├── dashboard/                  # Stat cards, product summary, activity feed
│   ├── categories/                 # Category CRUD with dialog forms
│   ├── products/                   # Product CRUD with search/filter/pagination
│   ├── orders/                     # Order list, create dialog, detail with status flow
│   ├── restock/                    # Restock queue with restock dialog
│   ├── activity/                   # Activity timeline
│   ├── notifications/              # Bell icon + slide-out notification panel
│   └── messages/                   # Real-time chat UI with contact list
├── helpers/
│   ├── constant/index.ts           # Sidebar links, status colors, demo credentials
│   └── index.ts                    # Formatters (currency, date, relative time, action labels)
├── lib/
│   ├── api-client.ts               # Centralized fetch wrapper with auth
│   ├── socket.ts                   # Socket.io connection manager
│   ├── use-debounce.ts             # Debounce hook for search
│   ├── use-socket-refresh.ts       # Auto-refresh hook on socket events
│   ├── export-csv.ts               # CSV download utility
│   ├── export-pdf.ts               # PDF invoice/report generation
│   └── utils.ts                    # cn() utility for class merging
├── shared/
│   ├── layouts/                    # AuthLayout, Sidebar, DashboardHeader
│   ├── providers/
│   │   ├── auth-provider.tsx       # Route guard with token hydration
│   │   └── socket-provider.tsx     # WebSocket connection + event handling
│   └── types/index.ts             # All TypeScript interfaces
└── store/
    ├── auth-store.ts               # Authentication state
    ├── notification-store.ts       # Notification state + unread count
    ├── message-store.ts            # Message unread count
    └── index.ts                    # Global UI state (sidebar toggle)
```

## Challenges & Problem-Solving

### 1. Real-Time Conflict Detection in Order Creation
The order creation form needed to validate multiple constraints simultaneously as the user builds the order: duplicate product detection, out-of-stock blocking, and insufficient stock warnings -- all while keeping the UI responsive. The solution involved computing validation warnings on every state change against the live product list fetched from the API, filtering available products dynamically per row, and disabling submission until all conflicts resolve. This required careful state orchestration across dynamic form rows without introducing lag.

### 2. Optimistic Stock Consistency Across Views
When a user creates an order, stock is deducted on the backend. But the product list, dashboard, and restock queue all display stock levels independently. Ensuring that navigating between these pages reflects the latest stock state -- without over-fetching or introducing stale data -- required designing each feature module with its own data-fetching lifecycle while sharing a centralized API client that handles token expiry and session invalidation uniformly.

### 3. Multi-Step Order Status Workflow with Guard Rails
Orders follow a strict state machine: Pending > Confirmed > Shipped > Delivered, with cancellation only allowed from Pending or Confirmed. The frontend needed to dynamically compute which status transitions are valid for any given order and present only the relevant action buttons, while also handling the edge case where a stock re-verification might fail during confirmation (e.g., if another order depleted stock in the meantime).

### 4. Role-Based UI Without Route Duplication
Rather than building separate admin/manager page variants, the app conditionally renders CRUD controls based on the authenticated user's role from the Zustand auth store. This kept the codebase lean but required careful attention to ensure that every create/edit/delete button, action menu, and form dialog checks role permissions consistently across all feature modules.

### 5. Authentication Hydration & Flash Prevention
With JWT stored in localStorage and a client-rendered dashboard, there's a window between page load and token hydration where the app doesn't know if the user is authenticated. Without handling this, users would see a brief flash of the login page before being redirected to the dashboard. The auth provider implements a hydration gate pattern -- showing a loading spinner until the token is verified, preventing any unauthorized content flash.

### 6. Mapping Backend Response Shapes to Frontend Types
The backend API returns data in varying structures -- nested under different keys (`dashboard.ordersByStatus`, `queue`, `logs`), with different casing conventions, and with Mongoose-populated references that change shape depending on the endpoint. Building a typed API client that correctly maps every response shape to strict TypeScript interfaces required reading every backend controller and model to match field names exactly, catching subtle mismatches like `id` vs `_id` and `lowStockItemsCount` vs `lowStockItems`.

## Author

Made by **Mehrab Hossain**
