import axios from "axios";

const fetchData = async (url, token) => {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL+'',
        timeout: 10000,
        headers:{'authorization': 'Bearer '+token}
    })
    
    const response = await instance.get(url) ;
    return response;
} 

export default fetchData ;