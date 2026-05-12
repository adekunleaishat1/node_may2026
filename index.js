const express = require("express")
 const app =  express()
 require("ejs")

app.set("view engine", "ejs")
app.use(express.urlencoded())


const alluser = []

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



app.post("/user/signup",(req, res)=>{
 console.log(req.body);
 const {username , email , password} = req.body
  console.log(username);
  if (!username || !email || !password) {
    res.send("All fields are mandatory")
  }else{
    alluser.push(req.body)
    console.log(alluser);
    res.redirect("/login")
  }
})

app.post("/user/login",(req, res)=>{
    console.log(req.body);
    const {email, password } = req.body
  const existuser =  alluser.find((user)=> user.email == email)
  console.log(existuser);
  if (existuser && existuser.password == password) {
    const username = existuser.username
    res.redirect(`/dashboard/?username=${username}`)
  }else{
    res.redirect("/login")
  }
    
})


 const port = 8009
 app.listen(port,()=>{
  console.log(`app started at port ${port}`);
  
 })


