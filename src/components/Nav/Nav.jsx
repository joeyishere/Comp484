import React, {useState} from 'react'
import { AppBar, Container, Toolbar, Link, Hidden, IconButton, Divider, SwipeableDrawer, List, ListItem} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { ChevronRight, TravelExplore, Menu , Favorite, AccountCircle} from '@mui/icons-material';
import styles from '../styles/nav.module.css';

export default function Nav() {
    //use state false, nav currently closed 
    const [drawerOpen, setDrawerOpen] = useState(false);

    //render navbar
    return (
        <AppBar color="default">
            {/* navbar for desktop view */}
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <div className={styles.logo}>The Watchlist</div>
                    <Hidden smDown>
                        <Link color="textPrimary" variant="button"underline="none" href="/" className={styles.link}><HomeIcon /></Link>
                        <Link color="textPrimary" variant="button"underline="none" href="/explore" className={styles.link}><TravelExplore /></Link>
                        <Link color="textPrimary" variant="button"underline="none" href="/favorites" className={styles.link}><Favorite /></Link>
                        <Link color="textPrimary" variant="button"underline="none" href="/landing" className={styles.link}><AccountCircle /></Link>
                    </Hidden>
                    <Hidden smUp>
                        <IconButton aria-label="menu" onClick={() => setDrawerOpen(true)}>
                            <Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </Container>
            {/* navbar for mobile view */}
            <SwipeableDrawer 
                anchor="right" 
                open={drawerOpen} 
                onOpen={() => setDrawerOpen(true)} 
                onClose={() => setDrawerOpen(false)}
                
            >
                <div>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        <ChevronRight />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button>
                        <Link color="textPrimary" variant="button"underline="none" href="/" className={styles.link}>Home</Link>
                    </ListItem>
                    <ListItem button>
                        <Link color="textPrimary" variant="button"underline="none" href="/explore" className={styles.link}>Explore</Link>
                    </ListItem>
                    <ListItem button>
                        <Link color="textPrimary" variant="button"underline="none" href="/favorites" className={styles.link}>Favorites</Link>
                    </ListItem>
                    <ListItem button>
                        <Link color="textPrimary" variant="button"underline="none" href="/landing" className={styles.link}>Account</Link>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </AppBar>
    )
}
