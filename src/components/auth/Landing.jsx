import React, {useState} from 'react';
import { Container, Button, Typography } from '@mui/material';
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
    if(loading) {
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <h1>Loading...</h1>
            </Container>
        )
    }

    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
            <p>Welcome {currentUser?.email}</p>
            <Button variant="outlined" color="warning" onClick={handleLogout}>Logout</Button>
            </Container>
        )
    }

    if(!currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <center>
                    <Typography variant="h4" component="h4">Login or Sign Up to save your favorite movies and tv shows</Typography>
                    <div className={styles.link}>
                        <Button variant="outlined" color="warning" href="/login" style={{width: '40%'}}>Login</Button>
                    </div>
                    <div className={styles.link}>
                        <Button variant="outlined" color="warning" href="/register" style={{width: '40%'}}>Signup</Button>
                    </div>
                </center>
            </Container>
        )
    }
}
