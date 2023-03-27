import { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { AuthContext } from '../contexts/AuthContext';
import * as authService from '../services/authService'

const Login = () => {
  const { userLoginHandler } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formValues);
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
      })
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Email:</label>
        <input type="text" placeholder="Add Email" name="email" value={formValues.email} onChange={onChangeHandler} />
        <label>Password:</label>
        <input type="text" placeholder="Add Password" name="password" value={formValues.password} onChange={onChangeHandler} />
      </div>
      <input type="submit" className="btn" value="Log In" />
      <span>If you don't have a profile, click <Link to="/register">here.</Link></span>
    </form>
  );
};

export default Login;
