import React, { Component, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa"
import { Input, Box, Button, Divider, Heading, Text, Image, Stack } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import Recorder2 from "../components/recorder2";

async function searchStuff(q) {
q = encodeURIComponent(q);
const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAtd72mXySE39fOi1l6F0fdtSPMFymamE4&cx=a36a2370c42a34618&q=${q}`, {
    "method": "GET",
});
const body = await response.json();
return body.items;
}



function Search() {
  const { Query } = useParams();
  const [query, setQuery] = useState(Query);
  const [list, setList] = useState();

  const search = (e) => {
    e.preventDefault();
    searchStuff(query).then(setList);
  };

  useEffect(()=>{
searchStuff(query).then(setList);
  },[] );

  return (
    <div className="app">
        <Box maxW='720px' p="5px" m="auto" mt="8" mb="8">
        <Stack spacing={3} direction='row'>
        <Input placeholder='Search' size='md' value={query} onChange={e => setQuery(e.target.value)} />
        <Button onClick={search}>Search</Button>
        </Stack>
        
        <Recorder2 m="auto"></Recorder2>
        </Box>
        
        <Box maxW='720px' m='auto'>
        {!list
            ? null
            : list.length === 0
            ? <p><i>No results</i></p>
            : <ul>
                {list.map((item, i) => (
                
                <Item key={i} item={item}/>
                ))}
            </ul>
        }
        </Box> 
        


    </div>
  );
}

function Item({ item }) {
    const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
    const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });
  
    return (
    <div className="item">
        < Feature title={item.title} desc={item.snippet} onClick={()=> {window.open(item.link)}} />
        <Divider/>
      </div>
    );
  }

  function Feature({ title, desc, ...rest }) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        <Heading fontSize='xl'>{title}</Heading>
            <Text mt={4}>{desc}</Text>
      </Box>
    )
  }

export default Search;