import React, { Component, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa"
import { Input, Box, Button, Divider, Heading, Text, Image, Stack } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import Recorder2 from "../components/recorder2";

async function searchNews(q) {
  q = encodeURIComponent(q);
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "2427126120msh6bb5b93577d2090p1d3744jsncf3d6497a306",
      "x-bingapis-sdk": "true"
    }
  });
  const body = await response.json();
  return body.value;
}

function News() {
  const { Query } = useParams();
  const [query, setQuery] = useState(Query);
  const [list, setList] = useState();

  const [spoke,setSpoke] = useState(0);
  const {speak } = useSpeechSynthesis();

  const search = (e) => {
    e.preventDefault();
    searchNews(query).then(setList);
  };

  useEffect(() => {
    speak({ text: `showing ${query} news` });
    searchNews(query).then(setList);
  }, []);



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

                <Item key={i} item={item} />
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

      < Feature title={item.name} desc={item.description} img={item.image?.thumbnail?.contentUrl} datePublished={formatDate(item.datePublished)} onClick={() => { window.open(item.url) }} />

      <Divider />
    </div>
  );
}

function Feature({ title, desc, img, datePublished, ...rest }) {
  return (
    <Box p={5} shadow='md' borderWidth='1px' {...rest}>
      <Heading fontSize='xl'>{title}</Heading>
      <Stack spacing={8} direction='row'>
        <Text mt={4}>{desc}</Text>
        <Image src={img} alt='' />
      </Stack>
      <Text mt={2}>{datePublished}</Text>
    </Box>
  )
}

export default News;