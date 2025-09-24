# 🚀 Promptopia Demo

Welcome to **Promptopia** – your one-stop platform for discovering, creating, and sharing creative AI prompts!
This is my **first full-stack project** built with **Next.js**, and it’s been an exciting learning journey. I hope it helps you, inspires you, or maybe even sparks your next big idea!

> [!IMPORTANT]
> It my university assignment project, so any contribution to the project won't be accepted utill june 2026,
>
> But feel free to fork the repository and modify its code.. and code is licence under [MIT](LICENSE)..
---

## ✨ Inspiration

Special thanks to **[JavaScript Mastery](https://www.youtube.com/@JavaScriptMastery)** and [Adrian Hajdin](https://www.youtube.com/watch?v=wm5gMKuwSYk) for their excellent tutorial that inspired this project.

> 🧠 **Based On:** [JavaScript Mastery's Next.js 14 AI Prompt Sharing Project](https://github.com/adrianhajdin/project_next_14_ai_prompt_sharing)

---

## 🌟 Features

Promptopia is packed with modern features for managing and sharing prompts:

- ⚡ **Next.js 15.3.3** – Modern, fast, and production-ready React framework.
- 🧠 **AI Prompt Sharing** – Browse, create, edit, and delete prompts with ease.
- 🔧 **Server Actions** – Handle logic directly within your components.
- ✍️ **CRUD Support** – Manage prompts and user profiles seamlessly.
- 👤 **User Authentication** – Secure login system using JWT.
- 💾 **Dual Database Support**

  - **SQLite** for local development.
  - **MongoDB** for scalable cloud deployments.

- 🔗 **Prisma ORM** – Elegant database communication.
- 🎨 **Tailwind CSS** – Rapid styling with responsive design.
- 🔐 **JWT Session Handling** – Secure and stateless user sessions.
- 🔁 **Robust Session Management** – Ensures a smooth, secure user experience.

---

## 🔮 Upcoming Features

- [ ] ✅ **Unit Testing** – Improve reliability and confidence with test coverage.
- [ ] 📝 **Comprehensive Documentation** – Easier setup and collaboration.
- [x] 🧑‍💻 **TypeScript Migration** – Enhance type safety and development experience.
- [ ] 🐳 **MongoDB Docker Support** – Add Docker support for MongoDB (currently available for SQLite).

---

## ⚙️ Environment Variables Template

Before starting, configure your environment with a `.env` file. Here's a template:

```env
# --- SESSION CONFIG ---
SESSION_SECRET="your_secret" # Use a strong, random string in production

# --- DATABASE CONFIG ---
DATABASE_TYPE="sqlite" # or "mongodb"

# SQLite (for local development)
DATABASE_URL_SQLITE="file:./promptopia.db"

# MongoDB (for cloud setup)
# DATABASE_URL_MONGODB="mongodb+srv://<username>:<password>@<host>/promptopia"

# --- OPTIONAL LOGGING ---
LOGGING="verbose" # Set to "verbose" for detailed logs, or comment out
```

---

## 🛠 Local Development Setup

Follow these steps to get Promptopia running locally:

### 1. Clone the Repository

```bash
git clone
cd promptopia-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file and copy the contents from `.env.example`. Update values as needed.

### 4. Run the Development Server

```bash
npm run dev
```

> Your app will be live at [http://localhost:3000](http://localhost:3000)

This will also automatically set up the database for you.

---

## 📦 Production Build (Local)

To simulate a production environment locally:

### 1. Build the Project

```bash
npm run build
```

### 2. Start the Production Server

```bash
npm start
```

> App will be available at [http://localhost:3000](http://localhost:3000)

---

## 🐳 Docker Support (SQLite Only – Dev Use)

Docker support is available for quick development and testing with SQLite.

### ⚠️ Note:

- Not suitable for production.
- SQLite database resets on every container restart.

### 1. Clone the Repository

```bash
git clone
cd promptopia-demo
```

### 2. Build the Docker Image

```bash
docker build -t promptopia-demo-sqlite:latest .
```

### 3. Generate a Session Secret

Use OpenSSL or any random generator:

```bash
openssl rand -base64 32
```

### 4. Run the Docker Container

Replace `YOUR_GENERATED_SECRET` with the actual secret you just generated:

```bash
docker run -d -p 8080:3000 -e SESSION_SECRET="YOUR_GENERATED_SECRET" promptopia-demo-sqlite:latest
```

Visit your app at: [http://localhost:8080](http://localhost:8080)

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🌐 Deploy on Vercel

The easiest way to deploy your Next.js app is through [Vercel](https://vercel.com/new).
Refer to the [official deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for guidance.

---

## 🤝 Contributing

If you'd like to contribute, feel free to fork this repository and submit a PR. Feedback and improvements are always welcome!

---

## 📩 Contact

If you liked the project or have any questions, feel free to reach out or check out my other work:

- 🔗 GitHub: [JeelDobariya38](https://github.com/JeelDobariya38)
