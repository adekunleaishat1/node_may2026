// Imports
const express = require("express")
 const app =  express()
 require("ejs")
const mongoose = require("mongoose")

// CRUD CREATE READ UPDATE DELETE

// Read
// FIND
// FINDBYID
// FINDONE

// middlewares
app.set("view engine", "ejs")
app.use(express.urlencoded())

// 
const userschema = mongoose.Schema({
  username:{type:String},
  email:{type:String},
  password:{type:String}
})

const usermodel = mongoose.model("users_collection",userschema)


// funhctions
const detail =[
  {"name":"hammid", "class":"Nodejs", "food":"Amala"},
        {"name":"samuel", "class":"Reactjs", "food":"Akpu"},
        {"name":"oladeji", "class":"Nodejs", "food":"Semo"},
        {"name":"Omotayo", "class":"Angular", "food":"Bread and Groundnut"},
        {"name":"Esther", "class":"React js", "food":"Garri and cold water"},
        {"name":"Goodness", "class":"Node js", "food":"Bread And Beans"},
        {"name":"Kolade", "class":"Php", "food":"Pounded Yam"},
        {"name":"Daniel", "class":"Flutter", "food":"Bread And Akara"},
        {"name":"Lukman", "class":"Angular", "food":"JolllofRice"},
        {"name":"Patric", "class":"Nodejs", "food":"Yam and Egg"},
]

const alluser = []
let userDetails = []
app.get("/",(request, response)=>{
    // response.send("Welcome your Node class!!!")
    console.log(__dirname);
    // response.sendFle(__dirname + "/index.html")
    response.sendFile(`/Users/dev_yeesha/Desktop/node/maycohort2026/index.html`)

})

app.get("/home",(req, res)=>{

  res.render("index",{name:"yemi",gender:"male"})

})

app.get("/user",(request, response)=>{
  response.json({
    "users":[
        {"name":"hammid", "class":"Nodejs", "food":"Amala"},
        {"name":"samuel", "class":"Reactjs", "food":"Akpu"},
        {"name":"oladeji", "class":"Nodejs", "food":"Semo"},
        {"name":"Omotayo", "class":"Angular", "food":"Bread and Groundnut"},
        {"name":"Esther", "class":"React js", "food":"Garri and cold water"},
        {"name":"Goodness", "class":"Node js", "food":"Bread And Beans"},
        {"name":"Kolade", "class":"Php", "food":"Pounded Yam"},
        {"name":"Daniel", "class":"Flutter", "food":"Bread And Akara"},
        {"name":"Lukman", "class":"Angular", "food":"JolllofRice"},
        {"name":"Patric", "class":"Nodejs", "food":"Yam and Egg"},
    ]
  })
})

app.get("/login",(req, res)=>{
  res.render("login")
})
app.get("/dashboard",(req, res)=>{
  console.log(req.query);
  const {username} = req.query
  res.render("dashboard",{username})
})

app.get("/todo",(req, res)=>{
 res.render("to-do",{detail,gender:"female"})
})

app.post("/user/signup", async(req, res)=>{
 console.log(req.body);
  try {
  const newuser =  await usermodel.create(req.body)
  console.log(newuser);
  if (newuser) {
   return res.redirect('/login')
  }
  return res.redirect('/home')
  } catch (error) {
    console.log(error);
    res.redirect('/home')
  }
})

app.post("/user/login", async(req, res)=>{
 try {
  console.log(req.body);
    const {email, password } = req.body
  const existUser =  await usermodel.findOne({email})
  console.log(existUser);
  if (existUser && existUser.password == password) {
    const username = existUser.username
    return  res.redirect(`/dashboard/?username=${username}`)
  }
  res.redirect("/login")
  
 } catch (error) {
    console.log(error);
    res.redirect("/login")
 }
  // const existuser =  alluser.find((user)=> user.email == email)
  // console.log(existuser);
  // if (existuser && existuser.password == password) {
  //   const username = existuser.username
  //   res.redirect(`/dashboard/?username=${username}`)
  // }else{
  //   res.redirect("/login")
  // }
    
})

app.post("/add", (req,res) => {
  const[beat, camp] = req.body
  if (!beat ) {
    
  }

})

 const port = 8009
 app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
 })


const Uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/May2026?appName=Cluster0"



const Connect = async () =>{
 try {
  const connection = await mongoose.connect(Uri)
  if (connection) {
     console.log("Database connected successfully");
  }
  
 } catch (error) {
  console.log(error);
  
 }
}
Connect()