import React from 'react'
import { Container, Typography, Button} from '@mui/material';
import { useAuth } from '../../firebase';
import styles from '../styles/landing.module.css';

export default function Favorties() {
    const currentUser = useAuth();

    if(currentUser){
        return (
            <Container style={{marginTop: '10vh'}} maxWidth="lg">
                <Typography variant="h3" component="h3" gutterBottom>
                    Favorites page
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Hi {currentUser?.displayName} start saving your favorite Movies!
                </Typography>
            </Container>
        )
    }

    if(!currentUser){
        return (
            <Container style={{marginTop: '10vh'}} maxWidth="lg">
                <div style={{textAlign: 'center'}}>
                    <Typography variant="h4" component="h4" gutterBottom>
                        You need to login to see your favorite movies and or tv shows.
                    </Typography>
                    <div className={styles.link}>
                        <Button variant="outlined" color="warning" href="/login" style={{width: '40%'}}>Login</Button>
                    </div>
                    <div className={styles.link}>
                        <Button variant="outlined" color="warning" href="/register" style={{width: '40%'}}>Signup</Button>
                    </div>
                </div>
            </Container>
        )
    }
}
