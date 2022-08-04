import './App.css';
import Login from './pages/login' ;
import Recorder from './components/recorder';

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
} from '@chakra-ui/react'


function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <Alert status='error'>
    <AlertIcon />
    <AlertTitle>Your browser is outdated!</AlertTitle>
    <AlertDescription>Your Chakra experience may be degraded.</AlertDescription>
    </Alert>
    <Login></Login>
    <Box>
    <Recorder></Recorder>
    </Box>
    </div>
  );
}

export default App;
