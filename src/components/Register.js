import { useState } from 'react';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [confirmPass, setConfPass] = useState('');



  return (
    <form className="add-form">
      <div className="form-control">
        <label>Email:</label>
        <input type="text" placeholder="Add Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="text" placeholder="Add Password" value={password} onChange={(e) => setPass(e.target.value)} />
        <label>Confirm Password:</label>
        <input type="text" placeholder="Confirm Password" value={confirmPass} onChange={(e) => setConfPass(e.target.value)} />
      </div>
      <input type="submit" className="btn" value="Register" />
      <span>If you already have profile click <a href="#">here</a></span>
    </form>
  );
};

export default Register;
