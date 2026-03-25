import { Routes , Route } from "react-router-dom"
import HomePg from "./pages/HomePg"
import Signup from "./pages/authPages/Signup"
import Login from "./pages/authPages/Login"
import VerifyOTP from "./pages/authPages/VerifyOTP"
import OnBording from "./pages/OnBording"

import UserDashboard from "./pages/dashboard/UserDashboard"
import UserProfile from "./pages/dashboard/UserProfile"
import AuthCallback from "./pages/authPages/AuthCallback"

function App() {
 
  return (
    <>
    
    <Routes>
     
      <Route path="/" element={<HomePg/>} /> 
      <Route path="/userProfile" element={<UserProfile/>} />
     
      <Route path="/signup" element={<Signup/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/verify-otp" element={<VerifyOTP/>} /> 
      <Route path="/onboarding" element={<OnBording/>} /> 
      <Route path="/dashboard" element={<UserDashboard/>} /> 
      <Route path="/auth/callback" element={<AuthCallback/>} /> 

     
    </Routes>
   
    </>   
  )
}

export default App
