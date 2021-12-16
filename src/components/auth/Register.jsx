import React, {useRef, useState} from 'react';
import { Container, List, ListItem, Input, Button } from '@mui/material';
import {signUp, useAuth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Register() {
    // reference to email input
    const emailRef = useRef();
    // reference to password input
    const passwordRef = useRef();
    // sets state of users name from input
    const [name, setName] = useState('');
    // sets state of loading circle
    const [loading, setLoading] = useState(false);
    // stores current user
    const currentUser = useAuth();
    // stores navigate function for redirect
    let navigate = useNavigate();
    
    // handles signup
    async function handleSignUp() {
        // sets loading to true
        setLoading(true);
        // wait for user to enter information and signup
        try{
            await signUp(emailRef.current.value, passwordRef.current.value).then((user) => {
                // sets a document in the users collection with the user's email and name then redirects to home
                setDoc(doc(db, "users", user.user.uid), {
                    name: name,
                    email: user.user.email,
                    uid: user.user.uid
                }).then(() => {
                    navigate("/");
                });
            });
        } catch(error){
            alert(error.message);
        }
        // sets loading state to false
        setLoading(false);
    }

    // displays loading circle if the page is loading
    if(loading){
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="warning" size={60} />
            </Box>
        )
    }
    // if the user is logged in and not redirected to home, render this
    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <p>Welcome {name}, you have signed up.</p>
            </Container>
        )
    }
    // if the user is not logged in, render this to prompt them to signup or login
    if(!currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <h1>Register</h1>
                <List>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input required type="text" placeholder="Name" onChange={(e) => {setName(e.target.value)}} color="warning" style={{width: '40%'}} />
                    </ListItem>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input required type="email" placeholder="Email" inputRef={emailRef} color="warning" style={{width: '40%'}} />
                    </ListItem>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input required type="password" placeholder="Password" inputRef={passwordRef} color="warning" style={{width: '40%'}} />
                    </ListItem>
                </List>
                <Button onClick={handleSignUp} variant="outlined" color="warning" style={{marginLeft: '15px', marginTop: '10px'}}>Register</Button>
            </Container>
        )
    }
}
