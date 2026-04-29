import { Routes , Route } from "react-router-dom"
import HomePg from "./pages/HomePg"
import Signup from "./pages/authPages/Signup"
import Login from "./pages/authPages/Login"
import VerifyOTP from "./pages/authPages/VerifyOTP"
import OnBording from "./pages/OnBording"

import UserDashboard from "./pages/UserDashboard"
import UserProfile from "./pages/dashboard/UserProfile"
import AuthCallback from "./pages/authPages/AuthCallback"
import Logout from "./components/function/Logout"
import CodeEditor from "./pages/dashboard/CodeEditor"
import MyRepo from "./pages/dashboard/MyRepo"
import ForgetPassword from "./pages/authPages/ForgetPassword"
import Timeline from "./pages/dashboard/Timeline"
import Recommendations from "./pages/dashboard/Recommendation"





function App() {


 
  return (
    <><Routes>
     
      <Route path="/" element={<HomePg/>} /> 
      <Route path="/userProfile" element={<UserProfile/>} />
     
      <Route path="/signup" element={<Signup/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/verify-otp" element={<VerifyOTP/>} /> 
      <Route path="/onboarding" element={<OnBording SignUp="both"/>} /> 
      <Route path="/auth/callback" element={<AuthCallback/>} /> 
      <Route path="/logout" element={<Logout/>} /> 
      <Route path="/dashboard" element={<UserDashboard/>} /> 
      <Route path="/codeEditor" element={<CodeEditor/>} /> 
      <Route path="/github-Repo" element={<MyRepo/>} /> 
      <Route path="/forgetPassword" element={<ForgetPassword/>} /> 
      <Route path="/timeline" element={<Timeline/>} /> 
      <Route path="/recommendations" element={<Recommendations/>} /> 
      
      
      

     
    </Routes>
   
    </>   
  )
}

export default App
