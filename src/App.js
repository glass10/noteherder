import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import base from './base'
import NoteList from './NoteList'
import SignIn from './SignIn'
import SignOut from './SignOut'

class App extends Component {

  signedIn = () =>{
    return true;
  }

  renderMain = () =>{
    return(
      <div>
        <SignOut />
        <Main />
      </div>
    )

  }
  render() {
    return (
      <div className="App">
        {this.signedIn ? this.renderMain() : <SignIn />}
      </div>
    )
  }

  componentWillMount(){
    base.syncState(
      'notes',
      {
        context: this,
        state: 'NoteList.state.notes'
      }
    );
  }
}

export default App;
