import './App.css';

import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import Login from './pages/login' ;
import Recorder from './components/recorder';
import Recorder2 from './components/recorder2';
import MediaRecorderM from './components/media-recorder';


import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react'

import AudioRecorder from 'react-audio-recorder';
import Home from './components/home/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Home />}/>
      </Routes>
    </Router>
  );
}

export default App;
