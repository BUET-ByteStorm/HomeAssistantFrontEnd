import postData from "../utils/postData";

export default async function sendRecFile(blobUrl, next) {

        const audioBlob = await fetch(blobUrl).then((r) => r.blob());
        const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });

        console.log(audioFile);

        const formData = new FormData();
        formData.append('file', audioFile);

        console.log("I am here");

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
            
            next(response.data);
        })
        .catch( (error) => {
            console.log(error) ;
        });

        console.log("Not Here");

}