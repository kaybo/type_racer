import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {

  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:4001",
      
      ///
      color: 'white'
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

  render() {
    // testing for socket connections

    const socket = socketIOClient(this.state.endpoint);
    socket.on('change color', (col) => {
      document.body.style.backgroundColor = col
    })

    return (
      <div>
        test
      </div>
    )
  }
}
export default App;

// class App extends Component {

//   constructor() {
//     super();
//     this.state = {
//     };
//   }

//   this.activateLasers

//   render() {
//     return (
//       <div>
//         <button onClick={}>Start Game</button>
//       </div>
//     )
//   }
// }

// export default App;