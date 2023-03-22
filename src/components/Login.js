import { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPass] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const onChangeHandler = (e) => {
    setFormValues(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
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
      <span>If you don't have a profile, click <Link to="/Register">here.</Link></span>
    </form>
  );
};

export default Login;
