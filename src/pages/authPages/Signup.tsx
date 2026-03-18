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
        console.log("validation :", formData);

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
        e.preventDefault();
        const isValid = validate()
        if (!isValid) {
            return console.log("fals, submit data:", formData);
        }

        const ApiResponce = await EmailSignupApi(formData)
        if (ApiResponce.success) {
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
            navigator("/verify-otp", { state: { email: formData.email } })
        } else {
            // alert(ApiResponce.message)
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
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            <div className="w-1/3 h-3/4 bg-white flex flex-col items-center justify-center space-y-2 " >
                <h1 className="text-2xl ">Signup page</h1>
                <div className="w-4/5  bg-gray-700 flex flex-col" >
                    <form className="grid" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            value={formData?.name}
                            placeholder="Username"
                            className="p-2 m-2"
                            onChange={handleChange}
                            onKeyDown={blockNameSpace}
                        />
                        {errors?.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <input
                            name="email"
                            value={formData?.email}
                            type="email"
                            placeholder="Email"
                            className="p-2 m-2"
                            onChange={handleChange}
                            onKeyDown={blockSpace}
                        />
                        {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <input
                            name="password"
                            value={formData?.password}
                            type="password"
                            placeholder="Password"
                            className="p-2 m-2"
                            onChange={handleChange}
                            onKeyDown={blockSpace}
                        />
                        {errors?.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                        <button type="submit" className="bg-blue-500 text-white p-2 m-2">Signup</button>
                    </form>
                </div>
            </div>

        </div>
    )
}