import React, {useState} from 'react'
import { Container } from '@mui/material'

export default function Explore() {
    const [movie, setMovie] = useState([])
    const [show, setShow] = useState([])

    const getMovie = async () => {
        const response = await fetch('https://yts.lt/api/v2/list_movies.json?sort_by=rating')
        const data = await response.json()
        console.log(data);
        setMovie(data.data.movies)
        setShow(data.data.tv_shows)
    }

    return (
        <Container maxWidth="lg" style={{marginTop: '8vh'}}>
            <h1>Explore</h1>
            {/* mapping through movies */}
            {/* {movie.map(movie => (
               <div>
                
                </div> 
            ))} */}
        </Container>
    )
}
