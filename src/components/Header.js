import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext';
import { TaskContext } from "../contexts/TaskContext";

import Button from './Button'

const Header = ({ title }) => {
  const { user } = useContext(AuthContext);
  const { tasks, sortTaskHandler } = useContext(TaskContext);

  const location = useLocation();

  const onSortHandler = () => {

    // console.log(tasks);
    let sortedData = [];

    let sortedTasks = tasks.sort((a, b) => {
      if (a.hoursOfWork === Number(0)) {
        return 1;
      };
      if (b.hoursOfWork === Number(0)) {
        return -1;
      };
      return a.hoursOfWork - b.hoursOfWork;
    });
    // Return different ref form the tasks array
    sortedData = sortedTasks.slice();

    if (sortedData.length > 1) {
      sortTaskHandler(sortedData);
    }
    console.log(sortedTasks);
  }

  return (
    <>
      <header className='header'>
        <h1>{title}</h1>
        {user.email ?
          ((location.pathname === '/tasks') &&
            <div>
              {(tasks.length > 1) &&
                <Button color='steelblue' text='Sort' onClickBtn={onSortHandler} />
              }
              <Link to="/create-task">
                <Button color='steelblue' text='Add' />
              </Link>
              <Link to="/logout">
                <Button color='steelblue' text='Logout' />
              </Link>
            </div>) :
          ((location.pathname !== '/login' && location.pathname !== '/register') &&
            <div>
              < Link to="/login">
                <Button color='steelblue' text='Login' />
              </Link>

              <Link to="/register">
                <Button color='steelblue' text='Register' />
              </Link>
            </div>)
        }
      </header >
      {user.email && <h4>Welcome: {user.email}</h4>}
    </>

  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header