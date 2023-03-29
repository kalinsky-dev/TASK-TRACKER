import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from "../contexts/AuthContext";
import * as authService from '../services/authService'

const Register = () => {
  const { userLoginHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPass: '',
  })

  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPass: '',
  });



  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }


  const validateEmail = (e) => {
    const email = e.target.value;
    let errorMessage = '';
    console.log(email);
    if (email.length === 0) {
      errorMessage = 'Please write a valid email.'
    } else {
      let patternLiteral = /^[a-z]+@{1}[a-z]+\.{1}[a-z]{2,3}$/i;
      let pass = patternLiteral.test(email);
      if (!pass) {
        errorMessage = 'The email should be in the following format (mailboxname @ domainname.domainextension)';
      }
    }

    setError(state => ({
      ...state,
      email: errorMessage,
    }));
  };

  const validatePass = (e) => {
    const password = e.target.value;
    let errorMessage = '';
    console.log(password);
    if (password.length === 0) {
      errorMessage = 'Please write a valid password.'
    } else if (password.length < 4) {
      errorMessage = 'Password must be longer than 4 characters!'
    } else if (password.length > 10) {
      errorMessage = 'Password must be shorter than 10 characters!'
    }

    setError(state => ({
      ...state,
      password: errorMessage,
    }));
  };

  const validateConfirmPass = (e) => {
    const confirmPass = e.target.value;
    let errorMessage = '';
    // console.log(confirmPass);
    if (confirmPass.length < 4) {
      errorMessage = 'Password must be longer than 4 characters!'
    } else if (confirmPass.length > 10) {
      errorMessage = 'Password must be shorter than 10 characters!'
    } else if (confirmPass !== formValues.password) {
      // console.log(error);
      // console.log(confirmPass !== error.password);

      errorMessage = 'Passwords must match!'
    }

    setError(state => ({
      ...state,
      confirmPass: errorMessage,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log(formValues);
    let patternLiteral = /^[a-z]+@{1}[a-z]+\.{1}[a-z]{2,3}$/i;
    let pass = patternLiteral.test(formValues.email);


    if (formValues.password === ''
      || formValues.confirmPass === ''
      || formValues.password < 4
      || formValues.password > 10
      || formValues.password !== formValues.confirmPass
      || pass === false

    ) {
      navigate('/auth-error')
    } else {
      authService.register(formValues)
        .then(authData => {
          // console.log(authData);
          userLoginHandler(authData);
          navigate('/tasks');
        }
        )
        .catch(() => {
          navigate('/404')
        })
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Email:</label>
        <input type="text" placeholder="Add Email" name="email"
          value={formValues.email}
          onChange={onChangeHandler}
          onBlur={validateEmail}
        />
        {error.email &&
          <div style={{ color: 'red' }}>{error.email}</div>
        }
        <label>Password:</label>
        <input type="text" placeholder="Add Password" name="password"
          value={formValues.password}
          onChange={onChangeHandler}
          onBlur={validatePass}
        />
        {error.password &&
          <div style={{ color: 'red' }}>{error.password}</div>
        }
        <label>Confirm Password:</label>
        <input type="text" placeholder="Confirm Password" name="confirmPass"
          value={formValues.confirmPass}
          onChange={onChangeHandler}
          onBlur={validateConfirmPass}
        />
        {error.confirmPass &&
          <div style={{ color: 'red' }}>{error.confirmPass}</div>
        }
      </div>
      <input type="submit" className="btn" value="Register" />
      <span>If you already have a profile, click <Link to="/login">here.</Link></span>
    </form>
  );
};

export default Register;
