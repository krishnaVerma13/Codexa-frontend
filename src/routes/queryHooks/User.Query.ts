import { useQuery } from "@tanstack/react-query";
import type { User } from "../../interface/auth.type";
import { GetAnalysisHistory, GetCurrentUser, GetMyPattern, GetRecommendation } from "../../services/NwConfig";
import type { APIResponce } from "../../components/dashboard/constant";

export const useUser = () => {
    const token = localStorage.getItem('token')

    return useQuery<User>({
        queryKey: ['userData'],
        queryFn: GetCurrentUser,
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        enabled: !!token, // Only run if token exists
    });

}
export const useAnalysisHistory = () => {
    return useQuery<any>({
        queryKey: ["analysisHistory"],
        queryFn: GetAnalysisHistory,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    });
}

export const useMyPatterns = () => {
    return useQuery<APIResponce>({
        queryKey: ["myPatterns"],
        queryFn: GetMyPattern,
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

}

export const useRecommendation = () => {
    return useQuery<APIResponce>({
        queryKey: ["recommendations"],
        queryFn: GetRecommendation,
        staleTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
    })
}