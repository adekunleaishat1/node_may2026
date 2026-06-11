import React,{useState} from 'react'
import axios from "axios"
const Signup = () => {
    const [userdetails,setUserdetails] = useState({
        username:"",
        email:"",
        password:""
    })
    const Signupuser = () =>{
        if (userdetails) {
            axios.post("http://localhost:8009/user/signup",userdetails)
            .then((res)=>{
                console.log(res);
                
            }).catch((err)=>{
                console.log(err?.response?.data?.message);
                
            })
        }
    }
  return (
    <div>
        <h1>Signup Page</h1>
        <div>
            <input onChange={(e)=> setUserdetails({...userdetails, username:e.target.value})}  type="text" placeholder="Username" />
            <input onChange={(e)=> setUserdetails({...userdetails, email:e.target.value})}  type="email" placeholder="Email" />
            <input onChange={(e)=> setUserdetails({...userdetails, password:e.target.value})}  type="password" placeholder="Password" />
            <button onClick={Signupuser}>Submit</button>
        </div>
    </div>
  )
}

export default Signup