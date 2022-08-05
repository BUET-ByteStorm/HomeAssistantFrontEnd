import React, { Component, useEffect, useState } from "react";
import { FaMicrophone } from "react-icons/fa"
import { Input, Box, Button, Divider, Heading, Text, Image, Stack } from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import fetchData from "../utils/fetchData";
import { useCookies } from "react-cookie";

function ShowNotes() {
    const [list, setList] = useState();
  const [cookies,setCookies] = useCookies(["token","username"]);
  const search = async () => {
    const res = await fetchData('/notes', cookies.token);
    console.log(res)
    var aList = res.data.data.map((item) => {
        return (<div><Feature desc={item.content} id={item.id}/></div>)
    })
    setList(aList)
  };

  useEffect(() => {
    search()
  }, [])

  return (
    <div className="app">
        <Box maxW="720px" m="auto">
            <Heading mt='5' mb='5'>All notes</Heading>
            {list}
        </Box>
    </div>
  );
}

  function Feature({desc, id, ...rest }) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        <Heading fontSize='xl'>{id}</Heading>
            <Text mt={4}>{desc}</Text>
      </Box>
    )
  }

export default ShowNotes;