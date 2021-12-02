import React from 'react';
import { Card, CardContent, Typography, CardActions, CardMedia, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';


export default function MovieCard({title, img, year,rating}) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image = {img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {year}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Rating: {rating}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="warning" size="small">Learn More</Button>
          <Button color="warning" size="small"><Favorite /></Button>
        </CardActions>
      </Card>
    )
}
