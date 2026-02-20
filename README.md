<div align="center">

<img src="https://img.shields.io/badge/status-in_development-yellow?style=flat-square"/>
<img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square"/>
<img src="https://img.shields.io/github/stars/dungdev-web/short_link?style=flat-square&color=58A6FF"/>

# 🔗 ShortLink

**A modern URL shortener with analytics, QR codes, campaign tracking & more**

[![Frontend](https://img.shields.io/badge/Frontend_Repo-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/dungdev-web/short_link)

</div>

---

## Features

| Feature | Description |
|---|---|
|  **Short Link** | Generate short URLs instantly |
|  **Custom Alias** | Personalize your short link slug |
|  **Link Expiration** | Set expiry date for links |
|  **Link Management** | Full CRUD — create, edit, delete links |
|  **Analytics** | Track clicks, visits, and user behavior |
|  **Campaign Tracking** | Group links under campaigns |
|  **QR Code** | Auto-generate QR code for every link |
|  **User Management** | User accounts & access control |

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white)

---

## 📁 Project Structure

### Frontend
```
Frontend/
├── 📂 src/
│   ├── 📂 app/              # Next.js app router & pages
│   ├── 📂 config/           # App configuration
│   ├── 📂 hooks/            # Custom React hooks
│   ├── 📂 mocks/            # Mock data for testing
│   ├── 📂 pages/            # Page components
│   ├── 📂 public/           # Static assets
│   ├── 📂 services/         # API service layer
│   └── 📂 types/            # TypeScript type definitions
├── next.config.ts
├── tsconfig.json
└── .env.example
```

### Backend
```
backend/
├── 📂 prisma/               # Prisma schema & migrations
├── 📂 src/
│   ├── 📂 adapter/          # External service adapters
│   ├── 📂 application/      # Use cases & business logic
│   ├── 📂 domain/           # Domain models & entities
│   ├── 📂 entrypoint/       # App entry (server setup)
│   ├── 📂 infrastructure/   # DB & external integrations
│   ├── 📂 interfaces/       # Controllers & routes
│   ├── 📂 shared/           # Shared utilities
│   └── 📂 tests/            # Unit & integration tests
├── jest.config.js
├── tsconfig.json
└── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js `>= 18`
- PostgreSQL
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/dungdev-web/short_link.git
cd frontend && cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables

```env
 ***Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_USE_MOCK=false
EMAIL_USER=
EMAIL_PASS=
 ***Frontend

```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Entity Overview

```
User ──── Campaign ──── Link ──── Visit
 │                       │
 └──── manages           └──── generates analytics
```

| Entity | Description |
|---|---|
| `User` | Account & authentication |
| `Link` | Short URL record with alias & expiry |
| `Campaign` | Group of related links |
| `Visit` | Click event with metadata |
| `Post` | Content associated with links |

---

## 📸 Screenshots

> Coming soon...

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [Lưu Đức Dũng](https://github.com/dungdev-web)

</div>
