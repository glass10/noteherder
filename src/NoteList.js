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
let self = this;

class NoteList extends Component{
    constructor(){
        super();
        this.state = {
            currentNote: '',
            notes: testNotes
        }
        this.deleteNote = this.deleteNote.bind(this);
        self = this;
    }

    deleteNote(ev){
        for(var i = 0; i < testNotes.length; i++) {
            if(testNotes[i].title === ev.currentTarget.id) 
                testNotes.splice(i,1);

                const state = {...this.state};
                state.notes = testNotes;
                this.setState(state);
        }
    }
    updateState(){
        console.log("lol");
    }

    render(){
        return(
            <div className="NoteList">
                <h3>Notes</h3>
                {this.loopThrough}
                <ul id="notes">
                    {testNotes.map((note, i) => <NoteItem note={note} key = {i}/>, () => this.updateState())}
                </ul>
        </div>
        )
    }
}
function NoteItem(props){
        return(
            <li>
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