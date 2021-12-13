import React, {useState, useRef} from 'react';
import { Container, Input, Button, List, ListItem} from '@mui/material';
import { login, useAuth } from '../../firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    let navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value).then(() => {
                navigate("/");
            });
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    if(loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="warning" size={60} />
            </Box>
        )
    }

    if(!currentUser) {
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <h1>Login</h1>
                <List>
                    <ListItem style={{marginTop: '10px'}} disableGutters>
                        <Input type="email" placeholder="Email" inputRef={emailRef} color="warning" style={{width: '60%'}} />
                    </ListItem>
                    <ListItem style={{marginTop: '10px'}} disableGutters>
                        <Input type="password" placeholder="Password" inputRef={passwordRef} color="warning" style={{width: '60%'}} />
                    </ListItem>
                </List>
                <div style={{marginTop: '20px'}}>
                    <Button onClick={handleLogin} variant="outlined" color="warning">Sign In</Button>
                    <Button variant="outlined" color="warning" href="/register" style={{marginLeft: '20px'}}>Signup</Button>
                </div>
            </Container>
        )
    }
    if(currentUser) {
        return (
            <Container maxWidth="lg" style={{marginTop: '90px', textAlign: 'center'}}>
                <p>Welcome {currentUser?.email}, you are logged in.</p>
            </Container>
        )
    }
}
