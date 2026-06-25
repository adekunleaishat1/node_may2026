import React,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashbaord = () => {
   const token =   localStorage.getItem("token")
   const navigate = useNavigate()

   useEffect(() => {
     const verifytoken = async () =>{
        try {
         const response =  await axios.get("http://localhost:8009/user/verifydashboard",{
            headers:{
                "Authorization":`bearer ${token}`
            }
           }) 
           console.log(response);
           
        } catch (error) {
            console.log(error.response)
            if (error.response.status == 500) {
                localStorage.removeItem("token")
               navigate("/login") 
            }
            
        }
     }
     verifytoken()
   }, [token])
   
  return (
    <div>
        Dashbaord
    </div>
  )
}

export default Dashbaord