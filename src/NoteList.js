import React, { Component } from 'react'
import './NoteList.css'
import NoteForm from './NoteForm'



const noteData = JSON.parse(localStorage.getItem("notes"));


let self = this;

class NoteList extends Component{
    constructor(){
        super();
        this.state = {
            currentNote: '',
            notes: noteData
        }
        this.deleteNote = this.deleteNote.bind(this);
        this.updateNotes = this.updateNotes.bind(this);
        self = this;
    }
    static getNotes(){
        return noteData;
    }
    static addNote(){
        const note = {title: 'Title your note', body:'Just start typing...'};
        noteData.unshift(note);
        self.updateNotes();
    }
    static setNoteTitle(i, title){
        noteData[i].title = title;
        self.updateNotes();
    }
    static setNoteBody(i, body){
        noteData[i].body = body;
        self.updateNotes();
    }


    deleteNote(ev){
        for(var i = 0; i < noteData.length; i++) {
            if(noteData[i].title === ev.currentTarget.id) 
                noteData.splice(i,1);
                this.updateNotes();
        }
    }

    updateNotes(){
        localStorage.setItem("notes", JSON.stringify(noteData));
        const state = {...this.state};
        state.notes = noteData;
        this.setState(state);
    }

    render(){
        return(
            <div className="NoteList">
                {this.updateNotes}
                <h3>Notes</h3>
                <ul id="notes">
                    {noteData.map((note, i) => <NoteItem note={note} key = {i}/>)}
                </ul>
        </div>
        )
    }
}
function NoteItem(props){
        return(
            <li id={props.note.body} onClick={NoteForm.updateForm}>
                <button className="button" 
                    id={props.note.title}
                    onClick={self.deleteNote}>
                        <i className="fa fa-trash fa-2x" aria-hidden="true"></i>
                    </button>
                <div className="note">
                    <div className="note-title">{props.note.title}</div>
                    <div className="note-body"><p>{props.note.body}</p></div>
                </div>
            </li>
        )
    }

export default NoteList;