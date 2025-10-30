import api from "@/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setAuthenticated] = useState(null)
    const navigate = useNavigate()

    // Decode and verify token validity
    const isTokenExpired = (token) => {
        try {
            const {exp} = jwtDecode(token)
            return exp < Date.now() / 1000
        } catch (error) {
            return true
        }
    }

    // Refresh access token
    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN)

        if (!refresh) {
            setAuthenticated(false)
            return
        }

        try {
            const res = await api.post('auth/token/refresh/', { refresh })
            localStorage.setItem(ACCESS_TOKEN, res.data.access)
            setAuthenticated(true)
        } catch (error) {
            console.error('Token refresh error: ', error)
            localStorage.clear()
            setAuthenticated(false)
            navigate('/logout')
        }
    }

    // Authentication check
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token || isTokenExpired(token)) {
            await refreshToken()
        } else {
            setAuthenticated(true)
        }
    }

    useEffect(() => {
        auth().catch(() => setAuthenticated(false))
    }, [])

    // Memorize values
    const contextValue = useMemo(() => ({
        isAuthenticated,
        setAuthenticated,
        auth,
    }), [isAuthenticated])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}