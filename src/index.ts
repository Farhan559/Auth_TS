import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './auth';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use('/auth', authRoutes);


app.listen(3000,()=>{
    console.log('Working')
})