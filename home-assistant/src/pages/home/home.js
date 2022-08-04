import { Box } from "@chakra-ui/react";
import Login from "../login";
import AudioRecorder from "../../components/recorder2";
import Recorder2 from '../../components/recorder2';
import MediaRecorderM from '../../components/media-recorder';

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
        </div>

    )
}

export default Home;