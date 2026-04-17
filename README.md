# NLG Frontend

A Next.js frontend application for managing products, built with React 19, TypeScript, Tailwind CSS, and SCSS modules.

## Tech Stack

- Next.js 16.2.2 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- SCSS Modules
- Axios
- Sonner (toast notifications)
- Class Variance Authority

## Requirements

- Node.js 18 or later
- A running backend API at `http://localhost:3010/api`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The root path `/` redirects automatically to `/product`.

## Available Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build the application for production |
| `npm start`     | Start the production server          |
| `npm run lint`  | Run ESLint                           |

## Project Structure

```
app/                  Application routes (App Router)
  layout.tsx          Root layout with Navbar, Footer, and Toaster
  product/            Product management page
components/
  commons/            Reusable generic components
    Button/           Button with variants
    Modal/            Generic modal dialog
    Pagination/       Generic pagination
    Table/            Generic typed table
  layouts/
    Navbar/           Top navigation bar
    Footer/           Page footer
  product/            Product-specific components
    ProductTable/     Product list table
    ProductForm/      Create and edit form
    DeleteConfirm/    Delete confirmation dialog
services/
  productService.ts   API calls for product CRUD and sync
types/
  product.ts          TypeScript interfaces for the product domain
utils/
  cn.ts               Class name utility
```

## API

The application connects to a REST API with the following base URL:

```
http://localhost:3010/api
```

### Endpoints Used

| Method | Endpoint                 | Description                        |
| ------ | ------------------------ | ---------------------------------- |
| GET    | `/products?page=&limit=` | Paginated product list             |
| POST   | `/products`              | Create a new product               |
| PUT    | `/products/:id`          | Update an existing product         |
| DELETE | `/products/:id`          | Delete a product                   |
| POST   | `/products/sync`         | Sync products from external source |

### Response Format

```json
{
  "meta": { "status": "success", "message": "OK", "code": 200 },
  "data": {
    "data": [],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Features

- Product list with server-side pagination
- Create, edit, and delete products via modal dialogs
- Continuous row numbering across pages
- Sync products from an external source
- Toast notifications for all actions
- Responsive layout
