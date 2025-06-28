
const jwt = require("jsonwebtoken")
const {JWT_USER} = require("../config")


function usermiddleware (req, res, next) {
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
    usermiddleware: usermiddleware,
}