import React from 'react'
import { Container, Typography, Link} from '@mui/material';
import { useAuth } from '../../firebase';
import styles from '../styles/landing.module.css';

export default function Favorties() {
    const currentUser = useAuth();

    if(currentUser){
        return (
            <Container style={{marginTop: '8vh'}} maxWidth="lg">
                <Typography variant="h2" component="h1" gutterBottom>
                    Favorites page
                </Typography>
            </Container>
        )
    }

    if(!currentUser){
        return (
            <Container style={{marginTop: '8vh'}} maxWidth="lg">
                <Typography variant="h2" component="h1" gutterBottom>
                    You need to login to see your favorites.
                    <Link color="textPrimary" variant="button"underline="none" href="/login" className={styles.link}>Login</Link>
                    <Link color="textPrimary" variant="button"underline="none" href="/register" className={styles.link}>Signup</Link>
                </Typography>
            </Container>
        )
    }
}
