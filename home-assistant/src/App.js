import './App.css';
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

function App() {
  return (
    <div className="App">
    <Login></Login>
    <Box>
      <AudioRecorder />
    </Box>
    <Box>
      <MediaRecorderM />
    </Box>
    <Box>
    <Recorder2></Recorder2>
    </Box>
    </div>
  );
}

export default App;
