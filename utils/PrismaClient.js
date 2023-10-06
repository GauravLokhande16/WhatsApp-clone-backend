import {PrismaClient} from "@prisma/client"



let prismaInstane = null;

function getPrismaInstane(){
    if(!prismaInstane){
        prismaInstane = new PrismaClient()
    }
    return prismaInstane
}

export default getPrismaInstane