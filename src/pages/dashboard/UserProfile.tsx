import { useState } from "react";
// import { Link } from "react-router-dom"
import { FaRegSave } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FaRegUser } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { IoHome, IoMailOutline } from "react-icons/io5";
// import { IoIosEye } from "react-icons/io";
// import { IoIosEyeOff } from "react-icons/io";
// import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useUser } from "../../routes/queryHooks/User.Query";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DisconnectGithubPopup from "../../components/pageComponents/DisconnectGithubPopup";

export default function UserProfile() {

  const { data } = useUser();
  const navigator = useNavigate()
  const [showPopup, setShowPopup] = useState(false)

  // const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.name,
    username: data?.githubUsername,
    email: data?.email,
    website: '',
    location: '',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };


  return (
    <div>
      <div className="min-h-screen bg-[#06070A] scrollbar-hide">

        {/* <Navbar variant="app" /> */}

        <div className="pt-10 pb-24">
          <div className="flex items-center">
            <div className=" flex items-center text-2xl p-2  px-6 text-gray-600 hover:text-gray-200 duration-300 "
              onClick={() => navigator('/dashboard')} >

              <MdArrowBackIosNew />
              <IoHome />
            </div>
            {/* <MdArrowBackIosNew className="rotate-180"/> */}
            <span className="font-display text-2xl text-[#F0F2F5] mx-5">CODEXA</span>

          </div>
          <div className="max-w-5xl mx-auto px-12 py-12">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-display text-5xl text-[#F0F2F5]">Profile Settings</h1>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2.5 border border-[#B8F5D4] text-[#B8F5D4] font-mono text-sm rounded-sm hover:bg-[#B8F5D4]/10 transition-colors"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2.5 bg-[#B8F5D4] text-[#06070A] font-mono text-sm rounded-sm hover:bg-[#A5E5C1] transition-colors flex items-center gap-2"
                    >
                      <FaRegSave size={16} />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 border border-[#1E2330] text-[#F0F2F5] font-mono text-sm rounded-sm hover:border-[#FFD4B8] transition-colors flex items-center gap-2"
                    >
                      <RxCross1 size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <p className="font-mono text-sm text-[#454C5E]">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Profile Picture Section */}
            <div className="mb-8 bg-[#0D1117] border border-[#1E2330] rounded-xl p-8">
              <div className="font-mono text-xs uppercase text-[#454C5E] mb-6">Profile Picture</div>
              <div className="flex items-center gap-8">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-[#B8F5D4] to-[#D4BCFF] flex items-center justify-center">
                  <FaRegUser size={48} className="text-[#06070A]" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-sm text-[#F0F2F5] mb-4">
                    Upload a profile picture to personalize your account
                  </p>
                  <div className="flex items-center gap-3">
                    <button className="px-5 py-2 border border-[#B8F5D4] text-[#B8F5D4] font-mono text-sm rounded-sm hover:bg-[#B8F5D4]/10 transition-colors">
                      Upload New
                    </button>
                    <button className="px-5 py-2 border border-[#1E2330] text-[#454C5E] font-mono text-sm rounded-sm hover:border-[#FFD4B8] hover:text-[#FFD4B8] transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-8 bg-[#0D1117] border border-[#1E2330] rounded-xl p-8">
              <div className="font-mono text-xs uppercase text-[#454C5E] mb-6">Personal Information</div>
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block font-mono text-xs text-[#454C5E] mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    placeholder="panding.."
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#06070A] border border-[#1E2330] rounded-sm font-mono text-sm text-[#F0F2F5] focus:outline-none focus:border-[#B8F5D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block font-mono text-xs text-[#454C5E] mb-2">Username</label>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-[#454C5E]">@</span>
                    <input
                      type="text"
                      value={formData.username}
                      placeholder="panding.."
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={true}
                      className="flex-1 px-4 py-3 bg-[#06070A] border border-[#1E2330] rounded-sm font-mono text-sm text-[#F0F2F5] focus:outline-none focus:border-[#B8F5D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-xs text-[#454C5E] mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={true}
                    className="w-full px-4 py-3 bg-[#06070A] border border-[#1E2330] rounded-sm font-mono text-sm text-[#F0F2F5] focus:outline-none focus:border-[#B8F5D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>


                <div className="grid grid-cols-2 gap-6">
                  {/* Website */}
                  {/* <div>
                  <label className="block font-mono text-xs text-[#454C5E] mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#06070A] border border-[#1E2330] rounded-sm font-mono text-sm text-[#F0F2F5] focus:outline-none focus:border-[#B8F5D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />  
                </div> */}

                  {/* Location */}
                  {/* <div>
                  <label className="block font-mono text-xs text-[#454C5E] mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#06070A] border border-[#1E2330] rounded-sm font-mono text-sm text-[#F0F2F5] focus:outline-none focus:border-[#B8F5D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div> */}

                </div>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="mb-8 bg-[#0D1117] border border-[#1E2330] rounded-xl p-8">
              <div className="font-mono text-xs uppercase text-[#454C5E] mb-6">Connected Accounts</div>
              <div className="space-y-4">
                {/* GitHub */}
                <div className={`flex items-center justify-between p-4 bg-[#06070A] border border-[#1E2330] 
                              rounded-lg ${data?.authType == "github" ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0D1117] border border-[#1E2330] flex items-center justify-center">
                      <LuGithub size={20} className="text-[#B8F5D4]" />
                    </div>
                    <div>
                      <div className="font-mono text-sm text-[#F0F2F5] mb-1">GitHub</div>
                      <div className="font-mono text-xs text-[#454C5E]">
                        {data?.authType == "github" ? `Connected as ${data?.githubUsername}` : 'Not connected'}</div>
                    </div>
                  </div>
                   <DisconnectGithubPopup
                        isOpen={showPopup}
                        username={data?.githubUsername}       // optional
                        onConfirm={() => {
                          // call your disconnect API here
                          setShowPopup(false)
                        }}
                        onCancel={() => setShowPopup(false)}
                      />
                  <button
                    onClick={() => data?.authType == "github" ? setShowPopup(true) : navigator("/onboarding", { state: { SignUp: "github" } })}
                    className="px-5 py-2 border border-[#FFD4B8] text-[#FFD4B8] font-mono text-sm rounded-sm hover:bg-[#FFD4B8]/10 transition-colors">
                    {data?.authType == "github" ? 'Disconnect' : 'Connect'}
                  </button>
                </div>

                {/* Email (Placeholder for other services) */}
                <div className={`flex items-center justify-between p-4 bg-[#06070A] border border-[#1E2330] rounded-lg ${data?.password ? 'opacity-100' : 'opacity-50'} `}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0D1117] border border-[#1E2330] flex items-center justify-center">
                      <IoMailOutline size={20} className="text-[#454C5E]" />
                    </div>
                    <div>
                      <div className="font-mono text-sm text-[#F0F2F5] mb-1">Google</div>
                      <div className="font-mono text-xs text-[#454C5E]"> {data?.password ? `Connected as ${data?.email}` : 'Not connected'}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => data?.password ? "" : navigator("/onboarding", { state: { SignUp: "email" } })}
                    className="px-5 py-2 border border-[#B8F5D4] text-[#B8F5D4] font-mono text-sm rounded-sm hover:bg-[#B8F5D4]/10 transition-colors">
                    {data?.password ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            </div>

            <div>
              {/* Security */}
              {/* <div className="mb-8 bg-[#0D1117] border border-[#1E2330] rounded-xl p-8">
            <div className="font-mono text-xs uppercase text-[#454C5E] mb-6">Security</div>
            <div className="space-y-6">
              Password
              <div>
                <label className="block font-mono text-xs text-[#454C5E] mb-2">Change Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 pr-12 bg-[#06070A] border border-[#1E2330] rounded-sm font-mono text-sm text-[#F0F2F5] focus:outline-none focus:border-[#B8F5D4] transition-colors placeholder:text-[#454C5E]"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#454C5E] hover:text-[#F0F2F5] transition-colors"
                  >
                    {showPassword ? <IoIosEyeOff  size={18} /> : <IoIosEye size={18} />}
                  </button>
                </div>
              </div>

              Two-Factor Authentication
              <div className="flex items-center justify-between p-4 bg-[#06070A] border border-[#1E2330] rounded-lg">
                <div>
                  <div className="font-mono text-sm text-[#F0F2F5] mb-1">Two-Factor Authentication</div>
                  <div className="font-mono text-xs text-[#454C5E]">Add an extra layer of security to your account</div>
                </div>
                <button className="px-5 py-2 border border-[#B8F5D4] text-[#B8F5D4] font-mono text-sm rounded-sm hover:bg-[#B8F5D4]/10 transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div> */}
            </div>

            {/* Danger Zone */}
            <div className="mt-12 bg-[#0D1117] border border-[#FFD4B8] rounded-xl p-8">
              <div className="font-mono text-xs uppercase text-[#FFD4B8] mb-6">Danger Zone</div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-mono text-sm text-[#F0F2F5] mb-1">Delete Account</div>
                    <div className="font-mono text-xs text-[#454C5E]">Permanently delete your account and all associated data</div>
                  </div>
                  <button className="px-5 py-2 border border-[#FFD4B8] text-[#FFD4B8] font-mono text-sm rounded-sm hover:bg-[#FFD4B8]/10 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </div>
  )
}