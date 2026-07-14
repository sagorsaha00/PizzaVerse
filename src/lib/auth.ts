import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient, ServerApiVersion, Db } from "mongodb";
import { jwt } from "better-auth/plugins";
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

const dbUrl = process.env.DATABASE_URL;
const authUrl = process.env.BETTER_AUTH_URL;
const authSecret = process.env.BETTER_AUTH_SECRET;
const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

console.log('Base URL:', authUrl);

async function connectToDatabase(): Promise<Db> {
    if (!dbUrl) {
        throw new Error("DATABASE_URL missing in environment variables!");
    }

    const client = new MongoClient(dbUrl, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
    });

    await client.connect();
    console.log("Successfully connected to MongoDB! 🎉");
    return client.db();
}

const db = await connectToDatabase();

export const auth = betterAuth({
    database: mongodbAdapter(db),
    secret: authSecret,
    baseURL: authUrl,

    emailAndPassword: {
        enabled: true,
    },

    socialProviders: {
        google: {
            clientId: googleId!,
            clientSecret: googleSecret!,
        },
    },

    plugins: [jwt()],

 
    session: {
        expiresIn: 60 * 60 * 24 * 7,  
        updateAge: 60 * 60 * 24,     
    },

  
    advanced: {
        crossSubDomainCookies: {
            enabled: true,
        },
        trustedOrigins: [
            authUrl!, 
            "http://localhost:3000", 
            "http://localhost:3001"
        ]
    }
});