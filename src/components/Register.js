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

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log(formValues);
    if (formValues.password !== formValues.confirmPass) {
      return;
    }

    authService.register(formValues)
      .then(authData => {
        // console.log(authData);
        userLoginHandler(authData);
        navigate('/');
      }
      )
      .catch(() => {
        navigate('/404')
      })
  };

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Email:</label>
        <input type="text" placeholder="Add Email" name="email" value={formValues.email} onChange={onChangeHandler} />
        <label>Password:</label>
        <input type="text" placeholder="Add Password" name="password" value={formValues.password} onChange={onChangeHandler} />
        <label>Confirm Password:</label>
        <input type="text" placeholder="Confirm Password" name="confirmPass" value={formValues.confirmPass} onChange={onChangeHandler} />
      </div>
      <input type="submit" className="btn" value="Register" />
      <span>If you already have a profile, click <Link to="/login">here.</Link></span>
    </form>
  );
};

export default Register;
