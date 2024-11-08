import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { updateLogin, updateLogout } from "../api-integeration/commonSlice";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

interface GuestGuardProps {
    children: React.ReactNode
}

const AuthGuard: React.FC<GuestGuardProps> = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') || 'false';
        isLoggedIn ? dispatch(updateLogin()) : dispatch(updateLogout());
    },[]);

    const isLoggedIn = localStorage.getItem('isLoggedIn') || 'false';
    if(isLoggedIn) {
        return <>{children}</>
    }

    return <Navigate to='/auth' />;
}

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default AuthGuard;