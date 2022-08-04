import './App.css';
import Login from './pages/login' ;

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
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
    </div>
  );
}

export default App;
