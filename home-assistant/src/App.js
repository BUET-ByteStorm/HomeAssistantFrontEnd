import './App.css';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MusicComponent from './pages/music/MusicComponent';
import ArtistComponent from './pages/music/ArtistComponent';
import TrackComponent from './pages/music/TrackComponent';
import Parser from './components/Parser/parser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Home />}/>
        <Route path="/music/genre/:genreParam" element= {<MusicComponent />} />
        <Route path="/music/artist/:artistParam" element= {<ArtistComponent />} />
        <Route path="/music/track/:trackParam" element= {<TrackComponent />} />
        <Route path="/parser" element={ <Parser /> } />
      </Routes>
    </Router>
  );
}

export default App;
