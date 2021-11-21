import React, {useState, useRef} from 'react';
import { Container, Link } from '@mui/material';
import { login, useAuth } from '../../firebase';

import styles from '../styles/landing.module.css';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    if(loading) {
        return <div>Loading...</div>
    }

    if(!currentUser) {
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Login Page</h1>
                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <button onClick={handleLogin}>Sign In</button>
            </Container>
        )
    }
    if(currentUser) {
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Login Page</h1>
                <p>You are already logged in.</p>
                <Link color="textPrimary" variant="button"underline="none" href="/favorites" className={styles.link}>Go to Favorites</Link>
                <Link color="textPrimary" variant="button"underline="none" href="/" className={styles.link}>Go to Home Page</Link>
            </Container>
        )
    }
}
