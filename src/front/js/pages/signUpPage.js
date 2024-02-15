import React from 'react';
import SignUpForm from '../component/signUpForm.js';
import '../../styles/authForms.css';

const SignUpPage = () => {
  return (
    <div className='bg'>
      <div className="overlay2"></div>
      <div className="container1">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;