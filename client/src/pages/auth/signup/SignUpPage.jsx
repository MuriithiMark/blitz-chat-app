import React from 'react'

import "./signup-page.scss";
import SignUpForm from '../../../components/forms/signup/SignUpForm'

const SignUpPage = () => {
  return (
    <div className='auth-container signup-container'>
        <div className="form-container">
            <SignUpForm />
        </div>
    </div>
  )
}

export default SignUpPage