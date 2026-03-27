
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function Logout (){
    const navigator = useNavigate()
    const queryClint = useQueryClient()
    const logout= ()=>{
        localStorage.removeItem('token')
        queryClint.removeQueries({queryKey:['userData']})
        const token = localStorage.getItem('token')
        if (token) {
        localStorage.removeItem('token')
        }
        toast("Logout Successfully " , {
                duration : 2000,
            })
        navigator('/')
       
            
    }
    useEffect(()=>{
       logout() 
    },[])
    return(<>
        <div><Toaster position="top-center"/></div>
    </>)
}