import dotenv from 'dotenv';
dotenv.config();
const config = {
    database : {
        user : process.env.POSTGRES_USER || '',
        host : process.env.DB_HOST || '',
        name : process.env.POSTGRES_DB || '',
        password : process.env.POSTGRES_PASSWORD || '',
        port : parseInt( process.env.POSTGRES_PORT! ) || 5432,
        sslEnabled : process.env.POSTGRES_SSL_ENABLED === 'true'
    },
    host : process.env.HOST,
    port : parseInt( process.env.PORT! ) || 8080,
    jwtSecret : process.env.JWT_SECRET || '',
    stripePrivateKey: process.env.STRIPE_PRIVATE_KEY,
    stripeSecretWebhook: String(process.env.STRIPE_SECRET_WEBHOOK),
}

export default config;
