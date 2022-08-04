import { useEffect, useState } from "react";
import { getGenreIdFromName, getGenres, getPlaylistByGenre, getToken } from "./spotify_api";

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

function MusicComponent() {

    var { genreParam } = useParams();
    console.log(genreParam);

    const [token, setToken] = useState();
    const [genres, setGenres] = useState();
    const [playlist, setPlaylist] = useState();
    useEffect(()=> {
        const fetchToken = async ()=> {
            const t = await getToken();
            setToken(t);

            const gnr = await getGenres(t);
            setGenres(gnr);

            const plst = await getPlaylistByGenre(t, getGenreIdFromName(genreParam, gnr));
            console.log(plst);
            const filteredPlst = plst.map(song => {
                return (
                    <AccordionItem key={song.id}>
                        <h2>
                        <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            {song.name}
                        </Box>
                        <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                        <Box py="5"> {song.description}</Box>
                        <Button onClick={()=> {window.open(song.external_urls.spotify)} }> Play </Button>
                        </AccordionPanel>


                    </AccordionItem>
                )
            });

            setPlaylist( filteredPlst )
        };
        fetchToken();
    }, []);

    return (
        <div >
            <Box maxW="720px" mx="auto">
            <Text fontSize='50px' color='tomato'>
                Music Suggestion : {genreParam} 
            </Text>
            <Accordion>
                {playlist}
                
            </Accordion>
            </Box>
        </div>
    )
}

export default MusicComponent;