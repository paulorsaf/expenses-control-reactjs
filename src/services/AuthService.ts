import * as firebaseAuth from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export default class AuthService {
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
}