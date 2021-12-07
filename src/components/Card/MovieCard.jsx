import React from 'react';
import { Card, CardContent, Typography, CardActions, CardMedia, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import {useAuth, db } from '../../firebase';
import { doc, setDoc, deleteField } from "firebase/firestore"; 

export default function MovieCard({title, img, year, rating, favPage, updateState}) {
    const currentUser = useAuth();

    async function handleClick() {
      if(currentUser && !favPage){
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, {
          "favorites": {
            [title]: {
              "title": title,
              "img": img,
              "year": year,
              "rating": rating
            }
          }
        }, { merge: true }).then(() => {
          console.log("Document successfully written!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }

      if(currentUser && favPage){
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, {
          "favorites": {
            [title]: deleteField()
          }
        }, { merge: true }).then(() => {
          updateState(title);
          console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
      else if(!currentUser) {
        alert('Please login to add to favorites');
      }
    }

    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={title + " poster"}
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
          <Button color="warning" size="small" onClick={handleClick}><Favorite /></Button>
        </CardActions>
      </Card>
    )
}
