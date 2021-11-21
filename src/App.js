import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Landing from './components/auth/Landing'
import Register from './components/auth/Register';
import Home from './components/pages/Home';
import Explore from './components/pages/Explore';
import Favorites from './components/pages/Favorites';
import Nav from './components/Nav/Nav';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  let darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);
  
  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/landing" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/explore" element={<Explore/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
