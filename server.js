const express=require("express");
const app=express()
const jwt=require("jsonwebtoken")
const port=3000

app.use(express.json())

const jwt_pass="abcde"
const users=[]

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})
app.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    if(!username || !password){
        return res.status(404).json({
            msg:"Please provide username and password"
        })
    }

    const userExists=users.find(user=>user.username===username)
    if(userExists){
        return res.status(400).json({
            msg:"User already exists"
        })
    }

    users.push({username,password})
     console.log(users)
    return res.status(201).json({msg: "User created successfully"})
   
})


app.post("/signin",(req,res)=>{
         const username=req.body.username
         const password=req.body.password;
         
         if(!username || !password){
            return res.status(404).json({
                msg:"Please provide username and password"
         })}

         const foundUser=users.find(user=>username===user.username && password===user.password )
         if(!foundUser){
            return res.status(404).json({
                msg:"Invalid username or password"
            })
         }
        const token=jwt.sign({username},jwt_pass,{expiresIn:"1h"})
        
        
        return res.json({
            msg:"User signed in successfully",
            username:foundUser.username,
            token:token
        })


        })

        function authentication(req, res, next) {
            const token = req.headers.token;
            const decodedData=jwt.verify(token, jwt_pass);

            if(!decodedData.username){
                return res.json({
                    msg:"invalid token"
                })
            }
            req.username = decodedData.username;
            next()
        }
        app.get("/me",authentication,(req,res)=>{
               
            let foundUser=null;
               for(let i=0;i<users.length;i++){
                if(users[i].username===req.username){
                    foundUser=users[i];
                    break;
                }
               }
                 
               
               res.json({
               
                username: foundUser.username,
                password: foundUser.password
               })

               }
            )
app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})
