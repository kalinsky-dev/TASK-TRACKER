import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title }) => {

  const onClickBtn = (e) => {
    console.log(e);
  }

  return (
    <header className='header'>
      <h1>{title}</h1>
      <Button
        color='steelblue'
        text='Sort by Time'
        onClickBtn={onClickBtn}
      />
      <Button
        color='steelblue'
        text='Add'
        onClickBtn={onClickBtn}
      />
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
