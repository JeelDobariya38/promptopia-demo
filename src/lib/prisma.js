import { PrismaClient as PrismaMongoDBClient } from '../generated/prisma_mongo'
import { PrismaClient as PrismaSqliteClient } from '../generated/prisma_sqlite'

const globalForPrisma = { prisma: undefined };

let prisma;

if (process.env.DATABASE_TYPE == "mongodb") {
    prisma = globalForPrisma.prisma || new PrismaMongoDBClient();
    console.log('Prisma client initialized for MongoDB.');
} else {
    prisma = globalForPrisma.prisma || new PrismaSqliteClient();
    console.log('Prisma client initialized for SQLite.');
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;
