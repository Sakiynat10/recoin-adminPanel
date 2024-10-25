import React from 'react'
import "./style.scss"

const AuthPage = () => {
  return (
    <div className='auth'>
        <img src="/auth-logo.svg" alt="auth" />
        <h2>Welcome to ReCoin Platform</h2>
        <a href='/auth/login' className='sign-in'>Sign In</a>
        <a href='/auth/register' className='sign-up'>Create an account</a>
    </div>
  )
}

export default AuthPage