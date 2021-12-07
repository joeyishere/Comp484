import React, {useState, useEffect} from 'react';
import { Container, Button, Typography } from '@mui/material';
import styles from '../styles/landing.module.css';
import { logout, useAuth, db } from '../../firebase'
import { doc, getDoc } from "firebase/firestore"; 

export default function Landing() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const currentUser = useAuth();

    useEffect(() => {
        if(currentUser) {
            setLoading(true);
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
            fetchUser();
        }
        setLoading(false);
    }, [currentUser]);

    async function handleLogout() {
        setLoading(true);
        try{
            await logout();
        } catch(error){
            alert(error.message);
        }
        setLoading(false);
    }
    if(loading) {
        return (
            <Container maxWidth="lg" style={{marginTop: '90px'}}>
                <h1>Loading...</h1>
            </Container>
        )
    }

    if(currentUser){
        return (
            <Container maxWidth="lg" style={{marginTop: '90px', textAlign: 'center'}}>
                <Typography variant="h3" component="h3">Welcome back, {name}</Typography>
                <div style={{marginTop: '15px', marginBottom: '15px'}}>
                    <Typography variant="h6" component="h6">Email: {currentUser?.email}</Typography>
                </div>
                <Button variant="outlined" color="warning" onClick={handleLogout}>Logout</Button>
            </Container>
        )
    }

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
