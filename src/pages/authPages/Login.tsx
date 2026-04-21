import { useState } from "react";
import type { EmailLogin, LoginError } from "../../interface/auth.type";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EmailLoginApi } from "../../services/NwConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigator = useNavigate();
    const [formData, setFormData] = useState<EmailLogin>({
        email: '',
        password: '',
        authType: 'email'
    })
    const [isLoading, setLoading] = useState<boolean>(false)

    const [errors, setErrors] = useState<LoginError>()

    // Block space in input fields
    const blockSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        } as EmailLogin);
    }
    // console.log(e.target.name ," - ",e.target.value);

    // Login form validation messege 
    const validate = (): boolean => {
        const newErrors: LoginError = {}
        console.log("validation :", formData);
        if (!formData!.email) {
            newErrors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData!.email)) {
            newErrors.email = 'Invalid email'
        }

        if (!formData!.password) {
            newErrors.password = 'Password is required'
        } else if (formData!.password.length < 6) {
            newErrors.password = 'Min 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log("form data :", formData);

        const isValid = validate()
        if (!isValid) {
            setLoading(false);
            return console.log("fals, submit data:", formData);
        }

        const ApiResponce = await EmailLoginApi(formData)
        if (ApiResponce.success) {
            setLoading(false)
            // console.log("api responce :",ApiResponce);
            localStorage.setItem("token", ApiResponce.data)
            Swal.fire({
                title: "User Login successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
            navigator("/")
        } else {
            // alert(ApiResponce.message)
            setLoading(false)
            Swal.fire({
                title: ApiResponce.message,
                icon: "error",
                showConfirmButton: false,
                timer: 2000
            });
        }

        console.log("APi responce", ApiResponce);
    }

    return (
        <div>
            <div className="w-full h-screen bg-[#06070A] flex items-center justify-center px-4">
                <div className="w-full max-w-md flex flex-col">

                    {/* Header */}
                    <div className="mb-10">
                        <p className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-[#454C5E] mb-2">
                            — Account Access
                        </p>
                        <h1 className="font-display text-6xl tracking-wide text-[#F0F2F5] leading-none">
                            SIGN IN
                        </h1>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>

                        {/* Email */}
                        <div className="group relative">
                            <label className="block font-mono text-sm tracking-[0.14em] uppercase text-[#454C5E] mb-2 group-focus-within:text-[#B8F5D4] transition-colors duration-200">
                                Email
                            </label>
                            <input
                                name="email"
                                value={formData?.email}
                                type="email"
                                placeholder="you@example.com"
                                onChange={handleChange}
                                onKeyDown={blockSpace}
                                className="w-full bg-transparent border-0 border-b border-[#1E2330] focus:border-[rgba(184,245,212,0.5)] pb-2.5 pt-1 font-mono text-sm font-light text-[#F0F2F5] placeholder-[#2A2E38] outline-none transition-colors duration-200"
                            />
                            {errors?.email && (
                                <p className="mt-1.5 font-mono text-[0.625rem] tracking-widest uppercase text-[#FFD4B8]">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="group relative">
                            <div className="flex items-center justify-between mb-2">
                                <label className="font-mono text-sm  tracking-[0.14em] uppercase text-[#454C5E] group-focus-within:text-[#B8F5D4] transition-colors duration-200">
                                    Password
                                </label>
                                <a
                                    // href="/forgetPassword"
                                    onClick={()=> navigator("/forgetPassword")}
                                    className="font-mono text-sm tracking-widest uppercase text-[#454C5E] hover:text-[#B8F5D4] transition-colors duration-200" >
                                    Forgot?
                                </a>
                            </div>
                            <input
                                name="password"
                                value={formData?.password}
                                type="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                onKeyDown={blockSpace}
                                className="w-full bg-transparent border-0 border-b border-[#1E2330] focus:border-[rgba(184,245,212,0.5)] pb-2.5 pt-1 font-mono text-sm font-light text-[#F0F2F5] placeholder-[#2A2E38] outline-none transition-colors duration-200"
                            />
                            {errors?.password && (
                                <p className="mt-1.5 font-mono text-[0.625rem] tracking-widest uppercase text-[#FFD4B8]">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className={`
                                w-full mt-2 font-mono text-sm tracking-widest uppercase
                                rounded-sm px-8 py-4 flex items-center justify-center
                                transition-all duration-200
                                ${isLoading
                                    ? 'border border-[#B8F5D4] text-[#B8F5D4] bg-[#B8F5D4]/10 cursor-not-allowed'
                                    : 'bg-[#B8F5D4] text-[#06070A] hover:bg-[#A5E5C1] hover:-translate-y-px'
                                }
                            `}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 border border-[#B8F5D4] border-t-transparent rounded-full animate-spin" />
                                    Logging in...
                                </span>
                            ) : (
                                'Sign In →'
                            )}
                        </button>

                    </form>

                    {/* Footer */}
                    <div className="mt-10 pt-6 border-t border-[#1E2330] font-mono text-sm tracking-widest uppercase text-[#2A2E38] text-center">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-[#B8F5D4] hover:underline">
                            Sign up →
                        </a>
                    </div>

                </div>
            </div >
        </div >
    )
}