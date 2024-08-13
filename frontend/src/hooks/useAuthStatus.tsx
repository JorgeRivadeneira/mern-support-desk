import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn]  = useState<boolean>(false);
    const [checkingStatus, setCheckingStatus]  = useState<boolean>(true);

    const {user} = useSelector((state: any) => state.auth);

    useEffect(() => {
        if(user){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
        setCheckingStatus(false);
    }, [user]);

    return {loggedIn, checkingStatus}

}
