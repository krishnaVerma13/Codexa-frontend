import { useQuery } from "@tanstack/react-query";
import type { User } from "../../interface/auth.type";
import { GetCurrentUser } from "../../services/NwConfig";

export const useUser = ()=>{
    const token = localStorage.getItem('token')
    
    return useQuery<User>({
        queryKey:['userData'],
        queryFn: GetCurrentUser,
        staleTime:  1000 * 60 * 5, // 5 minutes cache
    });

}