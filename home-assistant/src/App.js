import './App.css';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import MusicComponent from './pages/music/MusicComponent';
import ArtistComponent from './pages/music/ArtistComponent';
import TrackComponent from './pages/music/TrackComponent';
import Parser from './components/Parser/parser';
import MapRoute from './pages/maproute';
import News from './pages/news';
import Search from './pages/search';
import CreateNote from './pages/create-note.js';
import ShowNotes from './pages/show-notes.js';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Home />}/>
        <Route path="/music/genre/:genreParam" element= {<MusicComponent />} />
        <Route path="/music/artist/:artistParam" element= {<ArtistComponent />} />
        <Route path="/music/track/:trackParam" element= {<TrackComponent />} />
        <Route path="/parser" element={ <Parser /> } />
        <Route path="/maproute/:sourceGeo/:destGeo" element= {<MapRoute />} />
        <Route path="/news/:Query" element= {<News/>} />
        <Route path="/search/:Query" element= {<Search/>} />
        <Route path="/notes/create/:Query" element= {<CreateNote/>}/>
        <Route path="/notes/show" element= {<ShowNotes/>}/>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
