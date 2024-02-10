import React from 'react';
import SignUpForm from '../component/signUpForm.js';
import { Link } from 'react-router-dom';
import '../../styles/authForms.css';

const SignUpPage = () => {
  return (
    <div className='bg'>
      <div className="container1">
        <SignUpForm />
        <Link to="/">Go back to Home</Link>
      </div>
    </div>
  );
};

export default SignUpPage;