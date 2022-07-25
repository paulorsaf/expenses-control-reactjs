import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import AuthService from '../../services/AuthService';
import './HomePage.css';

type HomePageProps = {
    authService: AuthService;
}

function HomePage(props: HomePageProps) {

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        setIsLoggingOut(true);
        props.authService.logout().then(() => {
            setIsLoggingOut(false);
            navigate('/');
        })
    }

    return (
        <>
            <header>
                <button className='clear' onClick={logout}>Sair</button>
            </header>
            {  isLoggingOut && <Loading /> }
        </>
    );
}

export default HomePage;