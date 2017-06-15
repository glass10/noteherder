import React, { Component } from 'react'
import './NoteList.css'

const testNotes = [
    {
        title: "Citizens of distant epochs",
        body: "Sea of Tranquility the ash of stellar alchemy vastness is bearable only through love bits of moving fluff are creatures of the cosmos, consciousness a still more glorious dawn awaits two ghostly white figures in coveralls and helmets are soflty dancing tingling of the spine, concept of the number one brain is the seed of intelligence are creatures of the cosmos?"
    },
    {
        title: "Preserve and cherish that pale blue dot ",
        body: "network of wormholes a billion trillion the only home we've ever known light years dream of the mind's eye. Intelligent beings!"
    },
    {
        title: "Laws of physics",
        body: "Cambrian explosion radio telescope, circumnavigated citizens of distant epochs brain is the seed of intelligence two ghostly white figures in coveralls and helmets are soflty dancing galaxies inconspicuous motes of rock and gas"
    }
]
class NoteList extends Component{
    constructor(){
        super();
        this.state = {
            currentNote: '',
            notes: testNotes
        }
    }

    deleteNote(id){
        console.log("This is working!");
        console.log(id);
    }
    render(){
        return(
            <div className="NoteList">
                <h3>Notes</h3>
                <ul id="notes">
                    {this.state.notes.map((note, i) => <NoteItem note={note} key = {i}/>)}
                </ul>
        </div>
        )
    }
}

function NoteItem(props){
    return(
        <li>
            <button className="button" id={props.note.title}><i className="fa fa-trash fa-2x" aria-hidden="true" onClick={this.deleteNote.bind(this)}></i></button>
            <div className="note">
                <div className="note-title">{props.note.title}</div>
                <div className="note-body"><p>{props.note.body}</p></div>
            </div>
        </li>
    )
}

NoteList noteList = new NoteList();

export default NoteList;