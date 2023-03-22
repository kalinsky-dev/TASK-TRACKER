import PropTypes from 'prop-types'
import Button from './Button'
import { Link } from 'react-router-dom'


const Header = ({ title }) => {

  const onClickBtn = (e) => {
    console.log(e);
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      {/* <Link to="/">
        <Button color='steelblue' text='Sort' onClickBtn={onClickBtn} />
      </Link>
      <Link to="/create-task">
        <Button color='steelblue' text='Add' />
      </Link> */}
      <Link to="/login">
        <Button color='steelblue' text='Login' />
      </Link>
      <Link to="/register">
        <Button color='steelblue' text='Register' />
      </Link>
      {/* <Link to="/">
        <Button color='steelblue' text='Logout' />
      </Link> */}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header