import { useState } from 'react';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');



  return (
    <form className="add-form">
      <div className="form-control">
        <label>Email:</label>
        <input type="text" placeholder="Add Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="text" placeholder="Add Password" value={password} onChange={(e) => setPass(e.target.value)} />
      </div>
      <input type="submit" className="btn" value="Log In" />
      <span>If you don't have a profile, click <a href="#">here</a></span>
    </form>
  );
};

export default Login;
