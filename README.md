# Promptopia Demo

Hey there! Welcome to Promptopia, your new go-to spot for finding and sharing awesome AI prompts! This project's my very first full-stack Next.js app, and honestly, it's been a super fun learning journey. Hope it helps you out too!

## Big Thanks & Inspiration

Gotta give a huge shout-out to JavaScript Mastery! Their work was a massive inspiration. Seriously, a big thank you to [Adrian Hajdin](https://www.youtube.com/watch?v=wm5gMKuwSYk) – his tutorials and ideas really guided me through this whole thing.

- **Inspired By:** [JavaScript Mastery's Next.js 14 AI Prompt Sharing Project](https://github.com/adrianhajdin/project_next_14_ai_prompt_sharing)

## What Promptopia Can Do!

Promptopia's packed with cool stuff to help you manage and share all sorts of creative AI prompts. Check out some of its main features:

- **Next.js 15.3.3:** We're using the latest Next.js here, so it's super sturdy and ready to grow!
- **Server Actions:** This means the app handles all the behind-the-scenes stuff right from your React components – pretty neat, huh?
- **CRUD Operations:** You can totally Create, Read, Update, and Delete (that's CRUD!) your prompts and user profiles. Easy peasy!
- **Prompt Management:** Make new prompts, check 'em out, tweak 'em, or even delete 'em if you change your mind. It's all yours!
- **User Management:** Basic user logins and profile bits are all set up.
- **Dual Database Support:** Wanna use **MongoDB** for big, cloud-y stuff, or **SQLite** for something simple and local? You pick!
- **Prisma ORM:** This is our awesome tool for chatting with the database. Makes everything smooth!
- **Tailwind CSS:** Building the look and feel was super fast and responsive thanks to Tailwind.
- **JWT (JSON Web Tokens):** Keeps your user sessions nice and secure.
- **Prompt Sharing:** Find cool prompts from others, and share your own brilliant ideas with the community!
- **User Session Handling:** We've got robust session management so your experience is always smooth.

## What's Coming Next!

I'm always tinkering to make Promptopia even better! Here's a peek at what's on the horizon:

- **Unit Testing:** Gonna add lots of tests to make sure everything's super reliable and easy to maintain.
- **Documentation:** Planning to write even more docs so it's a breeze to understand and contribute!
- **TypeScript Support:** Thinking about moving to TypeScript for even safer code and a smoother dev experience.
- **MongoDB Docker Support:** We'll get Docker configs ready for MongoDB too, just like we have for SQLite!

## Enviroment Variable Template (Quick Look!)

Before you get started, you'll need to set up some environment variables. Just grab the `.env.example` file and fill 'er up!

```
# ---------------- SESSION ----------------
# SESSION_SECRET: This is a super important, secret string for keeping your sessions safe.
# IMPORTANT: For real-world use, you absolutely NEED to change this to something unique and super random!
SESSION_SECRET="your_secret"

# ---------------- DATABASE ----------------
# Just uncomment the database you want to use!

# Sqlite Config (Great for local dev and getting started fast!)
DATABASE_TYPE="sqlite"
DATABASE_URL_SQLITE="file:./promptopia.db"

# # MongoDB Config (Uncomment this and fill in your details if you're using MongoDB!)
# DATABASE_TYPE="mongodb"
# DATABASE_URL_MONGODB="mongodb+srv://\<username\>:\<password\>@\<host\>/promptopia"

# ---------------- OPTIONAL ----------------
# LOGGING: Set this to "verbose" if you want to see all the detailed messages while developing.
# If you prefer less chatter, just comment it out!
LOGGING="verbose"
```

## **Let's Get Started (Local Dev)**

Wanna get Promptopia running on your computer? Here's how to do it:

1. **First, clone the project:**

   ```bash
   git clone https://github.com/jeel-programmer/promptopia-demo.git
   cd promptopia-demo
   ```

2. **Then, install all the bits and bobs:**

   ```bash
   npm install
   ```

3. **Time to set up your environment variables:**

   Make a .env file in your project's main folder. Just copy what's in .env.template and pop in your own secret values.

4. **And finally, fire up the dev server!**

   ```bash
   npm run dev
   ```

   Heads up! This command will also get your database all set up for you. Super convenient!

5. Now, just open [http://localhost:3000](http://localhost:3000) in your browser and check it out!

### Ready for Production (Local)

If you want to see how it runs in a production-like setting on your machine:

1. **Build the app:**

   ```bash
   npm run build
   ```

   This command gets everything ready for prime time and makes sure your database is prepped\!

2. **Start the production server:**

   ```bash
   npm start
   ```

   Boom! Your Next.js app will start up, and the database will be ready to go.

## Docker Fun (Dev Only, SQLite Right Now!)

This Docker setup's awesome for quick local dev and testing with SQLite. **Just a heads-up: it's NOT for production!** The database gets wiped every time the container restarts, so don't use it for anything important.

1. **First, clone the project:**

   ```bash
   git clone https://github.com/jeel-programmer/promptopia-demo.git
   cd promptopia-demo
   ```

2. **Then, build that Docker image\!**

   ```bash
   docker build \-t promptopia-demo-sqlite:latest .
   ```

   This command builds a cool multi-stage Docker image, getting all your app's bits and pieces ready.

3. **Time to get a super strong SESSION_SECRET:**

   Security first, right? You'll need a solid session secret. Here's how you can whip one up with OpenSSL:

   ```
   openssl rand -base64 32
   ```

   Copy that long string you get – that's your secret!

4. **Now, run the Docker container!**

   Just swap YOUR_GENERATED_SECRET with the actual secret you just made.

   ```bash
   docker run -p 8080:3000 \
    -e SESSION_SECRET="YOUR_GENERATED_SECRET" \
    promptopia-demo-sqlite:latest
   ```

   This command connects port 8080 on your computer to port 3000 inside the container and sends over your secret.

5. **Finally, open [http://localhost:8080](http://localhost:8080) in your browser to see your app running in Docker! Woohoo!**

===

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```
