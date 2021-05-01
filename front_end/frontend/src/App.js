import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const axios = require("axios");

class App extends Component {

  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4001",
      
      ///
      color: 'white',
      word: ""
      ///
      
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
      this.setState({word: res});
    });
  };

  render() {
    // testing for socket connections

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })

    return (
      <div>
        <button onClick={this.startGame}>Start Game</button>
      </div>
    )
  }
}
export default App;

