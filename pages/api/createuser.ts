import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';


const prisma = new PrismaClient();

export default async function POST(req: NextApiRequest,
    res: NextApiResponse){
    try{
        const body = await req.body
        
        const {email,userName,password} = body;
        const existingEmail = await prisma.demoUser.findUnique(
            {
                where: {email : email}
            }
        ) 
        if(existingEmail){
            return res.json({user: null,message: "user already exists"})
        }
        const newUser = await prisma.demoUser.create(
            {
                data :{
                    email,
                    userName,
                    password
                }
            }
        )
        return res.json({user: newUser,message: "user created"})
        

    }catch(error)
    {
        console.error(error)

    }

}
