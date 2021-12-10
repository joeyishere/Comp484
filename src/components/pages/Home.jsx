import React, {useState,useEffect} from 'react'
import styles from '../styles/home.module.css';
import { Container, Typography, Grid} from '@mui/material';
import MovieCard from '../Card/MovieCard';
import Carousel from 'react-material-ui-carousel'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Home() {

    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const[release,setRelease] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setLoading(true);
        getMovie();
        getRelease();
        getShows();
    },[])

    const getMovie = async () => {
        const response = await fetch('https://imdb-api.com/en/API/Top250Movies/k_08wbrj9b');
        const data = await response.json();
        console.log(data.items);
        let topTenMovies = [];

        data.items.forEach((e, i ) => {
            if (i < 12 && e !== undefined)
                topTenMovies.push(e);
        });
        setMovies(topTenMovies);
    }
    const getRelease = async () => {
        const response = await fetch('https://imdb-api.com/en/API/InTheaters/k_08wbrj9b');
        const data = await response.json();
        console.log(data.items);
        let newReleases = [];

         data.items.forEach((e, i ) => {
            if (i < 12 && e !== undefined)
                newReleases.push(e);
        });
        setRelease(newReleases);
    }
    const getShows = async () => {
        const response = await fetch('https://imdb-api.com/en/API/Top250TVs/k_08wbrj9b');
        const data = await response.json();
        console.log(data.items);
        let topTenShows = [];

        data.items.forEach((e, i ) => {
            if (i < 12 && e !== undefined)
                topTenShows.push(e);
        });
        setShows(topTenShows);
        setLoading(false);
    }
    if(loading){
        return(
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="warning" size={60} />
            </Box>
        )
    }
    else {
        return (
            <Container className={styles.container} maxWidth="lg">
                <Typography variant = "h3" component = "h2" mt = {4} mb = {4}> 
                    New Releases
                </Typography>
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
