# Hot Meal Ba Website Design🥟

The winning website design for the **VibeUI Design Competition** hosted alongside Digitex in **Faculty of Computing, UTM on 15th June 2026.**

This is a campus food ordering platform for the restaurant **Hot Meals Ba** that lets students browse a menu, place an order, track its delivery in real time, and even sign up to become a student seller. The site is built as a fast, mobile-friendly web app with a hand-stamped, vintage-postal visual theme.

## License

**All Rights Reserved.**

[![License: All Rights Reserved](https://img.shields.io/badge/License-All%20Rights%20Reserved-lightgrey.svg)]()

© 2026 Rahbab Chowdhiry. All rights reserved.

This source code is provided for viewing purposes only. No part of this repository may be copied, modified, distributed, or used to create derivative works without the prior written permission of the copyright holder.

## Features

- **Menu & cart** — Browse dumplings and meals by filling and category, add items to a cart, and adjust quantities on the fly.
- **Checkout** — A guided checkout flow for placing orders for delivery to campus colleges (KTF, Alumni, KTC, KTHO, KTR).
- **Order tracking** — Look up an order by ID or delivery ID and follow its progress through Placed → Packed → Out for Delivery → Delivered.
- **Seller Desk** — An internal dashboard for managing delivery records, order status, and settlement across hundreds of orders.
- **Sell With Us** — A sign-up flow for UTM students who want to earn extra income as Hot Meal Bar sellers.
- **GrabFood integration** — A placeholder page for an upcoming GrabFood delivery partnership.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) (React 19) — full-stack framework
- [TanStack Router](https://tanstack.com/router) — file-based routing
- [TanStack Query](https://tanstack.com/query) & [TanStack Virtual](https://tanstack.com/virtual) — data fetching and list virtualization
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [shadcn/ui](https://ui.shadcn.com/) on [Radix UI](https://www.radix-ui.com/) primitives — accessible UI components
- [Vite](https://vitejs.dev/) — build tooling
- [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) — form handling and validation
- Deployed on [Cloudflare Workers](https://workers.cloudflare.com/) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js with npm

### Installation

```bash
git clone https://github.com/mrc2rules/hotmealba.git
cd hotmealba
bun install
# or: npm install
```

### Development

```bash
bun dev
# or: npm run dev
```

This starts the Vite dev server with hot module reloading.

### Build & Preview

```bash
bun run build      # Build for production
bun run preview    # Preview the production build locally
```

### Linting & Formatting

```bash
bun run lint       # Run ESLint
bun run format     # Format with Prettier
```

## Project Structure

```
src/
├── assets/        # Images and static assets
├── components/    # Shared UI components (cart, stamp/branding, etc.)
├── data/          # Static/mock data (menu items, orders)
├── hooks/         # Custom React hooks
├── lib/           # Utilities and helpers
├── routes/        # File-based routes (TanStack Router)
│   ├── index.tsx      # Home page
│   ├── menu.tsx        # Dumpling menu & cart
│   ├── checkout.tsx    # Checkout flow
│   ├── orders.tsx      # Seller Desk dashboard
│   ├── track.tsx        # Order tracking
│   ├── sell.tsx          # Become a seller
│   └── grabfood.tsx       # GrabFood integration (coming soon)
├── server.ts      # Server entry point
└── start.ts       # TanStack Start entry point
```

## Deployment

This project is configured to deploy to Cloudflare Workers via `wrangler.jsonc`. After building, deploy with:

```bash
wrangler deploy
```
