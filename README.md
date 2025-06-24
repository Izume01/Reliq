# 🔐 Reliq — Share Secrets That Don't Overstay

> _We believe not everything should last forever._  
> Reliq lets you share sensitive messages and files that **expire automatically** — with no accounts, no logs, and no clutter.  
> Think of it as the **Signal** for secure file and message sharing.

![Reliq Banner](./public/banner.png) <!-- Replace with actual image if available -->

---

## ✨ Features

- 🔒 **End-to-End Encryption** — Messages protected from start to finish
- ⏰ **Self-Destructing Links** — Auto-delete after view or timer expiry
- 🧪 **One-Time View** — Secret vanishes after being read once
- 🎨 **Beautiful, Calm UI** — Designed for trust, not noise
- 🔐 **Optional Password Lock** — Extra layer of protection
- 📱 **Fully Responsive** — Mobile-first sharing
- ⚡ **No Sign-Up Needed** — Dead simple, frictionless UX

---

## 🖼️ Screenshots

<!-- Add screenshots of your app here -->

---

## 🛠️ Tech Stack

| Layer     | Tech                                      |
|-----------|-------------------------------------------|
| Frontend  | Next.js 15, React 19, Tailwind CSS, TypeScript |
| Backend   | API Routes (Next.js)                       |
| Database  | PostgreSQL via Prisma ORM                  |
| Caching   | Redis (Upstash)                            |
| Auth      | bcrypt-ts (for password hashing)           |
| ID Gen    | `nanoid` (8-char secure slugs)             |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL instance
- Redis (e.g. [Upstash](https://upstash.com))
- pnpm (or npm)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd serectsapp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/secret_share"
   UPSTASH_REDIS_REST_URL="your-redis-url"
   UPSTASH_REDIS_REST_TOKEN="your-redis-token"
   ```

4. **Set up the database**
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Go to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage

### Creating a Secret

1. Visit the homepage
2. Enter your secret message in the text area
3. (Optional) Set a password for extra security
4. Choose an expiration time (5 minutes to 24 hours)
5. Click **Create Secret Link**
6. Share the generated link with your recipient

### Viewing a Secret

1. Click on a secret link
2. If password protected, enter the password
3. View the secret message
4. The secret is automatically destroyed after viewing

---

## 🔧 Configuration

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

## 🏗️ Project Structure

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

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt with 12 salt rounds
- **Unique Slugs**: 8-character unique identifiers generated using nanoid
- **One-Time Access**: Secrets are permanently deleted after viewing
- **Automatic Expiration**: Redis TTL ensures secrets expire even if not viewed
- **No Logging**: Sensitive data is never logged
- **Input Validation**: All inputs are validated and sanitized

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

## 🔮 Roadmap

- [ ] Rate limiting
- [ ] File attachments
- [ ] Custom domains
- [ ] Analytics dashboard
- [ ] API documentation
- [ ] Mobile app

---

Made with ❤️ using Next.js, Prisma, and Redis
