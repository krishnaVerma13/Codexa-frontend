import { Routes , Route } from "react-router-dom"
import HomePg from "./pages/HomePg"
import Signup from "./pages/authPages/Signup"
import Login from "./pages/authPages/Login"
import VerifyOTP from "./pages/authPages/VerifyOTP"
import Navbar from "./components/Navbar"
import { Footer } from "./components/Footer"

function App() {
 
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePg/>} /> 
      <Route path="/signup" element={<Signup/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/verify-otp" element={<VerifyOTP/>} /> 
    </Routes>
    <Footer/>
    </>   
  )
}

export default App
