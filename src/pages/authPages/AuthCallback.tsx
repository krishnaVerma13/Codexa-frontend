import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function AuthCallback() {
    const navigator = useNavigate();

    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        console.log("token param :", param);

        const token = param.get('token')
        // console.log("token :", token);/

        if (token) {
            localStorage.setItem('token', token)
            navigator('/dashboard')
        } else {
            // Check if token already saved in first render
            const savedToken = localStorage.getItem('token')
            if (savedToken) {
                navigator('/dashboard', { replace: true })
            } else {
                navigator('/login?error=github_failed')
            }
        }
    }, [])
    return <p>Logging you in...</p>
}