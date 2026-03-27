import axios from "axios";
import type { EmailLogin, EmailSignup } from "../interface/auth.type";
import { API_BASE_URL, GetUserData, LoginUrl, ResendOTPUrl, SignupUrl, VerifyOTPUrl } from "./api";

const getToken = ()=>{
    const token = localStorage.getItem('token')
    if (token) {
        return token;
    }else{
        return alert("token not found") ;
        
    }
        
}

export const EmailSignupApi = async (data : EmailSignup) =>{
    try {
         let url = API_BASE_URL + SignupUrl
         const response = await axios.post(url, data);
            return response.data;         
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error("Signup API error:", error.response?.data || error.message);
            return{ success: false, message: error.response?.data?.message || "Signup failed" };  
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}



export const EmailLoginApi = async (data : EmailLogin) =>{
    try {
         let url = API_BASE_URL + LoginUrl
         const response = await axios.post(url, data);
            return response.data;         
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error("Login API error:", error.response?.data || error.message);
            return{ success: false, message: error.response?.data?.message || "Login failed" };  
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}



export const VerifyOTPApi = async (data : object) =>{
    try {
         let url = API_BASE_URL + VerifyOTPUrl
         const response = await axios.post(url, data);
            return response.data;         
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return{ success: false, message: error.response?.data?.message || "Verify OTP failed" };  
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}



export const ResendOTPApi = async (data : object) =>{
    try {
         let url = API_BASE_URL + ResendOTPUrl
         const response = await axios.post(url, data);
            return response.data;         
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return{ success: false, message: error.response?.data?.message || "Verify OTP failed" };  
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetCurrentUser = async () =>{
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );
        
        const token = getToken();
        // console.log("token : ",token);
        
         let url = API_BASE_URL + GetUserData
         const response = await axios.get(url , {
            headers :{
                Authorization: `Bearer ${token}`,
            }
         });
            // console.log("responce : ",response);
            
            return response.data.data;         
    } catch (error) {
        if(axios.isAxiosError(error)){
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return{ success: false, message: error.response?.data?.message || "Verify OTP failed" };  
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}







