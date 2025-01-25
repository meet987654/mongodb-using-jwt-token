const {Router}=require("express");
const router=Router();
const userMiddleware=require("../middlewares/user");
const { User ,Course} = require("../db");

router.post('/signup',(req,res)=>{
 
    const username=req.body.username;
    const password=req.body.password;
    User.create({
        username,
        password
    })
    res.json({
        message:"user created successfully",
    })
});

router.get('/courses',async (req,res)=>{
    const response =await Course.find({});
    res.json({
        course:response, 
    })
})

router.post('/courses/:courseId',userMiddleware,async (req,res)=>{
    const courseId=req.params.courseId;
    const username=req.username;
    await User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses:courseId,             
        }
    })
    res.json({
        message:"purchase completed"
    })
})

router.get('/purchasedCourses',userMiddleware,async (req,res)=>{
    const user =await User.findOne({
        username:req.body.username
    })

    const courses=await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    console.log(user.purchasedCourses)
    res.json({
        courses:courses
        })
    
})

module.exports=router;