import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AuthLayout({ children, authentication = true }) {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    // const authStatus = useSelector(state => state.auth.status);
    const authStatus = true; // Mock authentication status for testing

    // Add a log to confirm component rendering
    console.log("AuthLayout component rendering");

    useEffect(() => {
        // Confirm useEffect execution
        console.log("useEffect executed");

        // Print initial states
        // console.log("Auth status: ", authStatus);
        console.log("Authentication required: ", authentication);

        // Navigation logic
        if (authentication && authStatus !== authentication) {
            console.log("Navigating to /login");
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            console.log("Navigating to /");
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}
