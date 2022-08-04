import axios from "axios";

axios.defaults.timeout = 20000

const postData = async (url, body, token=undefined) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL+'',
        headers: {'authorization': 'Bearer '+token}
    })
    const response = await instance.post(url,body);
    return response;
} 
export default postData;