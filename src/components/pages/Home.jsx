import React, {useState,useEffect} from 'react'
import styles from '../styles/home.module.css';
import { Container, Typography, Grid} from '@mui/material';
import MovieCard from '../Card/MovieCard';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button} from '@mui/material'
import { MovieSharp } from '@mui/icons-material';

export default function Home() {

    const [movies, setMovies] = useState([])
    const [shows, setShows] = useState([])
    useEffect(() =>{
        getMovie()
    },[])
    const getMovie = async () => {
        const response = await fetch('https://imdb-api.com/en/API/Top250Movies/k_5sh8gslw')
        const data = await response.json()
        console.log(data.items);
        let movies = []
        data.items.map((e, i ) => {
            if (i < 12)
                movies.push(e)
            });
        setMovies(movies)
        // setShows(data.data.tv_shows)
    }
    return (
        <Container className={styles.container} maxWidth="lg">
          <Typography variant = "h3" component = "h2" mt = {4} mb = {4}> 
            New Releases
            </Typography>
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
                </Grid>
            <Typography variant = "h3" component = "h2" mt = {4} mb = {4}> 
                Top 12 Movies
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>                    
                    { 
                     movies.map((item,i) => 
                     <Grid item xs={2} sm={4} md={4}> 
                        { i<12 ?
                        
                            < MovieCard title = {item.title} img = {item.image} year = {item.year} rating = {item.imDbRating}/>                      
                        
                       :null }
                    </Grid>)
                     }                    
                    
                </Grid>
                <Typography variant = "h3" component = "h2" mt = {4} mb = {4}> 
            Top 12 TV Shows
            </Typography>
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
                </Grid>
        </Container>
    )
}
