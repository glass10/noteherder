import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import './NoteForm.css'
import './quill.snow.css'

//const ReactQuill = require('react-quill');
class NoteForm extends Component {
  componentWillReceiveProps(nextProps) {
    const newId = nextProps.match.params.id

    if (newId) {
      if (newId !== this.props.currentNote.id) {
        const note = nextProps.notes[newId]
        if (note) {
          this.props.setCurrentNote(note)
        } else if (Object.keys(nextProps.notes).length > 0) {
          this.props.history.push('/notes')
        }
      }
    } else if (this.props.currentNote.id) {
      this.props.resetCurrentNote()
    }
  }

  handleChanges = (ev) => {
    const note = {...this.props.currentNote}
    note[ev.target.name] = ev.target.value
    this.props.saveNote(note)
  }

  handleChange = (value) =>{
    console.log(value);
    const note = {...this.props.currentNote}
    note["body"] =  value;
    this.props.saveNote(note);
    this.forceUpdate();
  }

  handleRemove = (ev) => {
    this.props.removeNote(this.props.currentNote)
  }
  
  render() {
    return (
      <div className="NoteForm">
        <form>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title your note"
              onChange={this.handleChanges}
              value={this.props.currentNote.title}
            />
          </p>
          <ReactQuill 
              id="body"
              //placeholder="Just start typing..."
              defaultValue={this.props.currentNote.body}
              onChange={this.handleChange}
              ref = "BodyInput"
          />
          <button
           type="button"
           onClick={this.handleRemove}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default NoteForm