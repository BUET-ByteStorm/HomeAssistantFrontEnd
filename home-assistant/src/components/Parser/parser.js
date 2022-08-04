import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Parser() {
    const [qString, setQString] = useSearchParams();

    const text = qString.get('q');
    const formattedText = text.replace(/[^a-zA-Z0-9 ]/g, '');
    const navigate = useNavigate();

    useEffect(()=> {
        if (formattedText.substring(0, 4).toLowerCase() === "play") {
            if (formattedText.substring(5, 11)=== 'artist') {
                navigate('/music/artist/' + formattedText.substring(12));
            }
            else if (formattedText.substring(5, 10) === 'track') {
                navigate('/music/track/' + formattedText.substring(11));
            }
            else {
                navigate('/music/genre/' + formattedText.substring(5));
            }
        }
    },[]);


    return (
        <div>
            Parser : {text}
        </div>
    )
}

export default Parser;