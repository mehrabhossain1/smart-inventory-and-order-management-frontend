# Smart Inventory & Order Management System - Frontend

A modern, responsive dashboard application for managing products, stock levels, customer orders, and fulfillment workflows with real-time validation and conflict handling.

## Live URLs

- **Frontend**: [https://smart-inventory-and-order-managemen-mu.vercel.app](https://smart-inventory-and-order-managemen-mu.vercel.app)
- **Backend API**: [https://smart-inventory-and-order-management.onrender.com](https://smart-inventory-and-order-management.onrender.com)
- **API Docs**: [https://smart-inventory-and-order-management.onrender.com/api-docs](https://smart-inventory-and-order-management.onrender.com/api-docs)

## Demo Credentials

| Role    | Email             | Password   |
| ------- | ----------------- | ---------- |
| Admin   | `demo@admin.com`  | `demo1234` |

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

## Tech Stack

| Layer         | Technology                                          |
| ------------- | --------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                             |
| Language      | TypeScript 5                                        |
| UI Components | shadcn/ui (Radix UI primitives)                     |
| Styling       | Tailwind CSS 4                                      |
| State         | Zustand 5 (auth store + global UI state)            |
| HTTP Client   | Custom fetch wrapper with JWT auto-attach           |
| Icons         | Lucide React                                        |
| Notifications | Sonner (toast notifications)                        |
| Animation     | Framer Motion                                       |
| Fonts         | Geist, Roboto, Viga (via next/font)                 |

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
NEXT_PUBLIC_API_URL=https://stock-sales-management-backend.onrender.com/api
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
│       └── activity/page.tsx
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
│   └── activity/                   # Activity timeline
├── helpers/
│   ├── constant/index.ts           # Sidebar links, status colors, demo credentials
│   └── index.ts                    # Formatters (currency, date, relative time, action labels)
├── lib/
│   ├── api-client.ts               # Centralized fetch wrapper with auth
│   └── utils.ts                    # cn() utility for class merging
├── shared/
│   ├── layouts/                    # AuthLayout, Sidebar, DashboardHeader
│   ├── providers/auth-provider.tsx # Route guard with token hydration
│   └── types/index.ts             # All TypeScript interfaces
└── store/
    ├── auth-store.ts               # Zustand auth state
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
