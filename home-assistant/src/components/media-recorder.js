import { Button } from "@chakra-ui/react";
import { ReactMediaRecorder } from "react-media-recorder";
import postData from "../utils/postData";

const RecordView = () => (
  <div>
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <Button onClick={startRecording}>Start Recording</Button>
          <Button onClick={stopRecording}>Stop Recording</Button>
          <Button onClick={
            () => {
                const formData = new FormData();
                formData.append('file',mediaBlobUrl);
                postData('/upload-file', {"__audio":formData,"text":"hi there","text2":"hi dogesh"})
                .then((response) => {
                    console.log(mediaBlobUrl);
                    console.log("response: ");
                    console.log(response);
                    console.log("response data: ");
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                }); } 
          
          }>Send</Button>
          <audio src={mediaBlobUrl} controls />
        </div>
      )}
    />
  </div>
);

export default RecordView;