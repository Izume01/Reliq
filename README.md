# Reliq — Share Secrets That Don't Overstay

> Reliq is a secure platform for sharing sensitive messages and files that expire automatically.  
> No accounts, no logs, no unnecessary complexity.  
> Designed for privacy-focused, temporary sharing.

![Reliq Banner](./public/banner.png)

---

## Features

- End-to-end encryption for all messages
- Self-destructing links that auto-delete after viewing or upon expiration
- One-time view: secrets are deleted after being accessed
- Clean, minimal user interface
- Optional password protection for added security
- Fully responsive design for all devices
- No sign-up required

---

## Screenshots

<!-- Add screenshots of your app here -->

---

## Technology Stack

| Layer     | Technology                                 |
|-----------|--------------------------------------------|
| Frontend  | Next.js 15, React 19, Tailwind CSS, TypeScript |
| Backend   | API Routes (Next.js)                       |
| Database  | PostgreSQL via Prisma ORM                  |
| Caching   | Redis (Upstash)                            |
| Auth      | bcrypt-ts (for password hashing)           |
| ID Gen    | nanoid (8-character secure slugs)          |

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL instance
- Redis (e.g. [Upstash](https://upstash.com))
- pnpm (or npm)

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd serectsapp
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Configure environment variables  
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/secret_share"
   UPSTASH_REDIS_REST_URL="your-redis-url"
   UPSTASH_REDIS_REST_TOKEN="your-redis-token"
   ```

4. Set up the database
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. Start the development server
   ```bash
   pnpm dev
   ```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## Usage

### Creating a Secret

1. Visit the homepage
2. Enter your secret message in the text area
3. Optionally set a password for additional security
4. Choose an expiration time (from 5 minutes to 24 hours)
5. Click "Create Secret Link"
6. Share the generated link with your recipient

### Viewing a Secret

1. Open the secret link
2. If password protected, enter the password
3. View the secret message
4. The secret is deleted after viewing

---

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `UPSTASH_REDIS_REST_URL` | Redis REST API URL | Yes |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST API token | Yes |

### Database Schema

The application uses a simple schema with a single `Slug` table:

```prisma
model Slug {
  id           Int      @id @default(autoincrement())
  slug         String   @unique
  passwordHash String?
  createdAt    DateTime @default(now())
  viewedAt     Boolean  @default(false)
}
```

---

## Project Structure

```
serectsapp/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create/         # Create secret endpoint
│   │   │   ├── getslug/        # Retrieve secret endpoint
│   │   ├── s/
│   │   │   └── [...slug]/
│   │   │       └── page.tsx    # Secret viewing page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── lib/
│   │   ├── primsa.ts           # Prisma client
│   │   └── redis.ts            # Redis client
│   └── util/                   # Utility functions
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
└── package.json
```

---

## Security Features

- Passwords are hashed using bcrypt with 12 salt rounds
- Unique 8-character slugs generated with nanoid
- One-time access: secrets are deleted after viewing
- Automatic expiration using Redis TTL
- No sensitive data is logged
- Input validation and sanitization throughout

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js, including:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Describe your feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a pull request

---


## Support

If you encounter issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

## Roadmap

- Rate limiting
- File attachments
- Custom domains
- Analytics dashboard
- API documentation
- Mobile application

---

Built with Next.js, Prisma, and Redis.
