const mongoose = require("mongoose")
console.log("connected to db");

const Schema = mongoose.Schema
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


const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin",adminSchema );
const courseModel = mongoose.model("Courses", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}