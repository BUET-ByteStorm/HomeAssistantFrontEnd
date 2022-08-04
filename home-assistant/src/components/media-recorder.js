import { Button } from "@chakra-ui/react";
import { ReactMediaRecorder } from "react-media-recorder";
import postData from "../utils/postData";
import { useState } from "react";
import sendRecFile from "./sendRecordedFile";

const RecordView = () => {
    const [data,setData] = useState();
    const [file,setFile] = useState();
    // const [cookies,setCookies] = useCookies(['token','username']);

    const onFileInputChange = (event) => {
        console.log("Chosen file:"+event.target.files); 
        if( event.target.files && event.target.files[0]){
            const newData = {...data,FILE: URL.createObjectURL(event.target.files[0]) };
            setData(newData);
            setFile(event.target.files);
            console.log(event.target.files[0]);
        }
    }
    const sendFile = () => {

        const formData = new FormData();
        formData.append('file',file[0]);

        let fileURL;
        postData('/upload-file',formData)
        .then((response) => {
            console.log("formdata: ");
            console.log(formData);
            console.log("response: ");
            console.log(response);
            console.log("response data: ");
            console.log(response.data);
            fileURL = response.data.url;
        })
        .catch( (error) => {
            console.log(error) ;
        });
    }

  return <div>
    <ReactMediaRecorder
      audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <Button onClick={startRecording}>Start Recording</Button>
          <Button onClick={stopRecording}>Stop Recording</Button>
          <Button onClick={
            () => {
              sendRecFile(mediaBlobUrl);
                // const formData = new FormData();
                // formData.append('file',mediaBlobUrl);
                // postData('/upload-file', {"__audio":formData,"text":"hi there","text2":"hi dogesh"})
                // .then((response) => {
                //     console.log(mediaBlobUrl);
                //     console.log("response: ");
                //     console.log(response);
                //     console.log("response data: ");
                //     console.log(response.data);
                // })
                // .catch((error) => {
                //     console.log(error.response);
                // }); } 
            }
          } >Send</Button>
            <input type="file" onChange={onFileInputChange}></input> 
            <Button onClick={() => sendFile() }> Send File</Button>
            <audio src={mediaBlobUrl} controls />
        </div>
      )}
    />
  </div>;
};

export default RecordView;