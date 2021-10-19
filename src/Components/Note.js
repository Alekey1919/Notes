import React from "react";
import "./Note.css";

function Note(props) {
  const handleDelete = () => {
    props.deleteNote(props.id);
  };

  return (
    <div className="note" id={props.id}>
      <h1>{props.title}</h1>
      <p className="note-description">{props.description}</p>
      <p className="note-date">{props.date}</p>
      <button className="note-delete link" onClick={handleDelete}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  );
}

export default Note;
