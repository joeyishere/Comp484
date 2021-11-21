import React, {useState} from 'react';
import { Container, Link } from '@mui/material';
import styles from '../styles/landing.module.css';
import { logout, useAuth } from '../../firebase'

export default function Landing() {
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    async function handleLogout() {
        setLoading(true);
        try{
            await logout();
        } catch(error){
            alert(error.message);
        }
        setLoading(false);
    }
    if(loading) return <div>Loading...</div>

    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
            <p>Welcome {currentUser.email}</p>
            <button onClick={handleLogout}>Logout</button>
            </Container>
        )
    }

    if(!currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Landing Page</h1>
                <Link color="textPrimary" variant="button"underline="none" href="/login" className={styles.link}>Login</Link>
                <Link color="textPrimary" variant="button"underline="none" href="/register" className={styles.link}>Signup</Link>
            </Container>
        )
    }
}
