import React, {useState, useEffect} from 'react';
import { Container, Button, Typography } from '@mui/material';
import styles from '../styles/landing.module.css';
import { logout, useAuth, db } from '../../firebase'
import { doc, getDoc } from "firebase/firestore"; 
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Landing() {
    // sets state of loading circle
    const [loading, setLoading] = useState(false);
    // sets state of users name from input
    const [name, setName] = useState('');
    // stores current user
    const currentUser = useAuth();

    // Check if user exists/is logged in
    useEffect(() => {
        // if user exists, get their name
        if(currentUser) {
            // set loading to be true
            setLoading(true);
            // get the user's name
            const fetchUser = async () => {
                const userRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setName(docSnap.data().name);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
            // run fetchUser function
            fetchUser();
        }
        // set loading to now be false
        setLoading(false);
    }, [currentUser]);

    // Log out error handler
    async function handleLogout() {
        // while logging out set loading to true
        setLoading(true);
        // try to log out
        try{
            await logout();
        } catch(error){
            alert(error.message);
        }
        // set loading to false
        setLoading(false);
    }

    // Display Loading Circle
    if(loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress color="warning" size={60} />
            </Box>
        )
    }

    // Displays log out button if user is currently logged in
    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px', textAlign: 'center'}}>
                <Typography variant="h3" component="h3">Hello, {name}</Typography>
                <div style={{marginTop: '15px', marginBottom: '15px'}}>
                    <Typography variant="h6" component="h6">Email: {currentUser?.email}</Typography>
                </div>
                <Button variant="outlined" color="warning" onClick={handleLogout}>Logout</Button>
            </Container>
        )
    }

    // User is not logged in and will display a login and singup option instead
    if(!currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <center>
                    <Typography variant="h4" component="h4">Login or Sign Up to save your favorite movies and tv shows</Typography>
                    <div className={styles.link}>
                        <Button variant="outlined" color="warning" href="/login" style={{width: '40%'}}>Login</Button>
                    </div>
                    <div className={styles.link}>
                        <Button variant="outlined" color="warning" href="/register" style={{width: '40%'}}>Signup</Button>
                    </div>
                </center>
            </Container>
        )
    }
}
