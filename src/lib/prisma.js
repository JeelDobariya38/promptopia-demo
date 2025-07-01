import { PrismaClient } from '../generated/prisma';

function verifyEssentialEnvs() {
    if (!process.env.SESSION_SECRET) {
        throw new Error(`Error: SESSION_SECRET Not Present.`);
    }

    if (!process.env.DATABASE_TYPE) {
        throw new Error(`Error: DATABASE_TYPE Not Present.`);
    }

    if (process.env.DATABASE_TYPE === 'sqlite') {
        if (!process.env.DATABASE_URL_SQLITE) {
            throw new Error(`Error: DATABASE_URL_SQLITE Not Present.`);
        }
    } else if (process.env.DATABASE_TYPE === 'mongodb') {
        if (!process.env.DATABASE_URL_MONGODB) {
            throw new Error(`Error: DATABASE_URL_MONGODB Not Present.`);
        }
    } else {
        throw new Error(`Error: Unsupported DATABASE_TYPE "${DATABASE_TYPE}".`);
    }
}

verifyEssentialEnvs();

const globalForPrisma = { prisma: undefined };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma;
