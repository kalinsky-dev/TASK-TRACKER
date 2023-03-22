import PropTypes from 'prop-types';

const Button = ({ color, text, onClickBtn }) => {


  return (
    <button style={{ backgroundColor: color }} className='btn' onClick={onClickBtn}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: 'green'
};

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
