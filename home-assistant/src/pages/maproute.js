import { Box } from "@chakra-ui/react";
import MapRouteComponent from "../components/mapRoute";
import useAxiosFetch from "../utils/useAxiosFetch" ;
import { useState } from "react";
import { useParams } from "react-router-dom";

const api_key = process.env.REACT_APP_ORS_API_KEY;
const ors_url = process.env.REACT_APP_ORS_URL;
const search_url = `https://api.openrouteservice.org/geocode/search?api_key=${api_key}&text=` ;

function MapRoute() {
    const {sourceGeo,destGeo} = useParams();
    console.log(sourceGeo);
    console.log(destGeo); 

    const source1 = {lat:23.8103, lng:90.4125};
    const dest1 = {lat:22.3569, lng:91.7832} ;
    const [source,setSource] = useState(source1);
    const [dest,setDest] = useState(dest1);

    useAxiosFetch(
        (responseData) => {
            console.log("coordinates source ");
            console.log(responseData.features[0].geometry.coordinates);
          setSource({lat:responseData.features[0].geometry.coordinates[1],lng:responseData.features[0].geometry.coordinates[0]});
        },
        search_url+sourceGeo,undefined,[]);
    useAxiosFetch(
        (responseData) => {
            console.log("coordinates destination ");
            console.log(responseData.features[0].geometry.coordinates);
            setDest({lat:responseData.features[0].geometry.coordinates[1],lng:responseData.features[0].geometry.coordinates[0]});
        },
        search_url+destGeo,undefined,[]);
    
    return (
        <div className="App">
            <Box>
                <MapRouteComponent sourceCity={source} destinationCity={dest} />
            </Box>
        </div>

    )
}

export default MapRoute;