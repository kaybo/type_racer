import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {stringValidation, avgString} from './helper/helper_method';

const axios = require("axios");

class App extends Component {

  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4001",
      
      color: 'white',
      word: "",
      startButton: true,
      playerWord: "",
      showTextField: "",
      id: Math.floor(Math.random() * 999999),
      progressGameInterval: undefined,
    };
  }

  startGameInterval;  
  // progressGameInterval;


  updateGameState = () =>{
    console.log('updategamestate being called')
    const playerState = {
      id: this.state.id,
      typedProgress: avgString(this.state.playerWord, this.state.word),

    };
    console.log(playerState.typedProgress);
    axios.post("http://localhost:4001/updategame", playerState).then(res=>{
      console.log(res.data);
      if(res.data === true){
        clearInterval(this.state.progressGameInterval);
        this.setState({
          word: "",
          startButton: true,
          playerWord: "",
          showTextField: "",
          progressGameInterval: undefined,
        });
      }else{
        for(const key in res.data){
          console.log('DEBUGGGGGGGG:  ', key, this.state.id);
          if(parseInt(this.state.id) !== parseInt(key)){
           if(this.state.typedProgress !== 100 && res.data[key] === 100){
              console.log('this is true')
              clearInterval(this.state.progressGameInterval);
              this.setState({
                word: "",
                startButton: "lose",
                playerWord: "",
                showTextField: "",
              });
            }
          }
          if(res.data[this.state.id] === 100){
            console.log('this is true')
              clearInterval(this.state.progressGameInterval);
              this.setState({
                word: "",
                startButton: "win",
                playerWord: "",
                showTextField: "",
              });
          }
        }
        console.log(res.data)
      }
    });
  };

  startGame = ()=>{
    console.log('start game being called')
    const playerInfo = {
      id: this.state.id,
    };

    axios.post("http://localhost:4001/randomword", playerInfo).then(res=>{

      if(res.data === "Please wait for another player to join."){
        this.setState({word: res.data, startButton: "wait"});
      }else if(res.data === "The game is in progress, please wait until the game is finished."){
        this.setState({word: res.data, startButton: "full"});
      }else{
        this.setState({word: res.data, startButton: false}, ()=>{
          clearInterval(this.startGameInterval);
          this.state.progressGameInterval = setInterval(this.updateGameState, 1000);

        });
      }
    });
  };

  realTimeQueue = () =>{
    this.startGameInterval = setInterval(this.startGame, 300);
   }

  updatePlayerText = (e) =>{
    console.log(this.state.playerWord)
    if(stringValidation(this.state.word, e.target.value)){
      this.setState({playerWord: e.target.value}, ()=>{
        if(this.state.word.length === this.state.playerWord.length){
          // clearInterval(this.state.progressGameInterval);
          this.setState({
            startButton: "waitingresults",
          })
        }
      })
    }
  };

  render() {
    // testing for socket connections

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })

    // let hardCoded = "one two three four five 4 at wow I'm so bad dude";

    let startButton;
    if(this.state.startButton === true){

      startButton =       
      <div>
        <h1 style={{
          color: 'white',
          fontSize: '100px',
          position: 'relative',
          top: '-300px',
        }}> TYPE RACER </h1>
        <h2 style={{
          color: 'white',
          positive: 'relative',
          fontSize: '50px',
        }}>Click the button to start typing against others!</h2>
        <button style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '50px',
            fontFamily: 'Arial',
            textAlign: 'center',
            fontSize: '50px',        
        }} 
        onClick={this.realTimeQueue}>Start Game</button>
      </div>
    }else if(this.state.startButton === false){
      startButton = 
      <div style={{
        color: 'white',
        fontSize: '30px',
      }

      }>
        {this.state.word}
        <input type = "text" value = {this.state.playerWord} onChange = {this.updatePlayerText} />
      </div>
    }else if(this.state.startButton === 'win'){
      startButton = 
      <div>
        <h1 style = {{
          color: 'white',
          fontSize: '50',
        }}>You have won the race!</h1>
      </div>
    }else if(this.state.startButton === 'wait' || this.state.startButton === "full"){
      startButton = 
      <div>
        {this.state.word}
      </div>
    }else if(this.state.startButton === 'lose'){
      startButton = 
      <div>
        <h1 style = {{
          color: 'white',
          fontSize: '50',
        }}>You have lost the race!</h1>
      </div>
    }else if(this.state.startButton === 'waitingresults'){
      startButton = 
      <div>
        <h1 style = {{
          color: 'white',
          fontSize: '50',
        }}>Please wait for result to come out</h1>
      </div>
    }

    return (
      <div style={{
        background: 'blue',
        padding: '400px',
      }}>
        {startButton}
      </div>
    )
  }
}
export default App;

