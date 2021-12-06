import React, {useState, useRef} from 'react';
import { Container, Input, Button, List, ListItem} from '@mui/material';
import { login, useAuth } from '../../firebase';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(emailRef.current.value, passwordRef.current.value);
        }
        catch (error) {
            console.error(error);
        }
        setLoading(false);
    };
    if(loading) {
        return (
            <Container maxWidth="lg" style={{marginTop: '10vh'}}>
                <h1>Loading...</h1>
            </Container>
        )
    }

    if(!currentUser) {
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <h1>Login</h1>
                <List>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input type="email" placeholder="Email" inputRef={emailRef} color="warning" style={{width: '40%'}} />
                    </ListItem>
                    <ListItem style={{marginTop: '10px'}}>
                        <Input type="password" placeholder="Password" inputRef={passwordRef} color="warning" style={{width: '40%'}} />
                    </ListItem>
                </List>
                <div style={{marginTop: '20px', marginLeft: '15px'}}>
                    <Button onClick={handleLogin} variant="outlined" color="warning">Sign In</Button>
                </div>
            </Container>
        )
    }
    if(currentUser) {
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <h1>Login Page</h1>
                <p>Welcome {currentUser?.email}, you are logged in.</p>
                <Button variant="outlined" color="warning" href="/favorites" style={{marginRight: '15px'}}>Go to Favorites</Button>
                <Button variant="outlined" color="warning" href="/">Go to Home Page</Button>
            </Container>
        )
    }
}
