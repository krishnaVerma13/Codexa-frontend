import { Routes , Route } from "react-router-dom"
import HomePg from "./pages/HomePg"
import Signup from "./pages/authPages/Signup"
import Login from "./pages/authPages/Login"
import VerifyOTP from "./pages/authPages/VerifyOTP"
import OnBording from "./pages/OnBording"
import MainLayout from "./routes/layouts/MainLayout"
import AuthLayout from "./routes/layouts/AuthLayout"

function App() {
 
  return (
    <>
    
    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<HomePg/>} /> 
      </Route>
      <Route element={<AuthLayout/>}>
      <Route path="/signup" element={<Signup/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/verify-otp" element={<VerifyOTP/>} /> 
      <Route path="/onboarding" element={<OnBording/>} /> 
      </Route>
    </Routes>
   
    </>   
  )
}

export default App
