import React from 'react';
import { Card, CardContent, Typography, CardActions, CardMedia, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';


export default function MovieCard({title, img, description}) {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Test, Real title: {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Temporary text. Real description: {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="warning" size="small">Learn More</Button>
          <Button color="warning" size="small"><Favorite /></Button>
        </CardActions>
      </Card>
    )
}
