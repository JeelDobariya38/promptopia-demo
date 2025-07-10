import { Prisma, PrismaClient } from "../generated/prisma";

// Extend the global object to include a PrismaClient instance.
// This is crucial for avoiding multiple PrismaClient instances in development
// due to Next.js hot-reloading.
declare global {
  // eslint-disable-next-line no-var -- This is needed for global augmentation
  var prisma: PrismaClient | undefined;
}

// Access the global object, ensuring it's typed correctly.
// Using 'globalThis' is a modern, cross-environment way to access the global object.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize PrismaClient only once, or reuse the existing global instance.
const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, store the PrismaClient instance on the global object
// so it's reused across hot reloads. In production, a new instance is created
// on each serverless function invocation, which is the desired behavior.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

export type PostWithUser = Prisma.PostGetPayload<{
  include: { author: true };
}>;
