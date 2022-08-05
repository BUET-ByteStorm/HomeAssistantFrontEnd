import React, { Component, useState } from "react";
import AudioAnalyser from "react-audio-analyser";
import { Box, Button, ButtonGroup } from '@chakra-ui/react'
import postData from "../utils/postData";
import sendRecFile from "./sendRecordedFile";
import { BsRecordCircleFill, BsStopCircleFill } from "react-icons/bs"
import { FaMicrophone } from "react-icons/fa"
import { AiFillHo } from "react-icons/ai"

import { useNavigate } from "react-router-dom";


function InRecorder(props) {

  const navigate = useNavigate();

  const next = (text)=> {
    console.log("Done");

    navigate({
      pathname: '/parser',
      search: `?q=${text}`
    });
  }

  const {audioSrc} = props;
  return (  

    <Button leftIcon={<FaMicrophone/>} variant='solid' onClick={() => {
      sendRecFile(audioSrc, next);
  }} ml='2' mr='2'>Execute</Button>
  )
}

export default class AudioRecorder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "",
      audioType: "audio/wav"
    };
  }

  controlAudio(status) {
    this.setState({
      status
    });
  }

  changeScheme(e) {
    this.setState({
      audioType: e.target.value
    });
  }

  componentDidMount() {
    this.setState({
      audioType: "audio/wav"
    });
  }

  render() {
    const { status, audioSrc, audioType } = this.state;
    const audioProps = {
      audioType,
      // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
      status,
      audioSrc,
      backgroundColor: '#ffffff',
      height: '8px',
      timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
      startCallback: e => {
        console.log("succ start", e);
      },
      pauseCallback: e => {
        console.log("succ pause", e);
      },
      stopCallback: e => {
        this.setState({
          audioSrc: window.URL.createObjectURL(e)
        });
        console.log("succ stop", e);
      },
      onRecordCallback: e => {
        console.log("recording", e);
      },
      errorCallback: err => {
        console.log("error", err);
      }
    };
    return (
      <div>
        <Box maxW="720px" m="auto">
        <AudioAnalyser {...audioProps}>
          <div className="btn-box">
              <Button leftIcon={<FaMicrophone/>} variant='solid' onClick={() => this.controlAudio("recording")} ml='2' mr='2'>Start</Button>
              <Button leftIcon={<BsStopCircleFill/>} variant='solid' onClick={() => this.controlAudio("inactive")} ml='2' mr='2'>Stop</Button>
            
            <InRecorder audioSrc={audioSrc} />
          </div>
        </AudioAnalyser> 
        </Box> 
      </div>
    );
  }
}
