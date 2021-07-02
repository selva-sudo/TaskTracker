import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'


const Header = ({ title, onAdd, isAdd }) => {
    const location = useLocation()

    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button
                text={isAdd ? 'Close' : 'Add'}
                backgroundColor={isAdd ? 'grey' : 'steelblue'}
                onClick={onAdd}
            />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

// const headingStyle = {
//     color: 'grey',
//     backgroundColor: 'brown'
// }

export default Header
