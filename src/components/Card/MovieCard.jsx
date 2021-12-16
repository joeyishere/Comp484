import React from 'react';
import { Card, CardContent, Typography, CardActions, CardMedia, Button } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import {useAuth, db } from '../../firebase';
import { doc, setDoc, deleteField } from "firebase/firestore"; 

export default function MovieCard({title, img, year, rating, favPage, updateState}) {
    // calls the useAuth hook and sets the state to the user
    const currentUser = useAuth();
    // handles click of movie card
    async function handleClick() {
      // if the user is logged in but not in favorites page then save to movie favorites data value in database
      if(currentUser && !favPage){
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, {
          "favorites": {
            [title]: {
              "title": title,
              "img": img,
              "year": year,
              "rating": rating ? rating : null
            }
          }
        }, { merge: true }).then(() => {
          console.log("Document successfully written!");
        }).catch((error) => {
          console.error("Error writing document: ", error);
        });
      }
      // if the user is logged in and in favorites page then delete from movie favorites data value in database
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
      //Display Image Poster 
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={title + " poster"}
          height="200"
          image = {img}
        />

        {/*Dispaly Cinema Information:  Title , Year , & Rating  */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {year}
          </Typography>
          {rating ?<Typography variant="body1" color="text.secondary">
            Rating: {rating}
          </Typography> :null}
        </CardContent>
        
        {/*Display 'Learn More' button on card */}
        <CardActions>
          <Button color="warning" size="small">Learn More</Button>
          <Button color="warning" size="small" onClick={handleClick}><Favorite /></Button>
        </CardActions>
      </Card>
    )
}
