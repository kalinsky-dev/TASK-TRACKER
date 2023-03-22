import { Link } from "react-router-dom";


const ServerError = () => {
  return (
    <div>
      <h4>Something goes wrong...</h4>
      <h4>Please try again!</h4>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default ServerError;
