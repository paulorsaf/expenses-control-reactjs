import * as firebaseAuth from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default class AuthService {

    getLoggedUser() {
        return new Promise(resolve => {
            firebaseAuth.onAuthStateChanged(auth, (user: any) => {
                console.log(user);
                resolve(user);
            })
        })
    }

    login(email: string, password: string) {
        return firebaseAuth.signInWithEmailAndPassword(
            auth, email, password
        )
        .then(user => {
            console.log(user);
            return user;
        })
        .catch(error => {
            console.log('error', error);
            return Promise.reject(error);
        });
    }

    logout() {
        return firebaseAuth.signOut(auth);
    }
    
    recoverPassword(email: string) {
        return firebaseAuth.sendPasswordResetEmail(auth, email);
    }
}