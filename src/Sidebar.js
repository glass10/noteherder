import React from 'react'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import './Sidebar.css'
import NoteForm from './NoteForm'
import SignOut from './SignOut'

const Sidebar = ({signOut}) =>{
    return(
        <nav className="Sidebar">
        <div className="logo">
          <img src={quill} alt="Noteherder" />
        </div>
        <button className="new-note" onClick={NoteForm.addButton}>
          <img src={newHover} alt="New note" />
          <img className="outline" src={newIcon} alt="New note" />
        </button>
        <SignOut signOut={signOut} />
      </nav>
    )
}

export default Sidebar;