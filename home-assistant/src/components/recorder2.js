import React, { Component } from "react";
import AudioAnalyser from "react-audio-analyser";
import { Button, ButtonGroup } from '@chakra-ui/react'
import postData from "../utils/postData";

export default class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
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
        <AudioAnalyser {...audioProps}>
          <div className="btn-box">
            <Button colorScheme='blue'
                    onClick={() => this.controlAudio("recording")}>
                Start
            </Button>
            <Button onClick={() => this.controlAudio("paused")}>
              Pause
            </Button>
            <Button
              onClick={() => this.controlAudio("inactive")}
            >
              Stop
            </Button>
            <Button onClick={() => console.log(AudioAnalyser)}>
              Log
            </Button>
                    <Button onClick={() => {
                        postData('/upload-file', {"__audio":this.audioType,"text":"hi there","text2":"hi dogesh"})
                        .then((response) => {
                            console.log(this.audioType);
                            console.log("response: ");
                            console.log(response);
                            console.log("response data: ");
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error.response);
                        }); } 
                    }>
                Send
            </Button>
          </div>
        </AudioAnalyser>
        <p>choose output type</p>
        <select
          name=""
          id=""
          onChange={e => this.changeScheme(e)}
          value={audioType}
        >
          <option value="audio/webm">audio/webm（default）</option>
          <option value="audio/wav">audio/wav</option>
          <option value="audio/mp3">audio/mp3</option>
        </select>
      </div>
    );
  }
}
