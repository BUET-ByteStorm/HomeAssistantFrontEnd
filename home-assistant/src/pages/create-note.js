import React, { Component, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { Input, Box, Button, Divider, Heading, Text, Image, Stack } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import postData from "../utils/postData";

async function createNoteRequest(q) {
    const req_json = {noteCreator: 'Quvi', noteId: 'quvi_notes', noteContent: q}
    postData('/notes', req_json).then((response) => {
        console.log(response)
    })
}

function CreateNote() {
    const { Query } = useParams();
    const [query, setQuery] = useState(Query);
    const create = (e) => {
        e.preventDefault();
        createNoteRequest(query);
    };

    useEffect(()=>{
        createNoteRequest(query)
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