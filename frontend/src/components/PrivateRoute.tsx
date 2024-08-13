import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus.tsx";
import Spinner from "./Spinner.tsx";

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus();

    if(checkingStatus) return <Spinner />
    return loggedIn ? <Outlet /> : <Navigate to = '/login' />
}

export default PrivateRoute;