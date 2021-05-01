import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {stringValidation} from './helper/helper_method';
import './App.css';
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
      
    };
  }

  // sending sockets
  send = () => {
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }

  ///
  
  // adding the function
  setColor = (color) => {
    this.setState({ color })
  }
  
  ///

  startGame = (e)=>{
    axios.get("http://localhost:4001/randomword").then(res=>{
      console.log(res);
      this.setState({word: res.data, startButton: false});
    });
    // console.log("hello")
    this.setState({startButton: false});
  };

  updatePlayerText = (e) =>{
    console.log(this.state.playerWord)
    if(stringValidation(this.state.word, e.target.value)){
      this.setState({playerWord: e.target.value}, ()=>{
        if(this.state.word.length === this.state.playerWord.length){
          this.setState({startButton: 'win'})
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
        <button onClick={this.startGame}>Start Game</button>
      </div>
    }else if(this.state.startButton === false){
      startButton = 
      <div>
        {this.state.word}
        <input type = "text" value = {this.state.playerWord} onChange = {this.updatePlayerText}/>
      </div>
    }else if(this.state.startButton === 'win'){
      startButton = 
      <div>
        You have completed the race!
      </div>
    }

    return (
      <div>
        {startButton}
      </div>
    )
  }
}
export default App;

