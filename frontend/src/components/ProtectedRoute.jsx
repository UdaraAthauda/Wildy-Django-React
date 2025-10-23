import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import LoadingSpinner from './ui/LoadingSpinner'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
    const { isAuthenticated } = useContext(AuthContext)

    if (isAuthenticated === null) {
        return (
            <LoadingSpinner />
        )
    }

  return isAuthenticated ?  children : <Navigate to='/signup' replace />
}
