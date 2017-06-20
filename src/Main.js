import React from 'react'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
  return (
    <div className="Main">
      <Sidebar signOut={props.signOut}/>
      <NoteList
        notes={props.notes}
        setCurrentNoteId={props.setCurrentNoteId}
      />
      <NoteForm {...props} />
    </div>
  )
}

export default Main