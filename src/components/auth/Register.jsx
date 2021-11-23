import React, {useRef, useState} from 'react';
import { Container, List, ListItem, Input, Button } from '@mui/material';
import {signUp, useAuth } from '../../firebase';

export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const NameRef = useRef();
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    async function handleSignUp() {
        setLoading(true);
        try{
            await signUp(emailRef.current.value, passwordRef.current.value);
        } catch(error){
            alert(error.message);
        }
        setLoading(false);
    }

    if(loading){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Loading...</h1>
            </Container>
        )
    }

    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <p>Welcome {currentUser?.email}, you have signed up.</p>
                <Button variant="outlined" color="warning" href="/favorites" style={{marginRight: '15px'}}>Go to Favorites</Button>
                <Button variant="outlined" color="warning" href="/">Go to Home Page</Button>
            </Container>
        )
    }

    if(!currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Register</h1>
                <List>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input type="text" placeholder="Name" inputRef={NameRef} color="warning" style={{width: '40%'}} />
                    </ListItem>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input type="email" placeholder="Email" inputRef={emailRef} color="warning" style={{width: '40%'}} />
                    </ListItem>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input type="password" placeholder="Password" inputRef={passwordRef} color="warning" style={{width: '40%'}} />
                    </ListItem>
                </List>
                <Button onClick={handleSignUp} variant="outlined" color="warning" style={{marginLeft: '15px', marginTop: '10px'}}>Register</Button>
            </Container>
        )
    }
}
