import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div>
      <h4>Oooops... Something went wrong....</h4>
      <h4>Sit back, relax and try again later</h4>
      <h4>:)</h4>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default NotFound;
