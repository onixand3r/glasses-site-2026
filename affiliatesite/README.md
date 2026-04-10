# TechReviewPro - Affiliate Comparison Site

A modern, high-performance affiliate comparison site built with Next.js 15, Tailwind CSS, and Ghost CMS.

## Features

- **Modern Stack**: Next.js 15 (App Router) + Tailwind CSS 4
- **Ghost CMS Integration**: Self-hosted content management
- **Product Reviews**: Detailed reviews with ratings, pros/cons, specs
- **Comparison Tables**: Side-by-side product comparisons
- **Dark Mode**: Built-in dark mode support
- **Responsive Design**: Mobile-first, beautiful on all devices
- **SEO Optimized**: Meta tags, Open Graph, structured data ready
- **Docker Ready**: Complete Docker Compose setup

## Quick Start

### Development

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start Ghost CMS:
```bash
docker compose up -d ghost db
```

4. Configure Ghost:
   - Visit http://localhost:2368/ghost
   - Complete setup
   - Go to Settings > Integrations > Add Integration
   - Copy the Content API Key to your `.env`

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:3000

### Production with Docker

1. Build and start all services:
```bash
docker compose up -d
```

2. Access:
   - **Site**: http://localhost:3000
   - **Ghost Admin**: http://localhost:2368/ghost

## Project Structure

```
affiliatesite/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/              # Reusable UI components
│   │   ├── layout/          # Header, Footer
│   │   └── product/         # Product-specific components
│   └── lib/                 # Utilities, API clients
├── public/                  # Static assets
├── Dockerfile              # Next.js container
└── docker-compose.yml      # Full stack deployment
```

## Adding Products in Ghost

1. Create a new post in Ghost Admin
2. Add product data via Code Injection (Header):

```html
<script>
window.productData = {
  price: 999,
  rating: 4.5,
  affiliateUrl: 'https://example.com/affiliate-link',
  pros: ['Great battery', 'Fast performance', 'Premium build'],
  cons: ['Expensive', 'No headphone jack'],
  specs: {
    'Display': '6.7" OLED',
    'Processor': 'M3 Pro',
    'RAM': '18GB'
  },
  verdict: 'An excellent choice for professionals who need power and portability.'
};
</script>
```

3. Add tags for categories (e.g., "laptops", "smartphones")
4. Set featured for Editor's Picks

## Customization

- **Colors**: Edit `src/styles/globals.css` CSS variables
- **Categories**: Update the categories list in `Header.tsx`
- **Styling**: Modify Tailwind classes or extend the config

## Deployment

This setup is ready for Coolify, Docker Swarm, or any Docker-compatible platform.

## License

MIT
