import { Link } from "react-router-dom";


const AuthError = () => {
  return (
    <div>
      <h4>Some of the fields are with incorrect or incomplete data.</h4>
      <h4>Please try again!</h4>
      <Link to="/register">Go Back</Link>
    </div>
  );
};

export default AuthError;
