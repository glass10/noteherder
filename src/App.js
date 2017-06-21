import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import Main from './Main'
import SignIn from './SignIn'
import base, { auth } from './base'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      uid: null,
      currentNoteId: null,
    }
  }

  componentWillMount() {
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          this.authHandler(user)
        } else {
          // finished signing out
          this.setState({ uid: null })
        }
      }
    )
  }

  getUserFromLocalStorage(){
    const uid = localStorage.getItem('uid');
    if (!uid) return;
    this.setState({ uid })
  }

  syncNotes = () => {
    this.ref = base.syncState(
      `${this.state.uid}/notes`,
      {
        context: this,
        state: 'notes',
      }
    )
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = `note-${Date.now()}`
      this.setCurrentNoteId(note.id)
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
    this.setState({ notes })
  }

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (user) => {
    localStorage.setItem('uid', user.uid)
    this.setState(
      { uid: user.uid },
      this.syncNotes
    )
  }

  stopSyncing = () =>{
    if(this.ref){
      base.removeBinding(this.ref);
    }
  }

  signOut = () => {
    auth
      .signOut()
      .then(
        () => {
          this.stopSyncing()
          this.setState({ notes: {}, currentNoteId: null})
        }
      )
  }

  setCurrentNoteId = (noteId) => {
    this.setState({ currentNoteId: noteId })
  }


  render() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNoteId: this.setCurrentNoteId,
      signOut: this.signOut,
    }
    const noteData = {
      notes: this.state.notes,
      currentNoteId: this.state.currentNoteId,
    }
    return (
      <div className="App">
        <Switch>
          <Route path="/notes" render={() => (
            this.signedIn() 
              ?<Main
                {...noteData}
                {...actions}
              />
              : <Redirect to="/sign-in" />
          )} />
          <Route path="/sign-in" render={() =>(
            !this.signedIn()
              ? <SignIn />
              : <Redirect to="/notes" />
          )} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
      </div>
    )
  }
}

export default App;