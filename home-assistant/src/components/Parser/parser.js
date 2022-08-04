import { map } from 'leaflet';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Parser() {
    const [qString, setQString] = useSearchParams();

    const text = qString.get('q');
    const formattedText = text.replace(/[^a-zA-Z0-9 ]/g, '');
    const splitText = formattedText.split(" ");
    // console.log(splitText);
    const navigate = useNavigate();

    useEffect(()=> {
        if (splitText[0].toLowerCase() === "play") {
            if ( splitText[1].toLowerCase() === 'artist') {
                // navigate('/music/artist/' + formattedText.substring(12));
                // const str = var array= ["a", "b", "c", "d"];
                const str = splitText.slice(2, splitText.length).join(" ");
                console.log(str);
                navigate('/music/artist/'+str);
            }
            else if (splitText[1].toLowerCase() === 'track') {
                // navigate('/music/track/' + formattedText.substring(11));
                // navigate('/music/track/'+splitText[2]); 
                const str = splitText.slice(2, splitText.length).join(" ");
                navigate('/music/track/'+str);
            }
            else {
                const str = splitText.slice(1, splitText.length).join(" ");
                navigate('/music/genre/'+str);
            }
        }
        else if( splitText[0].toLowerCase() === "route" ){
            let source = "",dest = "";
            let i;
            for(i = 2;i<splitText.length;i++){
                if( splitText[i].toLowerCase() == "to" ){
                    i++;
                    break;
                }
                source = source.concat(splitText[i]+" ") ;
            }

            for(;i<splitText.length;i++){
                dest = dest.concat(splitText[i]+" ") ;
            }

            navigate('/maproute/'+source+'/'+dest);
        }
        else if( splitText[0].toLowerCase() == "news") {
            const str = splitText.slice(1,splitText.length).join(" ");
            navigate('/news/'+str);
        }
        else{
            navigate('/search/'+formattedText);
        }
    },[]);


    return (
        <div>
            Parser : {text}
        </div>
    )
}

export default Parser;