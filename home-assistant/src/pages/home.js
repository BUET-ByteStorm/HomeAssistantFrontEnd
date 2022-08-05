import { Box, Button, Text,Heading } from "@chakra-ui/react";
import Login from "./login";
import AudioRecorder from "../components/recorder";
// import Recorder2 from '../components/recorder2';
import MediaRecorderM from "../components/media-recorder";
import Recorder2 from "../components/recorder2";
import Map from "../components/map";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="App" >
            <Box mt="250">
            <Heading>Home Assistant </Heading>
                <Recorder2 mt="50"></Recorder2>
            </Box>
            <Box>
                <Button  m="5">
                    <Link to="/login">Login</Link>

                </Button>
                <Button  m="5">
                    <Link to="/register">Register</Link>
                </Button>
            </Box>
        </div>

    )
}

export default Home;