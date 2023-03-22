import { Link } from "react-router-dom";


const Error = () => {
  return (
    <div>
      <h4>Your email or password is wrong...</h4>
      <h4>Please try again!</h4>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default Error;
