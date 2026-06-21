# SierraMar E-commerce & Blog Documentation

## Project Overview

**SierraMar** is a premium coffee e-commerce platform with an integrated blog. It offers an elegant shopping experience and an editorial space for content about coffee, production processes, and coffee culture.

### Objectives

- Sell premium quality coffee
- Create editorial content that educates and generates engagement
- Provide a fluid and modern user experience
- Enable agile management of catalog, promotions, content and blog from the backend
- Optimize SEO and performance for conversions and organic positioning

---

## Architecture Overview

The architecture clearly separates frontend (Next.js) from backend (Strapi), with abstracted API layers and well-defined state management.

- **Next.js Frontend**: Presentation, SSR, UI state management, and blog rendering
- **Strapi Headless CMS**: Management of products, categories, blog posts, orders, and editorial content
- **Communication**: REST through abstractions in `lib/api/`

Zustand exclusively handles interface state (cart visibility, modals, filters), while TanStack Query manages all server state (products, posts, orders).

---

## Technology Stack

### Frontend

- Next.js 16+ (App Router, Server Components)
- TypeScript - Type safety
- Tailwind CSS - Utility-first styling
- shadcn/ui - Accessible components
- React Hook Form - Form management
- Zod - Schema validation

### State Management

- Zustand - UI state (cart, modals, visible filters)
- TanStack Query - Server state (Strapi data)

### Backend

- Strapi - Headless CMS with REST
- PostgreSQL - Database

### Performance & SEO

- Next.js Image Optimization
- Dynamic Metadata generation
- Server Components as default

---

## Folder Structure

```
sierramar-store/
├── src/
│   ├── app/
│   │   ├── (auth)/                    # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (shop)/                    # E-commerce store
│   │   │   ├── page.tsx               # Home
│   │   │   ├── products/
│   │   │   │   ├── page.tsx           # Product catalog
│   │   │   │   └── [slug]/page.tsx    # Product detail
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── account/
│   │   ├── (blog)/                    # Blog
│   │   │   ├── page.tsx               # Blog home
│   │   │   ├── posts/
│   │   │   │   └── [slug]/page.tsx    # Individual post
│   │   │   └── categories/
│   │   │       └── [slug]/page.tsx    # Posts by category
│   │   ├── api/                       # Route handlers if needed
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   ├── layout/                    # Header, Footer, Navigation
│   │   ├── shop/                      # E-commerce components
│   │   ├── blog/                      # Blog components
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostGrid.tsx
│   │   │   ├── BlogHeader.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   └── RelatedPosts.tsx
│   │   ├── forms/
│   │   └── common/
│   ├── lib/
│   │   ├── api/                       # API abstractions
│   │   │   ├── client.ts
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   ├── categories.ts
│   │   │   ├── auth.ts
│   │   │   ├── posts.ts               # Blog posts API
│   │   │   └── blog-categories.ts     # Blog categories
│   │   ├── hooks/                     # Custom React hooks
│   │   │   ├── useProducts.ts
│   │   │   ├── useCart.ts
│   │   │   ├── usePosts.ts            # Posts hook
│   │   │   └── useFilters.ts
│   │   ├── schemas/                   # Zod validation schemas
│   │   │   ├── checkout.ts
│   │   │   ├── auth.ts
│   │   │   ├── filters.ts
│   │   │   └── post.ts
│   │   ├── utils/
│   │   ├── constants.ts
│   │   └── types/
│   │       ├── product.ts
│   │       ├── order.ts
│   │       ├── post.ts                # Blog Post type
│   │       ├── category.ts
│   │       └── user.ts
│   ├── store/                         # Zustand stores
│   │   ├── useCartStore.ts
│   │   ├── useWishlistStore.ts
│   │   ├── useModalStore.ts
│   │   ├── useFilterStore.ts
│   │   └── useUIStore.ts
│   ├── styles/
│   │   ├── globals.css                # Tailwind + custom styles
│   │   └── variables.css              # CSS variables
│   └── proxy.ts                       # Request interception & routing
├── public/
│   ├── images/
│   └── icons/
├── env.example
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## State Management Rules

### Zustand (UI State Only)

Zustand is used **ONLY** for interface state that doesn't come from Strapi:

- Cart open/closed
- Active modals
- Wishlist visibility
- Active UI filters
- Dark mode toggle
- Sidebar visibility

### TanStack Query (Server State)

All data coming from Strapi goes in TanStack Query:

- Product list
- Product details
- Blog posts
- Categories
- User orders
- Comments

The correct combination allows components to access UI state with Zustand and server state with TanStack Query, avoiding duplication and manual synchronization.

---

## API Layer

All Strapi calls are centralized in `lib/api/`. Each resource has its own file with query and mutation functions.

### Structure by resource:

- `lib/api/products.ts` - Product queries, filters, search
- `lib/api/posts.ts` - Blog post queries, categories
- `lib/api/categories.ts` - Product categories
- `lib/api/orders.ts` - Create, list, update orders
- `lib/api/auth.ts` - Login, register, logout

### Rules:

- Don't fetch directly in components (without using TanStack Query)
- Always use custom hooks from `lib/hooks/` for queries
- Each API file returns well-defined types
- Automatic caching through queryKey and staleTime

---

## Forms & Validation

### Zod Schemas

Validation schemas are in `lib/schemas/` separated by context (checkout, auth, filters, blog comments).

Each schema defines:

- Type validations
- Custom error messages
- Type inference with `z.infer<typeof schema>`

### React Hook Form + Zod

Forms use React Hook Form with real-time validation through Zod. This enables:

- Type-safe validation
- Automatic error messages
- Efficient form state handling

Form contexts include:

- Checkout (shipping, payment)
- Authentication (login, register)
- Product filters
- Blog comments
- Newsletter subscription

---

## UI & Styling Guidelines

### SierraMar Color Palette

| Color      | Hex     | Usage                                    |
| ---------- | ------- | ---------------------------------------- |
| Dark Brown | #23160A | Dark backgrounds, main text              |
| Cream      | #F9F6F2 | Light backgrounds, neutral               |
| Dark Green | #333C31 | Accents, secondary buttons               |
| Warm Beige | #D2CDC6 | Borders, dividers, alternate backgrounds |
| Taupe      | #AFA595 | Secondary text, placeholders             |

### Design Philosophy

- Premium and elegant: serif typography for titles, sans-serif for body
- Generous spacing: premium coffee e-commerce requires breathing room
- Readable contrast: ensure WCAG accessibility
- Consistency: CSS variables for all color properties

### shadcn/ui Components

- Use base shadcn/ui components for forms, dialogs, tables
- Extend with Tailwind for brand customization
- Respect color palette in all extensions

### Blog Design Elements

- Posts with elegant typography and optimal reading line (≈65 characters)
- Optimized and responsive images
- Table of contents for long posts
- Visible metadata: author, date, reading time

---

## Identity & Logos

The brand has 3 logo variants:

- Primary (icon + text): Use in main UI areas like navbar and hero sections => D:\Workspace\personal\sierramar\sierramar-store\public\main-logo.png
- Wordmark (text only): Use in compact layouts (headers, footers, dense UI) => D:\Workspace\personal\sierramar\sierramar-store\public\text-logo.png
- Icon (symbol only): Use for favicon, mobile UI, loading states, and small components => D:\Workspace\personal\sierramar\sierramar-store\public\icon-logo.png

### Rules

- Use only one logo variant per UI section
- Keep consistent alignment and spacing
- Maintain a clean, minimal, premium presentation
- Prefer SVG format for all variants

---

## E-commerce & Catalog

### Main Sections

- **Home**: Hero, featured products, latest blog posts
- **Catalog**: Product grid with filters (category, price, sort)
- **Product Detail**: Images, description, reviews, recommendations
- **Cart**: Items, quantities, subtotal, checkout
- **Checkout**: Shipping, payment, confirmation
- **Account**: Previous orders, personal data, wishlist

### Shopping Cart

- Persists in localStorage (client) and user session (backend)
- Zustand for cart UI (open/closed)
- Inventory validation before checkout
- Tax and shipping calculation

### Checkout Flow

- Shipping address validation
- Payment gateway integration (Stripe/PayPal)
- Order confirmation with number
- Confirmation email via Strapi webhooks

---

## Blog

### Main Sections

- **Blog Home**: Recent posts, categories, search
- **Individual Post**: Content, author, date, related posts
- **Categories**: Posts grouped by topic
- **About / Blog Guide**: Content description

### Content Types in Strapi

- Posts: Title, slug, content, excerpt, featured image, author, category, date
- Blog Categories: Name, slug, description
- Authors: Name, bio, avatar

### Blog SEO

- Dynamic metadata per post (title, description, OG image)
- SEO-friendly URLs based on slug
- Sitemap.xml for indexing
- Open Graph and Twitter Card metadata
- Structured data (JSON-LD) for articles

### Store Integration

- Links to relevant products from posts
- Related posts: show similar posts at the end
- Blog CTAs on home (latest posts, featured categories)
- Blog categories visible in main navigation if relevant

---

## SEO & Performance

### Server Components

Use Server Components by default for:

- Data fetching
- Static content rendering
- Reduce JavaScript sent to client
- Improve Core Web Vitals

### Dynamic Metadata

- Each page must generate metadata with title, description, OG image
- Blog posts with auto-generated metadata from Strapi
- Fallbacks for incomplete data

### Image Optimization

- Use `next/image` for all dynamic images
- Specify exact sizes or use `fill`
- Lazy loading by default, `priority` only for above-the-fold
- Automatic image optimization

### Performance

- Pagination for long lists (products, posts)
- Virtual scrolling for very large catalogs
- Automatic image optimization
- Static generation for stable pages
- ISR (Incremental Static Regeneration) for semi-stable content

---

## Request Handling & Proxy

### Using proxy.ts

Next.js recommends using `proxy.ts` instead of the deprecated middleware pattern. The proxy file handles:

- **Request interception**: Inspect and modify incoming requests
- **Response transformation**: Transform responses from Strapi API
- **Authentication**: Handle JWT token injection and refresh
- **Routing logic**: Route requests based on conditions
- **CORS handling**: Manage cross-origin requests

### Key Responsibilities

- Inject Strapi API tokens into backend requests
- Add authentication headers for protected routes
- Handle redirect logic based on user state
- Log requests for debugging
- Validate and sanitize incoming data

### Security Considerations

- Never expose sensitive tokens in responses
- Validate all incoming requests at the proxy level
- Use proxy to enforce authentication before route access
- Sanitize headers and payloads

---

## Code Conventions

### Naming

- Components: PascalCase
- Custom hooks: useXxx camelCase
- Variables/functions: camelCase
- Types/Interfaces: PascalCase
- Constants: SCREAMING_SNAKE_CASE

### File Structure

- One component per file (unless very small)
- Default exports for pages and layouts
- Named exports for reusable components, hooks, types
- Index files (index.ts) to group related exports

### TypeScript

- Don't use `any`, prefer `unknown` or specific types
- Export types in `lib/types/` for sharing
- Interfaces for component props

---

## Important Project Rules

### ❌ DO NOT

1. **Don't duplicate state** - If Strapi is the source of truth, don't store in Zustand
2. **Don't fetch directly in components** - Use custom hooks with TanStack Query
3. **Don't mix server and client logic without clear boundaries**
4. **Don't ignore frontend validation** - React Hook Form + Zod in all forms
5. **Don't hardcode URLs** - Use NEXT*PUBLIC*\* environment variables
6. **Don't ignore errors** - Explicit error/loading state handling
7. **Don't optimize prematurely** - Measure before optimizing

### ✅ DO

1. **Server Components by default** - Client only when interactivity is needed
2. **Validate both sides** - Frontend (UX) and backend (security)
3. **Reuse with hooks and stores** - Less prop drilling
4. **Types in lib/types/** - Type safety across the app
5. **Centralized API calls** - `lib/api/` is the only Strapi communication point
6. **Semantic HTML** - Important for SEO and accessibility
7. **Responsive images** - Never hardcoded, always with next/image
8. **Monitor performance** - Check Core Web Vitals

### Security

- Never expose Strapi tokens on client
- Validate on backend too
- Sanitize user input
- Correctly configured CORS
- Protect authenticated routes

---

## Initial Setup

### Environment Variables

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRAPI_API_TOKEN=your_token
```

### Commands

- `npm run dev` - Development
- `npm run build` - Production build
- `npm run start` - Start production
- `npm run lint` - ESLint
- `npm test` - Tests

---

## Resources

- [Next.js Docs](https://nextjs.org)
- [Strapi Docs](https://docs.strapi.io)
- [TanStack Query](https://tanstack.com/query)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

**Last updated:** 2026-06-19  
**Request Handling:** proxy.ts convention (new standard)  
**Color Palette:** #23160A / #F9F6F2 / #333C31 / #D2CDC6 / #AFA595
