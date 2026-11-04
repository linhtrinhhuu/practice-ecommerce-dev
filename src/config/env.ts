import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    ADMIN_USER: process.env.ADMIN_USER || '',
    ADMIN_PASS: process.env.ADMIN_PASS || ''
}