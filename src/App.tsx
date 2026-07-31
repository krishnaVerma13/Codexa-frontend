import { Routes, Route, Outlet } from "react-router-dom"
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
import AboutPg from "./pages/AboutPg"
import DesktopOnlyGate from "./components/DesktopOnlyGate"
import PricingPg from "./pages/PricingPg"

function App() {
  return (
    <Routes>
      {/* Open to all screen sizes — marketing + auth */}
      <Route path="/" element={<HomePg />} />
      <Route path="/about" element={<AboutPg />} />
      <Route path="/pricing" element={<PricingPg />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/onboarding" element={<OnBording SignUp="both" />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/forgetPassword" element={<ForgetPassword />} />

      {/* Desktop-only — the actual app */}
      <Route element={<DesktopOnlyGate><Outlet /></DesktopOnlyGate>}>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/codeEditor" element={<CodeEditor />} />
        <Route path="/github-Repo" element={<MyRepo />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Route>
    </Routes>
  )
}

export default App