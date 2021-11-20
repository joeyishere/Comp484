import React, {useState} from 'react'
import { AppBar, Container, Toolbar, Link, Hidden, IconButton, Divider, SwipeableDrawer, List, ListItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ChevronRight } from '@mui/icons-material';
import styles from '../styles/nav.module.css';

export default function Nav() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <AppBar color="default">
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <div className={styles.logo}>Movie Search</div>
                    <Hidden smDown>
                        <Link color="textPrimary" variant="button"underline="none" href="/" className={styles.link}>Home</Link>
                        <Link color="textPrimary" variant="button"underline="none" href="/explore" className={styles.link}>Explore</Link>
                        <Link color="textPrimary" variant="button"underline="none" href="/favorites" className={styles.link}>Favorites</Link>
                    </Hidden>
                    <Hidden smUp>
                        <IconButton aria-label="menu" onClick={() => setDrawerOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </Container>
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
                </List>
            </SwipeableDrawer>
        </AppBar>
    )
}
