import React, {useRef, useState} from 'react';
import { Container, Link } from '@mui/material';
import {signUp, useAuth } from '../../firebase';
import styles from '../styles/landing.module.css';
export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    async function handleSignUp() {
        setLoading(true);
        try{
            await signUp(emailRef.current.value, passwordRef.current.value);
        } catch(error){
            alert(error.message);
        }
        setLoading(false);
    }

    if(loading){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Loading...</h1>
            </Container>
        )
    }

    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>You are logged in as {currentUser?.email}</h1>
                <Link color="textPrimary" variant="button"underline="none" href="/favorites" className={styles.link}>Go to Favorites</Link>
                <Link color="textPrimary" variant="button"underline="none" href="/" className={styles.link}>Go to Home Page</Link>
            </Container>
        )
    }

    if(!currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Register</h1>
                <input type="email" placeholder="Email" ref={emailRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <button onClick={handleSignUp}>Register</button>
            </Container>
        )
    }
}
