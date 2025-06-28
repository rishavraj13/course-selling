const express = require("express")
const Router = express.Router
const UserRouter = Router();
const { userModel } = require("../db")
const zod = require("zod");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const {JWT_USER} = require("../config")


UserRouter.post("/signup", async (req, res) => {

    const requireBody = zod.object({
        email: zod.string().min(5).email(),
        password: zod.string().min(5).max(20),
        firstName: zod.string().min(5).max(20),
        lastName: zod.string().min(5).max(20),
    })


    const parseDatawithSuccess = requireBody.safeParse(req.body);



    if (!parseDatawithSuccess.success) {
        return res.status(403).json({
            message: "Incorrect data format",
            error: parseDatawithSuccess.error,
        })
    }

    try {

        const { email,
            password,
            firstName,
            lastName } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })

        return res.status(200).json({
        message: "You have Signed Up successfully"
    })
    }

    catch (e) {
        return res.status(200).json({
            message: "Error while Signing up!"
        })
    }

})

UserRouter.post("/signin", async(res, req) => {
    
    const email = req.body.email
    const password = req.body.password

    const user = await userModel.findOne({
        email: email,
    })

    const passwordMatch = bcrypt.compare(password, user.password)


    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id // doubt???
            
        }, JWT_USER);

        res.json({
            token: token // doubt??
        })
        res.json({
            message: "You have Signed IN"
        })
    }

    else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }



})

UserRouter.get("/user courses", (res, req) => {
    res.json({
        message: "User purchased courses endpoint"
    })
})

module.exports = {
    UserRouter: UserRouter,
}