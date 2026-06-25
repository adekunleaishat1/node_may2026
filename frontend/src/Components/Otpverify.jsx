import React ,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Otpverify = () => {
    const navigate = useNavigate()
    const [verificationOtp, setverificationOtp] = useState("")
    const Verify = async () =>{
      try {
         const response = await axios.patch("http://localhost:8009/user/verifyotp",{verificationOtp})
         console.log(response);
         if (response.status == 200) {
            navigate("/login")
         }
      } catch (error) {
        console.log(error.response.data.message);
        
      }
       
    }
  return (
    <div>
        <input onChange={(e)=> setverificationOtp(e.target.value)} type="text"  />
        <button onClick={Verify}>Verify Otp</button>
    </div>
  )
}

export default Otpverify 