import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { AuthContext } from '../contexts/AuthContext';
import * as authService from '../services/authService'

const Login = () => {
  const { userLoginHandler } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (
      formValues.email &&
      formValues.password &&
      !error.email &&
      !error.password
    ) {
      setIsFormValid(true);
    } else setIsFormValid(false);
  }, [setIsFormValid, formValues, error]);

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const validateEmail = (e) => {
    const email = e.target.value;
    let errorMessage = '';
    // console.log(email);
    if (email.length === 0) {
      errorMessage = 'Please write a valid email.'
    } else {
      const emailRegex = /^[a-z]+@{1}[a-z]+\.{1}[a-z]{2,3}$/i;
      const isEmailValid = emailRegex.test(email);
      if (!isEmailValid) {
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


  const onSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      authService.login(formValues)
        .then(authData => {
          if (authData.code === 403) {
            navigate('/auth-error')
          } else {
            // console.log(authData);
            userLoginHandler(authData);
            navigate('/tasks');
          }
        })
        .catch(() => {
          navigate('/404')
        });
    } else {
      if (formValues.email === '') {
        const errorMessage = 'Please write a valid email.';
        setError(state => ({
          ...state,
          email: errorMessage,
        }));
      };
      if (formValues.password === '') {
        const errorMessage = 'Please write a valid password.';
        setError(state => ({
          ...state,
          password: errorMessage,
        }));
      };
      return;
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
        <input type="password" placeholder="Add Password" name="password"
          value={formValues.password}
          onChange={onChangeHandler}
          onBlur={validatePass}
        />
        {error.password &&
          <div style={{ color: 'red' }}>{error.password}</div>
        }
      </div>
      <input type="submit" className="btn" value="Log In" />
      <span>If you don't have a profile, click <Link to="/register">here.</Link></span>
    </form>
  );
};

export default Login;
