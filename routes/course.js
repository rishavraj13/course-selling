const express = require("express")
const Router = express.Router
const CourseRouter = Router();


CourseRouter.get("/Purchase", (res, req) => {
    res.json({
        message: "for purchasing endpoint"
    })
})


CourseRouter.get("/courses available", (res, req) => {
    res.json({
        message: "courses available endpoint"
    })
})

module.exports = {
    CourseRouter: CourseRouter
}