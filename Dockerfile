# Stage 1: Dependency Installation
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

# Install dependencies, including Prisma CLI.
# Prisma generate will run via postinstall hook during this step.
# Ensure DATABASE_URL_SQLITE is set in the build environment if your Prisma schema
# requires a connection during 'generate'.

ENV DATABASE_TYPE="sqlite"
ENV DATABASE_URL_SQLITE="file:./promptopia.db"

RUN npm install --frozen-lockfile

ENV SESSION_SECRET="your_secret"

# Build the Next.js application for production
# NEXT_TELEMETRY_DISABLED=1 disables Next.js telemetry during build
RUN NEXT_TELEMETRY_DISABLED=1 npm run build

# Stage 3: Run the Next.js application
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only necessary files from the builder stage to keep the final image small
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated

# Expose the port Next.js runs on (default is 3000)
EXPOSE 3000

# Set the command to start the Next.js application in production mode
CMD ["npm", "start"]
