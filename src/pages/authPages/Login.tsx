import { useState } from "react";
import type { EmailLogin, LoginError } from "../../interface/auth.type";
// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EmailLoginApi } from "../../services/NwConfig";

export default function Login() {
    // const navigator = useNavigate();
    const [formData , setFormData] = useState<EmailLogin>({
        email: '',
        password: '',
        authType: 'email'
    })

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
                console.log("form data :", formData);

                const isValid = validate()
                if (!isValid) {
                    return console.log("fals, submit data:", formData);
                }
        
                const ApiResponce = await EmailLoginApi(formData)
                if (ApiResponce.success) {
                    Swal.fire({
                        title: "User Login successfully",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });
                    // setFormData({
                    //     email: '',
                    //     password: '',
                    //     authType: 'email'
                    // })
                    // navigator("/login")
                } else {
                    // alert(ApiResponce.message)
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
         <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            <div className="w-1/3 h-3/4 bg-white flex flex-col items-center justify-center space-y-2 " >
                <h1 className="text-2xl ">Login page</h1>
                <div className="w-4/5  bg-gray-200 px-2 py-4 flex flex-col" >
                    <form className="grid" onSubmit={handleSubmit}>
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

                        <button type="submit" className="bg-blue-500 text-white p-2 m-2">Login</button>
                    </form>
                        <p>Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>
                </div>
            </div>

        </div>
    )
}