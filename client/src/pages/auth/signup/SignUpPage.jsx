import React from 'react'

import "./signup-page.scss";
import SignUpForm from '../../../components/forms/signup/SignUpForm'
import useAuthenticatedUser from '../../../hooks/useAuthenticatedUser.hook';

const SignUpPage = () => {
  useAuthenticatedUser({isAuthPage: true})

  return (
    <div className='auth-container signup-container'>
        <div className="form-container">
            <SignUpForm />
        </div>
    </div>
  )
}

export default SignUpPage