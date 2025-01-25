const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://admin:tGJ6lHf0EA0B9aQj@cluster0.pr6f0.mongodb.net/course_selling_app2')

const AdminSchema= new mongoose.Schema({
   username:String,
   password:String
})

const UserSchema= new mongoose.Schema({
   username:String,
   password:String,
   purchasedCourses:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:'Course'
   }]
})

const CourseSchema= new mongoose.Schema({
    title:String,
    description:String,
    imageLink:String,
    price:Number
})

const Admin = mongoose.model('Admin',AdminSchema);
const User = mongoose.model('User',UserSchema);
const Course = mongoose.model('Course',CourseSchema);


module.exports={
    Admin,
    Course,
    User
}