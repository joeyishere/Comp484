import React, {useRef, useState} from 'react';
import { Container, List, ListItem, Input, Button } from '@mui/material';
import {signUp, useAuth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function Register() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    let navigate = useNavigate();
    
    async function handleSignUp() {
        setLoading(true);
        try{
            await signUp(emailRef.current.value, passwordRef.current.value).then((user) => {
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
        setLoading(false);
    }

    if(loading){
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="warning" size={60} />
            </Box>
        )
    }

    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <p>Welcome {name}, you have signed up.</p>
            </Container>
        )
    }

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
