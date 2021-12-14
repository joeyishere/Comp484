import React, {useEffect, useState} from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Container,Typography, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from '../Card/MovieCard';


//All code for search bar styling. 
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));





export default function Explore() {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState();
    const [query, setQuery] = useState('spiderman')

    useEffect(() =>{
      fetchSearch();

  },[query])

    const fetchSearch = async () =>{
      const response = await fetch('https://imdb-api.com/en/API/SearchMovie/k_f1trk5ey/' + query)
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    }

    const handleOnSubmit = (e) => {
      e.preventDefault();
      setQuery(searchTerm);
      
    }

    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
      console.log(e.target.value);
    }


    return (
        <Container maxWidth="lg" style={{marginTop: '10vh'}}>
            <h1>Explore</h1>
            
              <form onSubmit={handleOnSubmit}>
                <Search>
                  <SearchIconWrapper>
                      <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleOnChange}
                  />
                </Search>                
              </form>
              
              
          <h1>Movies</h1>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>                    
                    {movies.map((item,i) => 
                        <Grid key={i} item xs={2} sm={4} md={4}> 
                            <MovieCard title = {item.title} img = {item.image} year = {item.description}/>
                        </Grid>
                    )}
          </Grid>

        </Container>
    )
}
