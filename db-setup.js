// db-setup.js

require("dotenv").config();
const { exec } = require('child_process');
const path = require('path');



/**
 * Executes a shell command and logs its output.
 * @param {string} command The command to execute.
 * @returns {Promise<void>} A promise that resolves if the command succeeds, rejects otherwise.
 */
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        console.log(`Executing: ${command}`);
        const child = exec(command);

        child.stdout.on('data', (data) => {
            process.stdout.write(data); // Pipe stdout directly
        });

        child.stderr.on('data', (data) => {
            process.stderr.write(data); // Pipe stderr directly
        });

        child.on('close', (code) => {
            if (code === 0) {
                console.log(`Command "${command}" exited with code ${code}`);
                resolve();
            } else {
                console.error(`Command "${command}" exited with code ${code}`);
                reject(new Error(`Command failed with code ${code}`));
            }
        });

        child.on('error', (err) => {
            console.error(`Failed to start command "${command}": ${err.message}`);
            reject(err);
        });
    });
}


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

async function runDbSetup() {
    const DATABASE_TYPE = process.env.DATABASE_TYPE;

    if (!DATABASE_TYPE) {
        console.error('Error: DATABASE_TYPE environment variable is not set.');
        console.error('Please set it to "sqlite" or "mongodb".');
        process.exit(1);
    }

    console.log(`Detected DATABASE_TYPE: ${DATABASE_TYPE}`);

    try {
        if (DATABASE_TYPE === 'sqlite') {
            console.log('--- Setting up SQLite database ---');
            const sqliteSchemaPath = path.join('prisma', 'sqliteSchema.prisma');
            await executeCommand(`npx prisma generate --schema=${sqliteSchemaPath}`);
            await executeCommand(`npx prisma migrate dev --schema=${sqliteSchemaPath}`); // Added --name init for initial migration
            console.log('SQLite setup complete.');
        } else if (DATABASE_TYPE === 'mongodb') {
            console.log('--- Setting up MongoDB database ---');
            const mongodbSchemaPath = path.join('prisma', 'mongodbSchema.prisma');
            await executeCommand(`npx prisma generate --schema=${mongodbSchemaPath}`);
            await executeCommand(`npx prisma db push --schema=${mongodbSchemaPath}`);
            console.log('MongoDB setup complete.');
        } else {
            console.error(`Error: Unsupported DATABASE_TYPE "${DATABASE_TYPE}".`);
            console.error('Please set it to "sqlite" or "mongodb".');
            process.exit(1);
        }
    } catch (error) {
        console.error('Database setup failed:', error.message);
        process.exit(1);
    }
}

verifyEssentialEnvs();
runDbSetup();
