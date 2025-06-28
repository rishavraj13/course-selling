
const jwt = require("jsonwebtoken")
const {JWT_ADMIN} = require("../config")


function adminMiddleware (req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_USER  ) //doubt : is this jwt is the same jwt mention aboved???

    if(decodedData){
        req.userId = decodedData.id;
        next()
    }
    else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware,
} 