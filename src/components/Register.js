import { useState, useContext, useEffect } from 'react';
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
  });

  const [formError, setFormError] = useState({
    email: '',
    password: '',
    confirmPass: '',
  });

  const [serverError, setServerError] = useState({
    message: '',
  })

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      formValues.email &&
      formValues.password &&
      formValues.confirmPass &&
      !formError.email &&
      !formError.password &&
      !formError.confirmPass
    ) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [formValues, formError]);


  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  };

  const validateEmail = (e) => {
    const email = e.target.value;
    let errorMessage = '';
    if (email.length === 0) {
      errorMessage = 'Please write a valid email.'
    } else {
      const emailRegex = /^[a-z]+@{1}[a-z]+\.{1}[a-z]{2,3}$/i;
      const isEmailValid = emailRegex.test(email);
      if (!isEmailValid) {
        errorMessage = 'The email should be in the following format (mailboxname @ domainname.domainextension)';
      }
    }

    setFormError(state => ({
      ...state,
      email: errorMessage,
    }));
  };

  const validatePass = (e) => {
    const password = e.target.value;
    let errorMessage = '';
    if (password.length === 0) {
      errorMessage = 'Please write a valid password.'
    } else if (password.length < 4) {
      errorMessage = 'Password must be longer than 4 characters!'
    } else if (password.length > 10) {
      errorMessage = 'Password must be shorter than 10 characters!'
    }

    setFormError(state => ({
      ...state,
      password: errorMessage,
    }));
  };

  const validateConfirmPass = (e) => {
    const confirmPass = e.target.value;
    let errorMessage = '';
    if (confirmPass.length < 4) {
      errorMessage = 'Password must be longer than 4 characters!'
    } else if (confirmPass.length > 10) {
      errorMessage = 'Password must be shorter than 10 characters!'
    } else if (confirmPass !== formValues.password) {
      errorMessage = 'Passwords must match!'
    }

    setFormError(state => ({
      ...state,
      confirmPass: errorMessage,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      authService.register(formValues)
        .then(authData => {
          userLoginHandler(authData);
          navigate('/tasks');
        })
        .catch((error) => {
          setServerError(state => ({ ...state, message: error.message }));
        });
    } else {
      if (formValues.email === '') {
        const errorMessage = 'Please write a valid email.';
        setFormError(state => ({
          ...state,
          email: errorMessage,
        }));
      };
      if (formValues.password === '') {
        const errorMessage = 'Please write a valid password.';
        setFormError(state => ({
          ...state,
          password: errorMessage,
        }));
      };
      if (formValues.confirmPass === '') {
        const errorMessage = 'Please write a valid password.';
        setFormError(state => ({
          ...state,
          confirmPass: errorMessage,
        }));
      };
      return;
    }
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <h2>Please Register in the System.</h2>
      <div className="form-control">
        <label>Email:</label>
        <input type="text" placeholder="Add Email" name="email"
          value={formValues.email}
          onChange={onChangeHandler}
          onBlur={validateEmail}
        />
        {formError.email &&
          <div style={{ color: 'red' }}>{formError.email}</div>
        }
        <label>Password:</label>
        <input type="password" placeholder="Add Password" name="password"
          value={formValues.password}
          onChange={onChangeHandler}
          onBlur={validatePass}
        />
        {formError.password &&
          <div style={{ color: 'red' }}>{formError.password}</div>
        }
        <label>Confirm Password:</label>
        <input type="password" placeholder="Confirm Password" name="confirmPass"
          value={formValues.confirmPass}
          onChange={onChangeHandler}
          onBlur={validateConfirmPass}
        />
        {formError.confirmPass &&
          <div style={{ color: 'red' }}>{formError.confirmPass}</div>
        }
        {serverError.message &&
          <div style={{ color: 'red' }}>{serverError.message}</div>
        }
      </div>
      <input type="submit" className="btn" value="Register" />
      <span>If you already have a profile, click <Link to="/login">here.</Link></span>
    </form>
  );
};

export default Register;
