require('dotenv').config();
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require('dotenv');


const jsonwebtoken = require("jsonwebtoken")
const { UserRouter } = require("./routes/user")
const { CourseRouter }= require("./routes/course")
const { adminRouter } = require("./routes/admin")


app.use(express.json())

app.use("/user", UserRouter);
app.use("/Courses", CourseRouter);
app.use("/admin" , adminRouter);

// async function main() {

//     await mongoose.connect(process.env.MONGO_URI)
//     app.listen('3000');
//     console.log("lisiting to the database");
    
    
// }

// main().catch(err => console.error("Connection error:", err));



async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(3000, () => {
      console.log("🚀 Server listening on port 3000");
    });
  } catch (err) {
    console.error("❌ Connection error:", err.message);
  }
}

main();



//command shif L select them all at once 
