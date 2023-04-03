import { Link } from "react-router-dom";


const NotFound = () => {
  return (
    <div>
      <h3>Oooops... Something went wrong....</h3>
      <h3>Sit back, relax and try again later</h3>
      <h3>:)</h3>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default NotFound;
