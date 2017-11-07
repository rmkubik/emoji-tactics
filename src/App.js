import React, { Component } from 'react';
import {Game} from './Game.js'
import './App.css';
import './animate.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game height={15} width={10}/>
      </div>
    );
  }
}

export default App;
