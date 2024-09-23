import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";


const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'djfhsjdfs';

// SignUp 

router.post('/signup', async(req,res)=>{
    const {username,email,password} = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    const user = await prisma.user.create({
        data:{
            username,
            email,
            password:hashPassword,
        },
    })
    res.send(201).json({message:'User Created Successfully'});
});

    // Login

router.post('/login',async(req,res)=>{
    const {email , password} = req.body;
    const user = await prisma.user.findUnique({where:{email}});

    if(!user){
        return res.send(401).json({message:'Email or password not valid'});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.send(401).json({message:'please provide valid email or password'})
    }

    const token = jwt.sign({id:user.id},JWT_SECRET,{expiresIn:'1h'});
    res.json({token});

})

    export default router;