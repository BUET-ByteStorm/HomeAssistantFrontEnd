import {useState, useEffect} from "react";
import axios, {AxiosResponse} from "axios";

const useAxiosPost = (setData, url, body, token=undefined, dep=[], timeout=undefined) => {
    // const [data, setData] = useState<AxiosResponse | null>(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();
        const axiosInstance = axios.create({
        //   baseURL: process.env.REACT_APP_SERVER_URL + "",
          headers: { authorization: "Bearer " + token },
          timeout: timeout,
          cancelToken: source.token,
        });
        
        axiosInstance.post(url,body)
        .then( response => {
            if (!unmounted) {
                console.log(url+' response: ');
                console.log(response);
                console.log(url+' response data: ');
                setData(response.data);
                setLoading(false);
            }
        }).catch(function (e) {
        if (!unmounted) {
            setError(true);
            setErrorMessage(e.message);
            setLoading(false);
            if (axios.isCancel(e)) {
                console.log(`request cancelled:${e.message}`);
            } else {
                console.log("another error happened:" + e.message);
            }
        }
    });
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
    }, dep);

    return {loading, error, errorMessage};
}
export default useAxiosPost;