import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { updateLogin, updateLogout } from "../api-integeration/commonSlice";
import PropTypes from 'prop-types';

interface GuestGuardProps {
    children: React.ReactNode;
}

const NonAuthGuard: React.FC<GuestGuardProps> = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check to update redux state
        const isLoggedIn = localStorage.getItem('isLoggedIn') || 'false';
        isLoggedIn ? dispatch(updateLogin()) : dispatch(updateLogout());
    },[])

    // Check for updating the render logic
    const isLoggedIn = localStorage.getItem('isLoggedIn') || 'false';

    if(isLoggedIn === 'false') {
        return <>
            {children}
        </>
    }

    return <Navigate to='/' />
}

NonAuthGuard.propTypes = {
    children: PropTypes.node,
};

export default NonAuthGuard