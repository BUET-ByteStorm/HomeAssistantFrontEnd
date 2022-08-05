import React, { Component, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { Input, Box, Button, Divider, Heading, Text, Image, Stack } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import postData from "../utils/postData";
import { useCookies } from "react-cookie";

async function createNoteRequest(q,token) {
    //
    const req_json = {noteCreator: 'Quvi', noteId: 'quvi_notes', noteContent: q}
    postData('/notes', {content:q}, token ).then((response) => {
        console.log(response);

    }).catch((e) => {
        console.log(e);
    })
}

function CreateNote() {
    const [cookies,setCookies] = useCookies(["token","username"]);
    const { Query } = useParams();
    const [query, setQuery] = useState(Query);
    const create = (e) => {
        e.preventDefault();
        createNoteRequest(query);
    };

    useEffect(()=>{
        createNoteRequest(query,cookies.token) ;
          },[] );

  return (
    <div className="app">

        <Box maxW='720px' p="5px" m="auto" mt="8" mb="8">
        <Stack spacing={3} direction='row'>
        <Input placeholder='Tell about your day!' size='md' value={query} onChange={e => setQuery(e.target.value)} />
        {/* <Button leftIcon={<FaMicrophone/>} variant='solid'>Voice</Button> */}
        <Button onClick={create}>Submit</Button>

        </Stack>
        </Box>    
    </div>
  );
}

export default CreateNote;