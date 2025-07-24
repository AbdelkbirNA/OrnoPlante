const {PrismaClient}=require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
require("dotenv").config();


const AdminEmail="root@root.com";
const AdminPassword = process.env.Admin_PW;

async function initAdminUser(){

    const existadmin=await prisma.user.findUnique({
        where:{email:AdminEmail},
    });
    if(existadmin){
        return;
    }

    const hashedPW= await bcrypt.hash(AdminPassword,10);

    await prisma.user.create({

        data:{
            first_name:"root",
            last_name:"",
            email:AdminEmail,
            password:hashedPW,
            user_type:"admin",
        },
    });

}
module.exports={initAdminUser};