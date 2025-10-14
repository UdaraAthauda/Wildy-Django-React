import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import api from '@/api'

export default function GoogleLoginButton() {
    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credentialResponse

        try {
            const res = await api.post('auth/google/', {
                access_token: token,
            })
            console.log("backend res", res.data)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <GoogleLogin onSuccess={handleSuccess} />
  )
}
