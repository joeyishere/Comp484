import React from 'react'
import { Container, Typography, Button, Grid} from '@mui/material';
import { useAuth } from '../../firebase';
import styles from '../styles/landing.module.css';
import MovieCard from '../Card/MovieCard';

export default function Favorties() {
    const currentUser = useAuth();

    if(currentUser){
        return (
            <Container style={{marginTop: '90px'}} maxWidth="lg">
                <Typography variant="h4" component="h4" style={{marginBottom: '25px'}} align="center" gutterBottom>
                    Hi {currentUser?.displayName}, here are your favorite movies and tv shows.
                </Typography>
                {/* hard coding favorite cards for testing */}
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4} md={4} >
                        <MovieCard />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <MovieCard />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <MovieCard />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <MovieCard />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <MovieCard />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <MovieCard />
                    </Grid>
                </Grid>
            </Container>
        )
    }

    if(!currentUser){
        return (
            <Container style={{marginTop: '90px'}} maxWidth="lg">
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
