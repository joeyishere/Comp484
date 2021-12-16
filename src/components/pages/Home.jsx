import React, {useState,useEffect} from 'react'
import styles from '../styles/home.module.css';
import { Container, Typography, Grid} from '@mui/material';
import MovieCard from '../Card/MovieCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Home() {
    
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const[release,setRelease] = useState([]);
    const [loading, setLoading] = useState(true);
    // when the page loads we fetch the movies and shows
    useEffect(() =>{
        setLoading(true);
        getMovie();
        getRelease();
        getShows();
    },[])
    
    //fetch API key for movies, load json
    
    const getMovie = async () => {
        // fetch the imdb api
        const response = await fetch('https://imdb-api.com/en/API/Top250Movies/k_08wbrj9b');
        // convert the response to json
        const data = await response.json();
        console.log(data.items);
        // declare a variable to hold the movies
        let topTenMovies = [];
        // loop through the movies and push them to the variable
        data.items.forEach((e, i ) => {
            // if the index is less than 12 push the movie to the topTenMovies array
            if (i < 12 && e !== undefined)
                topTenMovies.push(e);
        });
        // set the state of the movies to the topTenMovies array
        setMovies(topTenMovies);
    }

    //fetch API for Movies Releasing this week, load json
    const getRelease = async () => {
        // fetch the imdb api of the movies in theaters
        const response = await fetch('https://imdb-api.com/en/API/InTheaters/k_08wbrj9b');
        // convert the response to json
        const data = await response.json();
        console.log(data.items);
        // declare a variable to hold the movies
        let newReleases = [];
        // loop through the movies and push them to the variable
         data.items.forEach((e, i ) => {
            // if the index is less than 3 push the movie to the topTenMovies array
            if (i < 3 && e !== undefined)
                newReleases.push(e);
        });
        // set the state of the movies to the newReleases array
        setRelease(newReleases);
    }

    //fetch API  for top 250 TV Shows
    const getShows = async () => {
        // fetch the imdb api of the top 250 tv shows
        const response = await fetch('https://imdb-api.com/en/API/Top250TVs/k_08wbrj9b');
        // convert the response to json
        const data = await response.json();
        console.log(data.items);
        // declare a variable to hold the shows
        let topTenShows = [];
        // loop through the shows and push them to the variable
        data.items.forEach((e, i ) => {
            // if the index is less than 12 push the show to the topTenShows array
            if (i < 12 && e !== undefined)
                topTenShows.push(e);
        });
        // set the state of the shows to the topTenShows array
        setShows(topTenShows);
        // set the loading state to false
        setLoading(false);
    }

    //listen, enable loading circle icon
    if(loading){
        return(
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="warning" size={60} />
            </Box>
        )
    }

    //load complete, display main content
    else {
        return (

            // Load 3 Containers with Movie Cards
            <Container className={styles.container} maxWidth="lg">
                <Typography variant = "h3" component = "h2" mt = {4} mb = {4}> 
                    New Releases
                </Typography>
                 {/*Populate the Grid with new releases*/} 
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {release.map((item,i) => 
                        <Grid key={i} item xs={2} sm={4} md={4}> 
                            { i<3 ?
                                <MovieCard title = {item.title} img = {item.image} year = {item.year}/>
                                : null 
                            }                                   {/* new releases do not have ratings */}                           
                        </Grid>
                    )}
                </Grid>
                <Typography variant = "h3" component = "h2" mt = {4} mb = {4}> 
                    Top 12 Movies
                </Typography>
                {/*Populate the Grid with top 12 movies*/} 
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>                    
                    {movies.map((item,i) => 
                        <Grid key={i} item xs={2} sm={4} md={4}> 
                            { i<12 ?
                                <MovieCard title = {item.title} img = {item.image} year = {item.year} rating = {item.imDbRating}/>
                                : null 
                            }
                        </Grid>
                    )}
                </Grid>
                <Typography variant = "h3" component = "h2" mt = {4} mb = {4}> 
                    Top 12 TV Shows
                </Typography>
                {/*Populate the Grid with new top 12 TV shows*/} 
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {shows.map((item,i) => 
                        <Grid key={i} item xs={2} sm={4} md={4}> 
                            { i<12 ?
                                <MovieCard title = {item.title} img = {item.image} year = {item.year} rating = {item.imDbRating}/>
                                : null 
                            }
                        </Grid>
                    )}
                </Grid>
            </Container>
        )
    }
}
