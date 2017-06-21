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
    this.setState(
      { uid: user.uid },
      this.syncNotes
    )
  }

  signOut = () => {
    auth
      .signOut()
      .then(
        () => {
          // stop syncing with Firebase
          base.removeBinding(this.ref)
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
            <Main
              {...noteData}
              {...actions}
            />
          )} />
          <Route path="/sign-in" component={SignIn} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
        {/*{ this.signedIn() ? this.renderMain() : <SignIn /> }*/}
      </div>
    )
  }
}

export default App;