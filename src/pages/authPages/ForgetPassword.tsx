import { useState } from "react";
import type { LoginError } from "../../interface/auth.type";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { forgotPasswordAPI,  VerifyEmailApi } from "../../services/NwConfig";
import { useLocation, useNavigate } from "react-router-dom";

interface ForgetPasswordForm {
    email: string;
}

interface Passwords {
    password?: number,
    comfpassword?: number,
}

export default function ForgetPassword() {
    const navigator = useNavigate();
    const [formData, setFormData] = useState<ForgetPasswordForm>({ email: '' })
    const [isLoading, setLoading] = useState<boolean>(false)
    const [passwords, setPasswords] = useState<Passwords>()

    const fildState = useLocation();
    const isOpen = fildState.state?.show == "password" ? true : false;
    // console.log("email :", fildState?.state?.userEmail);

    const [openPassword] = useState(isOpen)

    const [errors, setErrors] = useState<LoginError>()

    // Block space in input fields
    const blockSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    // console.log(e.target.name ," - ",e.target.value);

    // Login form validation messege 
    const validate = (): boolean => {
        const newErrors: LoginError = {}
        // console.log("validation :", formData);
        if (!formData!.email) {
            newErrors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData!.email)) {
            newErrors.email = 'Invalid email'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // console.log("form data :", formData);

        const isValid = validate()
        if (!isValid) {
            setLoading(false);
            // return console.log("fals, submit data:", formData);
        }

        const ApiResponce = await VerifyEmailApi({ "email": formData.email as string })
        if (ApiResponce.success) {
            setLoading(false)
            // console.log("api responce :",ApiResponce);

            navigator("/verify-otp", { state: { email: formData.email, next: "/forgetPassword", from: "forgetPassword" } })
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

        // console.log("APi responce", ApiResponce);
    }



    const Passwordvalidate = (): boolean => {
        const newErrors: LoginError = {};

        const password = passwords?.password || "";
        const confirmPassword = passwords?.comfpassword || "";
        const Spass = password.toString()


        // 1. Required
        if (!password) {
            newErrors.password = "Password is required";
        }
        if (!confirmPassword) {
            newErrors.confpassword = "Confirm Password is required";
        }

        // 2. Must be only numbers (digits)
        else if (!/^\d+$/.test(Spass)) {
            newErrors.password = "Password must contain only numbers";
        }

        // 3. Length (min 6, max 10)
        else if (Spass.length < 6 || Spass.length > 10) {
            newErrors.password = "Password must be 6 to 10 digits";
        }

        // 4. Match check
        if (password && confirmPassword && password !== confirmPassword) {
            newErrors.confpassword = "Passwords do not match";
        }

        setErrors(newErrors);
        setLoading(false)

        return Object.keys(newErrors).length === 0;
    };

    const handelPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    }

    const handleSavePassword = async () => {
        setLoading(true)
        const valid = Passwordvalidate()
        // console.log("errors :", errors);

        const userEmail = fildState?.state?.userEmail;

        // console.log(valid);
        if (valid) {
               const resp = await forgotPasswordAPI({email: userEmail, password : passwords?.comfpassword})
               if(resp.success == false){
                // setErrors({confpassword : resp.message})
                 setLoading(false)
                    Swal.fire({
                        title: resp.message,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000
                    });
                return
               }else{
                setLoading(false)
                navigator("/login")
               }
        }
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
                            Reset Password
                        </h1>
                    </div>

                    {/* Form */}

                    {/* Email */}
                    {!openPassword ?
                        <div className="group relative">
                            <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
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
                                    <p className="mt-1.5 font-mono text-10px tracking-widest uppercase text-[#FFD4B8]">
                                        {errors.email}
                                    </p>
                                )}

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
                                    ) : ("Verify ->")
                                    }
                                </button>
                            </form>
                        </div>
                        : <>
                            <div className="group relative">
                                <label className="block font-mono text-sm tracking-[0.14em] uppercase text-[#454C5E] mb-2 group-focus-within:text-[#B8F5D4] transition-colors duration-200">
                                    New Password
                                </label>
                                <input
                                    name="password"
                                    value={passwords?.password}
                                    type="number"
                                    placeholder="********"
                                    onChange={handelPasswordChange}
                                    onKeyDown={blockSpace}
                                    className="w-full bg-transparent border-0 border-b border-[#1E2330] focus:border-[rgba(184,245,212,0.5)] pb-2.5 pt-1 font-mono text-sm font-light text-[#F0F2F5] placeholder-[#2A2E38] outline-none transition-colors duration-200"
                                />
                                {errors?.password && (
                                    <p className="mt-1.5 font-mono text-10px tracking-widest uppercase text-[#FFD4B8]">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="group relative">
                                <label className="block font-mono text-sm tracking-[0.14em] uppercase text-[#454C5E] mb-2 group-focus-within:text-[#B8F5D4] transition-colors duration-200">
                                    Confirm Password
                                </label>
                                <input
                                    name="comfpassword"
                                    value={passwords?.comfpassword}
                                    type="password"
                                    placeholder="********"
                                    onChange={handelPasswordChange}
                                    onKeyDown={blockSpace}
                                    className="w-full bg-transparent border-0 border-b border-[#1E2330] focus:border-[rgba(184,245,212,0.5)] pb-2.5 pt-1 font-mono text-sm font-light text-[#F0F2F5] placeholder-[#2A2E38] outline-none transition-colors duration-200"
                                />
                                {errors?.confpassword && (
                                    <p className="mt-1.5 font-mono text-10px tracking-widest uppercase text-[#FFD4B8]">
                                        {errors.confpassword}
                                    </p>
                                )}
                            </div>

                            <button
                                onClick={handleSavePassword}
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
                                ) : ("Change Password ->")
                                }
                            </button>

                        </>}



                    {/* Submit */}
                   


                    {/* Footer */}

                    {!openPassword &&
                        <div className="mt-10 pt-6 border-t border-[#1E2330] font-mono text-sm tracking-widest uppercase text-[#2A2E38] text-center">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-[#B8F5D4] hover:underline">
                                Sign up →
                            </a>
                        </div>
                    }
                </div>
            </div >
        </div >
    )
}
