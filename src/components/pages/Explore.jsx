//All of the libraries needed to run the page. 
import React, {useEffect, useState} from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Container, Grid } from '@mui/material'
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

//Adding a search icon (image) in the search bar. 
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

//Styling on the search bar for entering the search term. 
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


//Function for running the Explore page.
export default function Explore() {
    //Variables to hold the movies, search term, and default search term. 
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState();
    const [query, setQuery] = useState('spiderman')
    //Use effect 
    useEffect(() =>{
      fetchSearch();

  },[query])
    //Once the setQuery variable is updated we place that in query for the API to fetch the search results.
    //The data gets pulled from the imdb API and displated into the setMovies const. This will be displayed in our grid.
    const fetchSearch = async () =>{
      const response = await fetch('https://imdb-api.com/API/Search/k_f1trk5ey/' + query)
      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    }
    //Once the user hits enter we place the searchTerm into setQuery. 
    const handleOnSubmit = (e) => {
      e.preventDefault();
      setQuery(searchTerm);
      
    }
    //This function takes in the user input and places it into searchTerm.
    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
    }

    //What is being displayed onto the explore page. 
    return (
        //Setting up a container for the entire page.
        <Container maxWidth="lg" style={{marginTop: '10vh'}}>
          <h1>Explore</h1>
          {/*form to take in the user data on the search bar. */}
          <form onSubmit={handleOnSubmit} style={{width: '98.5%'}}>
            {/* Here is the styled search bar from material-ui */}
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
          {/* Grid to display all of the movie results provided in setMovies. */}
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}  style={{marginTop: '40px'}}>                    
              {movies.map((item,i) => 
                  <Grid key={i} item xs={2} sm={4} md={4}> 
                      <MovieCard title = {item.title} img = {item.image} year = {item.description}/>
                  </Grid>
              )}
          </Grid>

        </Container>
    )
}
