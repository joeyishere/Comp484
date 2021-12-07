import React, { useState, useEffect } from 'react'
import { Container, Typography, Button, Grid } from '@mui/material';
import styles from '../styles/landing.module.css';
import MovieCard from '../Card/MovieCard';

import { useAuth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore"; 

export default function Favorties() {
    const currentUser = useAuth();
    const [favorites, setFavorites] = useState({});
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');

    useEffect(() => {
        if (currentUser) {
            const fetchFav = async () => {
                const favoritesRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(favoritesRef);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    setFavorites(docSnap.data().favorites);
                    setName(docSnap.data().name);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            fetchFav();
        }
        setLoading(false);
    }, [currentUser || Object.keys(favorites).length]);

    const handleRemove = (movie) => {
        const newFav = { ...favorites };
        delete newFav[movie];
        setFavorites(newFav);
    }

    if(currentUser && !loading) {
        return (
            <Container style={{marginTop: '90px'}} maxWidth="lg">
                {Object.keys(favorites).length > 0 ? 
                    <Typography variant="h3" component="h3" style={{marginBottom: '30px'}} align="center" gutterBottom>
                        Hi {name}, here are your favorite movies and tv shows.
                    </Typography>
                    :
                    <Typography variant="h3" component="h3" style={{marginBottom: '30px'}} align="center" gutterBottom>
                        Hi {name}, you have no favorite movies or tv shows, add some.
                    </Typography>
                }
                
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Object.keys(favorites).map(key =>
                        <Grid key={key} item xs={2} sm={4} md={4}>
                            <MovieCard favPage={true} updateState={handleRemove} title={favorites[key].title} img={favorites[key].img} year={favorites[key].year} rating={favorites[key].rating} />
                        </Grid>
                    )}
                </Grid>
            </Container>
        )
    }

    if(!currentUser && !loading) {
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

    if(loading) {
        return (
            <Container style={{marginTop: '90px'}} maxWidth="lg">
                <div style={{textAlign: 'center'}}>
                    <Typography variant="h4" component="h4" gutterBottom>
                        Loading...
                    </Typography>
                </div>
            </Container>
        )
    }
}
