import { useEffect, useState } from "react";
import { getGenreIdFromName, getGenres, getPlaylistByGenre, getToken, sear, search } from "./spotify_api";

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
import AudioRecorder from "../../components/recorder2";

function MusicComponent() {

    const [results, setResults] = useState();

    var { artistParam } = useParams();
    console.log(artistParam);

    useEffect(()=> {
        const fetchToken = async ()=> {
            const t = await getToken();
            
            const a = await search(t, artistParam, "artist");


            const filteredResult = a.artists.items.map(artist => {
                return (
                    <AccordionItem key={artist.id}>
                        <h2>
                        <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            {artist.name}
                        </Box>
                        <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        <Box py="5">
                            {artist.images.length > 0 && <img src={ artist.images[0].url } />}
                        </Box>
                        <Button onClick={()=> {window.open(artist.external_urls.spotify)} }> Play </Button>
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

                Artist : { artistParam } 
            </Text>
            <Accordion>
                {results}
            </Accordion>
            </Box>
        </div>
    )
}

export default MusicComponent;