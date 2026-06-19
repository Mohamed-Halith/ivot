# Ihsan: Voice of Truth

> Qur'an & Hadith reminders in Tamil — a permanent, searchable library for daily remembrance.

---

## For the owner: How to add a new reminder

You don't need to write any code. Follow these steps every time you want to publish a new reminder.

### Step 1 — Go to your Studio

Open your browser and visit:

```
https://yourdomain.com/studio
```

Log in with your Sanity account. You'll see your content dashboard.

### Step 2 — Click "Reminders" → "Create new"

You'll see a form with these fields:

| Field                     | What to put                                         |
| ------------------------- | --------------------------------------------------- |
| **Title**                 | Tamil word + English, e.g. `தனிமை — Solitude`       |
| **Slug**                  | Auto-generated from the title — click "Generate"    |
| **Topic**                 | Choose from your topic list (e.g. Patience, Prayer) |
| **Arabic Text**           | Paste the Qur'an verse or Hadith in Arabic          |
| **Reference**             | e.g. `Al-Qur'an 4:103` or `Sahih Bukhari 6412`      |
| **Tamil Meaning**         | Your Tamil translation                              |
| **English Meaning**       | Optional English translation                        |
| **Reflection**            | Your short teaching/commentary                      |
| **Dua**                   | Optional — Arabic dua + Tamil meaning               |
| **Instagram/YouTube URL** | Paste the reel link to embed your video             |
| **Cover Image**           | Upload a photo (click the image area)               |
| **Featured**              | Toggle ON to show this on the homepage              |

### Step 3 — Click "Publish"

The green "Publish" button in the top right. Your reminder is now live on the website within 60 seconds.

---

## Deploying to Vercel (one-time setup)

### Accounts you need (all free)

1. **Vercel** — [vercel.com](https://vercel.com) — hosts your website
2. **Sanity** — [sanity.io](https://sanity.io) — your content database
3. **Resend** — [resend.com](https://resend.com) — sends confirmation emails to subscribers

### Setup steps

#### 1. Create a Sanity project

```bash
# In the project folder, run:
npx sanity@latest init --env
```

Follow the prompts. When done, copy your **Project ID** (looks like `abc12def`).

#### 2. Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts. When Vercel asks for your project, say yes.

#### 3. Set your environment variables on Vercel

Go to vercel.com → your project → Settings → Environment Variables, and add:

| Key                             | Value                                       |
| ------------------------------- | ------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID                      |
| `NEXT_PUBLIC_SANITY_DATASET`    | `production`                                |
| `SANITY_API_READ_TOKEN`         | From Sanity → API → Tokens (read+write)     |
| `SANITY_WEBHOOK_SECRET`         | Any random string, e.g. `ihsan-secret-2024` |
| `RESEND_API_KEY`                | From resend.com → API Keys                  |
| `RESEND_FROM_EMAIL`             | `reminders@yourdomain.com`                  |
| `NEXT_PUBLIC_SITE_URL`          | `https://yourdomain.com`                    |

#### 4. Set up the Sanity webhook (so site updates instantly)

In Sanity → API → Webhooks → Create:

- URL: `https://yourdomain.com/api/revalidate`
- Trigger: **Publish** and **Unpublish**
- Header: `x-webhook-secret` = your `SANITY_WEBHOOK_SECRET`

#### 5. Connect your domain

Vercel → your project → Settings → Domains → Add your domain.

---

## Development (for developers)

```bash
# Install dependencies
npm install

# Copy and fill in environment variables
cp .env.example .env.local

# Start the dev server
npm run dev
# → http://localhost:3000

# Run unit tests
npm test

# Run e2e tests (needs dev server running)
npm run test:e2e

# Build for production
npm run build

# Studio available at
# http://localhost:3000/studio
```

### Project structure

```
app/
  (site)/          ← Public website (home, reminders, topics, duas, about, search)
  studio/          ← Sanity Studio (admin panel)
  api/             ← Webhook, subscribe, confirm endpoints
  og/              ← Dynamic OG image generator
components/
  reminder/        ← ReminderCard, VerseBlock
  topic/           ← TopicCard
  dua/             ← DuaBlock
  shared/          ← NewsletterForm, SearchBox, ShareBar, ReelEmbed, ThemeToggle
  layout/          ← Header, Footer
sanity/
  schemas/         ← Content model (reminder, topic, dua, settings, subscriber)
  queries/         ← Typed GROQ queries
  lib/             ← Sanity client + image URL builder
lib/               ← Utilities, search index, server actions
types/             ← Shared TypeScript types
tests/
  unit/            ← Vitest unit tests
  e2e/             ← Playwright end-to-end tests
```

### Tech stack

| What          | Package                                            |
| ------------- | -------------------------------------------------- |
| Framework     | Next.js 16 (App Router)                            |
| Language      | TypeScript (strict)                                |
| Styling       | Tailwind CSS v4                                    |
| UI components | shadcn/ui                                          |
| CMS           | Sanity.io                                          |
| Search        | Fuse.js (client-side)                              |
| Email         | Resend                                             |
| Analytics     | Vercel Analytics                                   |
| Dark mode     | next-themes                                        |
| Fonts         | Outfit (global) · Amiri (Arabic) · Noto Sans Tamil |
| Tests         | Vitest + Playwright                                |

---

بارك الله فيك — May Allah bless this effort.
