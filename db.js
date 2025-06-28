const moongoose = require("mongoose")
console.log("connected to db");

moongoose.connect("mongodb+srv://rishavraj7016:k5JTTeJYh2J3Tbna@cluster0.iaxnkib.mongodb.net/Coursera-app")
const Schema = moongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
    email: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String,

})

const adminSchema = new Schema({
    email: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String,

})

const courseSchema = new Schema({
    title: String,
    Description: String,
    price: Number,
    imgUrl: String,
    creator:ObjectId,
    validity:String,
})


const purchaseSchema = new Schema({
    CourseId: ObjectId,
    UserId: ObjectId,

})


const userModel = moongoose.model("user", userSchema);
const adminModel = moongoose.model("admin",adminSchema );
const courseModel = moongoose.model("Courses", courseSchema);
const purchaseModel = moongoose.model("Purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}