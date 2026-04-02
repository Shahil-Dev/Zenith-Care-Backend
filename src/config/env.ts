import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    PORT: string;
    NODE_ENV: 'development' | 'production' | 'test';
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
}



const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVars = ['PORT', 'NODE_ENV', 'DATABASE_URL', 'BETTER_AUTH_SECRET', 'BETTER_AUTH_URL'];

    requiredEnvVars.forEach((varName) => {
        if (!process.env[varName]) {
            throw new Error(`Environment variable ${varName} is not set`);
        }
    });


    return {
        PORT: process.env.PORT!,
        NODE_ENV: process.env.NODE_ENV! as 'development' | 'production' | 'test',
        DATABASE_URL: process.env.DATABASE_URL!,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET!,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL!
    };
};




const envConfig = loadEnvVariables();


export default envConfig;