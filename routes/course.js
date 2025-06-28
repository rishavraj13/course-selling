const express = require("express")
const Router = express.Router
const CourseRouter = Router();
const { jwt } = require("zod/v4");

const{ userModel }= require("../middlewares/user")
const { purchaseModel, courseModel }= require("../db")


CourseRouter.get("/Purchase", async(res, req) => {
    const UserId = req.body.UserId
    const CourseId = req.body.CourseId

    await purchaseModel.create({
        UserId,
        CourseId
    })

    res.json({
        message: "for purchasing endpoint"
    })
})


CourseRouter.get("/preview", async(res, req) => {

    const courses = await courseModel.find({})

    res.json({
        message: "courses available endpoint",
        courses
    })
})

module.exports = {
    CourseRouter: CourseRouter
}