import { Box } from "@chakra-ui/react";
import Login from "./login";
import AudioRecorder from "../components/recorder";
// import Recorder2 from '../components/recorder2';
import MediaRecorderM from "../components/media-recorder";
import Recorder2 from "../components/recorder2";
import Map from "../components/map";

function Home() {
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

            <Box>
                <Map></Map>
            </Box>
        </div>

    )
}

export default Home;