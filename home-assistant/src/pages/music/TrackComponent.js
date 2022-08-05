import { useEffect, useState } from "react";
import { getGenreIdFromName, getGenres, getPlaylistByGenre, getToken, sear, search } from "./spotify_api";
import AudioRecorder from "../../components/recorder2";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Button
} from '@chakra-ui/react'
import { useParams } from "react-router-dom";

function TrackComponent() {

    const [results, setResults] = useState();

    var { trackParam } = useParams();
    console.log(trackParam);

    useEffect(()=> {
        const fetchToken = async ()=> {
            const t = await getToken();
            
            const a = await search(t, trackParam, "track");

            const filteredResult = a.tracks.items.map(track => {
                return (
                    <AccordionItem key={track.id}>
                        <h2>
                        <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            {track.name}
                        </Box>
                        <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        <Box py="5">
                            { track.artists.map(ast => {return (<li> {ast.name} </li>) } )}
                        </Box>
                        <Button onClick={()=> {window.open(track.external_urls.spotify)} }> Play </Button>
                        </AccordionPanel>


                    </AccordionItem>
                )
            });
            setResults(filteredResult);
        };
        fetchToken();
    }, []);

    return (
        <div >
            <Box maxW="720px" mx="auto">
            <AudioRecorder></AudioRecorder>
            <Text fontSize='50px' color='tomato'>
                Track : { trackParam } 
            </Text>
            <Accordion>
                {results}
            </Accordion>
            </Box>
        </div>
    )
}

export default TrackComponent;