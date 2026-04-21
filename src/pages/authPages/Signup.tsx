import type { EmailSignup, SignupError } from "../../interface/auth.type"
import { useState } from "react"
import { EmailSignupApi } from "../../services/NwConfig"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const navigator = useNavigate();
    const [formData, setFormData] = useState<EmailSignup>({
        name: '',
        email: '',
        password: '',
        role: 'developer',
        authType: 'email'
    })

    const [isLoading, setLoading] = useState<boolean>(false)


    const [errors, setErrors] = useState<SignupError>()

    // Block space in input fields
    const blockSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ') e.preventDefault()
    }
    const blockNameSpace = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ' ' && formData?.name.length === 0) e.preventDefault()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let senitized = value;
        if (name === "name") {
            senitized = value.trimStart().replace(/\s+/g, ' ');
        }

        setFormData(prev => ({
            ...prev,
            [e.target.name]: senitized,
        } as EmailSignup));
        // console.log(e.target.name ," - ",e.target.value);
    }

    // Signup form validation messege 
    const validate = (): boolean => {
        const newErrors: SignupError = {}
        // console.log("validation :", formData);

        if (!formData!.name.trim()) {
            newErrors.name = 'Name is required'
        } else if (formData!.name.trim().length < 2) {
            newErrors.name = 'Min 2 characters'
        }

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
        setLoading(true);
        e.preventDefault();
        const isValid = validate()
        if (!isValid) {
            setLoading(false)
            return console.log("fals, submit data:", formData);
        }

        const ApiResponce = await EmailSignupApi(formData)
        if (ApiResponce.success) {
            setLoading(false);
            Swal.fire({
                title: "User created successfully",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'developer',
                authType: 'email'
            })
            navigator("/verify-otp", { state: { email: formData.email , next : "/login" } })
        } else {
            // alert(ApiResponce.message)
                setLoading(false);
            Swal.fire({
                title: ApiResponce.message,
                icon: "error",
                showConfirmButton: false,
                timer: 2000
            });
        }

        // console.log("APi responce", ApiResponce);
    }

    return (
       <div className="w-full h-screen bg-[#06070A] flex items-center justify-center px-4">
  <div className="w-full max-w-md flex flex-col">

    {/* Header */}
    <div className="mb-10">
      <p className="font-mono text-sm tracking-[0.2em] uppercase text-[#454C5E] mb-2">
        — New Account
      </p>
      <h1 className="font-display text-5xl tracking-wide text-[#F0F2F5] leading-none">
        SIGN UP
      </h1>
    </div>

    {/* Form */}
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>

      {/* Username */}
      <div className="group relative">
        <label className="block font-mono text-sm tracking-[0.14em] uppercase text-[#454C5E] mb-2 group-focus-within:text-[#B8F5D4] transition-colors duration-200">
          Username
        </label>
        <input
          type="text"
          name="name"
          value={formData?.name}
          placeholder="krishna_verma"
          onChange={handleChange}
          onKeyDown={blockNameSpace}
          className="w-full bg-transparent border-0 border-b border-[#1E2330] focus:border-[rgba(184,245,212,0.5)] pb-2.5 pt-1 font-mono text-[0.82rem] font-light text-[#F0F2F5] placeholder-[#2A2E38] outline-none transition-colors duration-200"
        />
        {errors?.name && (
          <p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.08em] uppercase text-[#FFD4B8]">
            {errors.name}
          </p>
        )}
      </div>

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
          className="w-full bg-transparent border-0 border-b border-[#1E2330] focus:border-[rgba(184,245,212,0.5)] pb-2.5 pt-1 font-mono text-[0.82rem] font-light text-[#F0F2F5] placeholder-[#2A2E38] outline-none transition-colors duration-200"
        />
        {errors?.email && (
          <p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.08em] uppercase text-[#FFD4B8]">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="group relative">
        <label className="block font-mono text-sm tracking-[0.14em] uppercase text-[#454C5E] mb-2 group-focus-within:text-[#B8F5D4] transition-colors duration-200">
          Password
        </label>
        <input
          name="password"
          value={formData?.password}
          type="password"
          placeholder="••••••••"
          onChange={handleChange}
          onKeyDown={blockSpace}
          className="w-full bg-transparent border-0 border-b border-[#1E2330] focus:border-[rgba(184,245,212,0.5)] pb-2.5 pt-1 font-mono text-[0.82rem] font-light text-[#F0F2F5] placeholder-[#2A2E38] outline-none transition-colors duration-200"
        />
        {errors?.password && (
          <p className="mt-1.5 font-mono text-[0.625rem] tracking-[0.08em] uppercase text-[#FFD4B8]">
            {errors.password}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full font-mono text-sm tracking-widest uppercase rounded-sm px-8 py-4 mt-2 flex items-center justify-center transition-all duration-200
          ${isLoading
            ? "border border-[#B8F5D4] text-[#B8F5D4] bg-[#B8F5D4]/10 cursor-not-allowed"
            : "bg-[#B8F5D4] text-[#06070A] hover:bg-[#A5E5C1] hover:-translate-y-px"
          }`}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 border border-[#B8F5D4] border-t-transparent rounded-full animate-spin" />
            Please wait...
          </span>
        ) : (
          "Sign Up →"
        )}
      </button>

    </form>

    {/* Bottom */}
    <div className="mt-10 pt-6 border-t border-[#1E2330] font-mono text-sm tracking-widest uppercase text-[#3e4352] text-center">
      Already have an account?{" "}
      <a href="/login" className="text-[#B8F5D4] hover:underline">
        Log in →
      </a>
    </div>

  </div>
</div>
    )
}