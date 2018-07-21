import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav'
import Post from './components/Post/Post'
import routes from './routes'

class App extends Component {
  render() {
    return (
      <div className="App">
      { routes }
        {/* <Nav /> */}
        <Post />
      </div>
    );
  }
}

export default App;
