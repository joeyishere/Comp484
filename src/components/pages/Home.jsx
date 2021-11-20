import React from 'react'
import styles from '../styles/home.module.css';
import { Container, Typography} from '@mui/material';

export default function Home() {
    return (
        // this is basic html with react

        // <div className={styles.wrapper}>
        //     Home page
        // </div>

        // this is Material UI, just an example
        <Container className={styles.container} maxWidth="lg">
            <Typography variant="h2" component="h1" gutterBottom>
                Home page
            </Typography>
        </Container>
    )
}
