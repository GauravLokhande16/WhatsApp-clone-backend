import getPrismaInstane from "../utils/PrismaClient.js";


export const checkuser = async (req, res, next)=>{
    try {
        const {email} = req.body;
        if(!email){
            return res.json({msg: "Email is required!", status: false})
        }
        const prism = getPrismaInstane()
        const user = await prism.user.findUnique({where: {email}})
        if(!user){
            return res.json({msg: "User not found!", status: false})
        }else{
            return res.json({msg:"User Found", status: true, data: user})
        }
    } catch (error) {
        next(error);
    }
}


// onboarding user
export const onBoardUser = async (req, res,next) => {
    try {
        const {email, name, about, image: profilePicture}= req.body;
        if(!email || !name || !profilePicture){
            return res.send("Email, Name, and Image are required!")
        }
        const prisma = getPrismaInstane()
        const user = await prisma.user.create({
            data:{email, name, about, profilePicture}
        })
        return res.json({msg:"Success", status: true, user})
    } catch (error) {
        console.log(error);
    }
}


// get All users
export const getAllUsers = async(req, res, next) => {
    try {
        const prisma = getPrismaInstane()
        const users = await prisma.user.findMany({
            orderBy : {name: "asc"},
            select :{
                id : true,
                email : true,
                name : true,
                profilePicture: true,
                about : true,
            }
        });
        const usersGroupByInitialLetter = {};

        users.forEach((user)=>{
            const initialLetter = user.name.charAt(0).toUpperCase();
            if(!usersGroupByInitialLetter[initialLetter]){
                usersGroupByInitialLetter[initialLetter] = []
            }
            usersGroupByInitialLetter[initialLetter].push(user);
        })
        return res.status(200).send({ users: usersGroupByInitialLetter})
    } catch (error) {
        console.log(error);
    }
}