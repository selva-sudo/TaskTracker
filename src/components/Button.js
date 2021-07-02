
import PropTypes from 'prop-types'

const Button = ({ text, backgroundColor, onClick }) => {

    return (
        <button
            style={{ backgroundColor: backgroundColor }}
            className='btn'
            onClick= {onClick}>
            {text}
        </button>
    )
}

Button.defaultProps = {
    backgroundColor: 'steelblue'
}

Button.propTypes = {
    backgroundColor: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick:PropTypes.func,
}
export default Button
