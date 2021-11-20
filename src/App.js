import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Landing from './components/auth/Landing';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/landing" element={<Landing/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
