import React, { Component } from 'react'
import './NoteForm.css'
import NoteList from './NoteList'

// let currentNote = NoteList.test();
let self = this;
class NoteForm extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            body: ''
        }
        self = this;
        this.handleEdit = this.handleEdit.bind(this);
    }

    static update(ev){
        const id = ev.currentTarget.id;
        const currentNotes = NoteList.getNotes();
        let title = '';
        let body = '';
        for(var i = 0; i < currentNotes.length; i++){
            if(currentNotes[i].body === id){
                title = currentNotes[i].title;
                body = currentNotes[i].body;
                break;
            }
        }
        self.updateState(title, body);
    }

    updateState(title, body){
        const state = {...this.state};
        state.title = title;
        state.body = body;
        this.setState(state);
    }

    handleEdit(ev){
        // ev.currentTarget.value = 'lol u thought';
        const name = ev.target.name;
        if(name === "title")
            this.setState({title: ev.target.value});
        else
            this.setState({body: ev.target.value});
        ev.preventDefault();
    }

    render(){
        return(
            <div className="NoteForm">
                <form>
                <p>
                    <input onChange={this.handleEdit} ref="title" type="text" name="title" placeholder="Title your note" value={this.state.title}/>
                </p>
                <p>
                    <textarea onChange={this.handleEdit} name="body" cols="30" rows="10" placeholder="Just start typing..." value={this.state.body}>
                    </textarea>
                </p>
                </form>
            </div>
        )
    }
}

export default NoteForm;