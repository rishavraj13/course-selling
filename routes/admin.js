const express = require("express")
const Router = express.Router
const adminRouter = Router();
const { adminModel } = require("../db")
const { userModel } = require("../db")
const zod = require("zod");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { JWT_ADMIN } = require("../config")
const { adminMiddleware } = require("../middlewares/admin");
const course = require("./course");



adminRouter.post("/signup", async (res, req) => {
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

        await adminModel.create({
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

adminRouter.post("/signin", async (res, req) => {
    const email = req.body.email
    const password = req.body.password

    const user = await adminModel.findOne({
        email: email,
    })

    const passwordMatch = bcrypt.compare(password, user.password)


    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id // doubt???

        }, JWT_ADMIN);

        res.json({
            token: token // doubt??
        })
        res.json({
            message: "You have Signed IN"
        })
    }

    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

adminRouter.put("/Createcourses", adminMiddleware, async (res, req) => {

    const AdminId = req.userId;

    const { title, Description, price, imgUrl, creator, validity } = req.body

    
    await courseModel.create({
        title: title,
        Description: Description,
        price: price,
        imgUrl: imgUrl,
        creator: AdminId,
        validity: validity,

    })


    res.json({
        message: "courses addition endpoint",
        courseId: course._id,
        

    })
})


adminRouter.put("/EditCourse ", adminMiddleware, async (res, req) => {

    const AdminId = req.userId;

    const { title, Description, price, imgUrl, creator, validity } = req.body

    const courses = await courseModel.findOne ({
        courseId: AdminId
    })


    res.json({
        message: "courses Edit endpoint",
        courseId: course._id,

    })
})




adminRouter.put("/YourCourses ", adminMiddleware, async (res, req) => {

    const AdminId = req.userId;

    const { title, Description, price, imgUrl, creator, validity } = req.body

    const course = await courseModel.updateOne ({
        _id: courseId, 
        courseId: AdminId
    },{
        title: title,
        Description: Description,
        price: price,
        imgUrl: imgUrl,
        creator: AdminId,
        validity: timeperiod,

    })


    res.json({
        message: "courses Edit endpoint",
        courseId: course._id,

    })
})


module.exports = {
    adminRouter: adminRouter
}