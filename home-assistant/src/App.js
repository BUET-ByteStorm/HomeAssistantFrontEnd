import './App.css';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MusicComponent from './pages/music/MusicComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Home />}/>
        <Route path="/music/:genreParam" element= {<MusicComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
