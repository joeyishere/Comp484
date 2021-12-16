import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../styles/landing.module.css';
import MovieCard from '../Card/MovieCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { useAuth, db } from '../../firebase';
import { doc, getDoc } from "firebase/firestore"; 

export default function Favorties() {
    // calls the useAuth hook and sets the state to the user
    const currentUser = useAuth();
    // sets the state of the movies to an empty array
    const [favorites, setFavorites] = useState(null);
    // sets the state of the loading to true
    const [loading, setLoading] = useState(true);
    // sets the state of the error to false
    const [name, setName] = useState('');
    
    useEffect(() => {
        // fetches the favorites from the database
        const fetchFav = async () => {
            // gets the favorites from the database if user is logged in
            if (currentUser) {
                const favoritesRef = doc(db, "users", currentUser.uid);
                console.log(favoritesRef);
                const docSnap = await getDoc(favoritesRef);
                console.log(docSnap);
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    if(docSnap.data().favorites !== undefined)
                        setFavorites(docSnap.data().favorites);
                    setName(docSnap.data().name);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
        }
        // runs the fetchFav function
        fetchFav();
        // sets the state of the error to false
        setLoading(false);
    }, [currentUser]);

    // removes a movie from the favorites
    const handleRemove = (movie) => {
        // saves current favorites to a variable
        const newFav = { ...favorites };
        // deletes the movie from the favorites variable
        delete newFav[movie];
        // sets the state of the favorites to the updates favorites
        setFavorites(newFav);
    }
    // if the user is logged in and the page is not loading and the favorites are not null we render this to page
    if(currentUser && !loading && favorites !== null) {
        return (
            <Container style={{marginTop: '90px'}} maxWidth="lg">
                {/* check if the favorites object length from data base is greater than 0 meaning they have movies saved */}
                {Object.keys(favorites).length > 0 ? 
                    <Typography variant="h3" component="h3" style={{marginBottom: '30px'}} align="center" gutterBottom>
                        Hi {name}, here are your favorite movies and tv shows.
                    </Typography>
                    // if the user has no favorites then we render this
                    :
                    <Typography variant="h3" component="h3" style={{marginBottom: '30px'}} align="center" gutterBottom>
                        Hi {name}, you have no favorite movies or tv shows, add some.
                    </Typography>
                }
                {/* renders the favorites object from the database into movie cards in grid format*/}
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
    // if the user is logged in and the page is not loading and the user has no favorites we render this to page
    else if(currentUser && !loading && favorites === null) {
        return (
            <Container style={{marginTop: '90px'}} maxWidth="lg">
                <Typography variant="h3" component="h3" style={{marginBottom: '30px'}} align="center" gutterBottom>
                    Hi {name}, you have no favorite movies or tv shows, add some.
                </Typography>
            </Container>
        )
    }
    // if the user is not logged in we render this to page
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
    // if the page is loading we render this to page
    if(loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="warning" size={60} />
            </Box>
        )
    }
}
