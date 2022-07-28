import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { AuthContext } from "./AuthContext";
import * as firebaseAuth from 'firebase/auth';
import { auth } from '../../FirebaseConfig';

type AuthProviderProps = {
    authService: AuthService;
    children: any;
}

export default function AuthProvider(props: AuthProviderProps) {

    const [isLoadingLoggedUser, setIsLoadingLoggedUser] = useState(true);
    const [user, setUser] = useState(null as any);
  
    useEffect(() => {
        firebaseAuth.onAuthStateChanged(auth, (user: any) => {
            setIsLoadingLoggedUser(false);
            setUser(user);
        })
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoadingLoggedUser, user, authService: props.authService
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}