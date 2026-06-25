import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
     const [loading, setloading] = useState(false)
    const [userdetails,setUserdetails] = useState({
        email:"",
        password:""
    })
    const LoginUser = () =>{
        if (userdetails) {
            setloading(true)
            axios.post("http://localhost:8009/user/login",userdetails)
            .then((res)=>{
                console.log(res);
                if (res.status == 200) {
                    localStorage.setItem("token",res.data.token)
                    toast.success("login successful")
                    navigate("/dashbaord")
                }
            }).catch((err)=>{
                const errormessage = err?.response?.data?.message
                    toast.error(errormessage)
                console.log(err?.response?.data?.message);
                
            }).finally(()=>{
                setloading(false)
            })
        }
    }
  return (
    <div>
        <h1>Login Page</h1>
        <div>
            <input onChange={(e)=> setUserdetails({...userdetails, email:e.target.value})}  type="email" placeholder="Email" />
            <input onChange={(e)=> setUserdetails({...userdetails, password:e.target.value})}  type="password" placeholder="Password" />
            <button disabled={loading} onClick={LoginUser}>{loading ? "Loading..." : "Login"}</button>
        </div>
    </div>
  )
}

export default Login