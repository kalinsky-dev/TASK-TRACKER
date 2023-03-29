import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";


const About = () => {
  const { user } = useContext(AuthContext);

  if (user.email) {
    return (
      <div>
        <h4>Version 1.0.0</h4>
        <Link to="/tasks">Go Back</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h4>Version 1.0.0</h4>
        <Link to="/">Go Back</Link>
      </div>
    );
  }
};

export default About;
