import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req,res,next) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)    //Icis on hash le password avec bcrypt

        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save()
        res.status(200).send("User has been created")
    }catch(err) {
        next(err)
    }
} 


export const login = async (req,res,next) => {
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(400, "User not found")

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
            )

        if(!isPasswordCorrect) 
            return next(400, "Wrong password or username")

            const token = jwt.sign(             //on crée un cookie avec JWT si le password est corrext
                { id: user._id, isAdmin: user.isAdmin},
                process.env.JWT
                )
        
        const {password,isAdmin, ...otherDetails} = user._doc  //ici on initialise 3 objets pour ensuite afficher que otherDetails
        res
        .cookie("acces_token", token, {
            httpOnly:true,      //pour ne pas auttoriser tout les clients a voir le cookie caché
        })
        .status(200)
        .json({...otherDetails})
    }catch(err) {
        next(err)
    }
} 

