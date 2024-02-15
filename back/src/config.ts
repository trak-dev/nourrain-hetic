import dotenv from 'dotenv';
dotenv.config();
const config = {
    database : {
        user : process.env.POSTGRES_USER || '',
        host : process.env.DB_HOST || '',
        name : process.env.POSTGRES_DB || '',
        password : process.env.POSTGRES_PASSWORD || '',
        port : parseInt( process.env.POSTGRES_PORT! ) || 5432,
    },
    port : parseInt( process.env.PORT! ) || 8080,
    jwtSecret : process.env.JWT_SECRET || '',
}

export default config;