import axios from "axios";
import type { EmailLogin, EmailSignup } from "../interface/auth.type";
import { AnalysisEditorUrl, AnalysisGithubUrl, AnalysisHistoryIDURl, AnalysisHistoryURl, API_BASE_URL, forgotPassword, GetUserData, LoginUrl, MyPatterenURL, RecommendationURL, ResendOTPUrl, SignupUrl, TimelineURL, UpdatePhoto, UserDataUpdate, VerifyEmail, VerifyOTPUrl } from "./api";
import type { IAnalyzeEditorBody, IAnalyzeGithubBody } from "./service.Types";

export interface Responce {
    success : boolean,
    message: string,
    data? : any,
    error?:any,
}

const getToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
        return token;
    } else {
        return;

    }

}

export const EmailSignupApi = async (data: EmailSignup) => {
    try {
        let url = API_BASE_URL + SignupUrl
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Signup API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Signup failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}



export const EmailLoginApi = async (data: EmailLogin) => {
    try {
        let url = API_BASE_URL + LoginUrl
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Login API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}



export const VerifyOTPApi = async (data: object) => {
    try {
        let url = API_BASE_URL + VerifyOTPUrl
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const VerifyEmailApi = async (data: object) => {
    try {
        let url = API_BASE_URL + VerifyEmail
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}



export const ResendOTPApi = async (data: object) => {
    try {
        let url = API_BASE_URL + ResendOTPUrl
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetCurrentUser = async () => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + GetUserData
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetAllGithubRepos = async (userName : string) => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + `/user/github/${userName}/public/all-repos`
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}

export const GetGithubRepoContents = async (full_name :string , path : string| null) => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + `/user/github/public/repo/contents`
            const response = await axios.post(url, 
                {
                    data: {
                        full_name: full_name,
                        path: path
                    },
                },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("responce : ",response);

            return response.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Get Github Repo Contents API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Get Github Repo Contents failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetGithubRepoTree = async (full_name :string , sha : string| null , type : string | null) => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + `/user/github/public/repo/tree`
            const response = await axios.post(url, 
                {
                    data: {
                        full_name: full_name,
                        sha: sha,
                        type: type
                    },
                },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("responce : ",response);

            return response.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Get Github Repo tree API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Get Github Repo tree failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


// analysis AI APi 

export const GetAnalysisEditorCode = async (file: IAnalyzeEditorBody) => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + AnalysisEditorUrl
            const response = await axios.post(url, file ,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetAnalysisGithubCode = async (file: IAnalyzeGithubBody) => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + AnalysisGithubUrl
            const response = await axios.post(url, file ,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetAnalysisHistory = async () => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + AnalysisHistoryURl
            const response = await axios.get(url, 
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetAnalysisHistoryById = async (id : string) => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + AnalysisHistoryIDURl +`${id}`
            const response = await axios.get(url, 
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Verify OTP failed" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetTimeline = async (opt : string) => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + TimelineURL +`?groupBy=${opt}`
            const response = await axios.get(url, 
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "Timeline not get" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}

export const GetMyPattern = async () => {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + MyPatterenURL
            const response = await axios.get(url, 
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "My Pattern not get" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const GetRecommendation = async ()=> {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + RecommendationURL
            const response = await axios.get(url, 
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "My Pattern not get" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const forgotPasswordAPI = async (data : object)=> {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

       
        // console.log("token : ",token);
        
            let url = API_BASE_URL + forgotPassword
            const response = await axios.post(url, 
                {data:  data}
            );
            // console.log("responce : ",response);

            return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "My Pattern not get" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}
export const UpdateUserDataAPI = async (data : object)=> {
    try {
        // console.log("api call ",API_BASE_URL + GetUserData );

        const token = getToken();
        // console.log("token : ",token);
        if (token) {
            let url = API_BASE_URL + UserDataUpdate
            const response = await axios.post(url, 
                {data:  data},
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            // console.log("responce : ",response);

            return response.data;
        }
        return console.error("token not found.......");
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Verify OTP API error:", error.response?.data || error.message);
            return { success: false, message: error.response?.data?.message || "My Pattern not get" };
        }
        return { success: false, message: "An unexpected error occurred" };
    }
}


export const UploadProfilePhoto = async (file: File) => {
  try {
    const token = getToken();
    if (!token) return console.error("token not found");

    const formData = new FormData();
    formData.append("profilePhoto", file); // must match upload.single("profilePhoto")

    const url = API_BASE_URL + UpdatePhoto;
    const response = await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { success: false, message: error.response?.data?.message || "Upload failed" };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};





// export const RunCodeApi = async(data : object)=>{
//     let url = CodeRunApiUrl;
//      try {
//         const response = await axios.post(url, data);

//             return response;         
//         }
//      catch (error) {
//         if(axios.isAxiosError(error)){
//             console.error("Verify OTP API error:", error.response?.data || error.message);
//             return{ success: false, message: error.response?.data?.message || "Verify OTP failed" };  
//         }
//         return { success: false, message: "An unexpected error occurred" };
//     }

// },









