import { Check } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router'



function CheckLogin(type) {

    const selector = useSelector;
    const navigate = useNavigate;

    // Check if user is logged in, otherwise reroute to login
    const loggedIn = selector((state) => state.loggedIn.value);

    if (!loggedIn && type === 'redirect') {
        return navigate('/loginSignUp');
    } else if (!loggedIn && type != 'redirect') {
        // return true or false based on login status
        return false;
    } else {
        return true;
    }
}

export default CheckLogin