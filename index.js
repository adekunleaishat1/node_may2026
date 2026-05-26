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
  username:{type:String, required:true,trim:true},
  email:{type:String, unique:true,trim:true, required:true},
  password:{type:String,trim:true, required:true}
})

const usermodel = mongoose.model("users_collection",userschema)

const todoschema = mongoose.Schema({
  title:{type:String,required:true,trim:true },
  description:{type:String, required:true, trim:true},
  completed:{type:Boolean, default:false}
},{timestamps:true})

const todomodel = mongoose.model("todos", todoschema)


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

app.get("/todo", async(req, res)=>{
 try {
  const alltodo = await todomodel.find()
 res.render("to-do",{alltodo,gender:"female"})
 } catch (error) {
  console.log(error);
  
 }
})

app.post("/user/signup", async(req, res)=>{
 console.log(req.body);
  try {
    const {email , username , password} = req.body
    if (!email || !username || !password) {
      return res.send("All fields are mandatory.")
    }
   const existUser = await usermodel.findOne({email})
   console.log(existUser);
   if (existUser) {
    return res.send("User already exist.")
   }
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

app.post("/addtodo", async(req,res) => {
  try {
    const newTodo =   await todomodel.create(req.body)
    console.log(newTodo);
    if (newTodo) {
      return res.redirect("/todo")
    }

  } catch (error) {
    console.log(error.message);
    if (error.message.includes("todos validation failed")) {
      return res.send("all fields are mandatory")
    }
     return res.send(error.message)
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