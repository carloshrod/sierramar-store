# sierramar-store

Frontend for **SierraMar Café**: a specialty coffee storefront and blog. Built with **Next.js 16** (App Router) and powered by [sierramar-cms](../sierramar-cms) (Strapi 5) over REST.

## Stack

- Next.js 16 · React 19 · TypeScript · Tailwind CSS · shadcn/ui
- TanStack Query (server state) · Zustand (UI state: cart, modals, filters)
- React Hook Form + Zod (forms) · MercadoPago Checkout Pro (payments)

## Getting started

The CMS must be running at `http://localhost:1337` (see its README).

```bash
npm install
cp env.example .env.local   # then fill in the values (see below)
npm run dev                 # http://localhost:3000
```

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_STRAPI_URL` | CMS URL (`http://localhost:1337`). |
| `NEXT_PUBLIC_APP_URL` | Public URL of this app (`http://localhost:3000`). |
| `STRAPI_API_TOKEN` | Strapi API token (Settings → API Tokens). Needs read access to catalog/blog and write access to orders. |
| `MERCADOPAGO_ACCESS_TOKEN` | Access token (test or production) of your MercadoPago app. Without it the catalog works, but checkout fails. |
| `MERCADOPAGO_WEBHOOK_SECRET` | Webhook signing secret. Optional locally. |

Next.js does not hot-reload environment variables: restart `npm run dev` after changing them.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home |
| `/store`, `/store/[slug]` | Filterable catalog and product detail with variant picker (grind × weight) |
| `/cart`, `/checkout` | Persistent cart and MercadoPago checkout |
| `/checkout/{success,pending,failure}` | Return pages from MercadoPago |
| `/account` | User account and orders (OTP login) |
| `/blog`, `/blog/posts/[slug]`, `/blog/categories/[slug]` | Blog |
| `/historia` | Brand story page |
| `/api/webhooks/mercadopago` | Payment webhook: updates the order and inventory in the CMS |

## Structure

```
src/
├── app/            # routes (App Router)
├── components/     # UI by domain: shop, blog, account, forms, layout, ui (shadcn)
├── lib/
│   ├── api/        # the only place that talks to Strapi
│   ├── actions/    # Server Actions (auth, checkout)
│   ├── hooks/      # TanStack Query hooks
│   ├── schemas/    # Zod validations
│   └── types/      # shared types
└── store/          # Zustand stores
```

## Notes

- **Auth**: passwordless. The user requests an OTP code by email, verifies it and receives a JWT stored in a cookie; a password can optionally be set from `/account`.
- **Payments**: checkout creates the order in Strapi (which reserves stock) and redirects to MercadoPago; the webhook confirms or reverts based on the outcome.
- **Resilience**: the home page degrades gracefully if the CMS is unavailable.

## Scripts

```bash
npm run dev     # development
npm run build   # production build
npm run start   # serve the build
npm run lint    # eslint
```
