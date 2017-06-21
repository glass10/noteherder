import React, { Component } from 'react'
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types'; // ES6

import './NoteForm.css'

class NoteForm extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createValueFromString(this.props.currentNote.body, 'html')
  }

  componentWillReceiveProps(nextProps) {
    const newId = nextProps.match.params.id

    if (newId !== this.props.currentNote.id) {
      const note = nextProps.notes[newId]
      if (note) {
        this.props.setCurrentNote(note)
      }
    }
  }

  handleChanges = (ev) => {
    const note = {...this.props.currentNote}
    note[ev.target.name] = ev.target.value
    this.props.saveNote(note)
  }

  handleRemove = (ev) => {
    this.props.removeNote(this.props.currentNote)
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

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
          <p>
            <textarea
              name="body"
              placeholder="Just start typing..."
              onChange={this.handleChanges}
              value={this.props.currentNote.body}
            ></textarea>
          </p>
          <div>
          {/*<Editor editorState={this.props.currentNote.body} onChange={this.handleChanges} />*/}
          <RichTextEditor
            value={RichTextEditor.createValueFromString(this.props.currentNote.body, 'html')}
            onChange={this.onChange}
          />
          </div>
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