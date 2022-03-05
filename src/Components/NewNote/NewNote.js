import React from "react";
import "./NewNote.css";
import useNewNote from "./useNewNote";

const NewNote = ({ addNote, activateCursor, deactivateCursor }) => {
  const {
    values,
    handleTitleInput,
    handleDescriptionInput,
    addToNotes,
    today,
  } = useNewNote({ addNote });

  return (
    <div className="note add-note">
      <div className="add-note-title">
        <input
          type="text"
          id="add-note-title"
          placeholder="Title"
          value={values.title}
          onChange={handleTitleInput}
          required
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        />
      </div>
      <div className="add-note-description">
        <textarea
          name="add-note-description"
          id="add-note-description"
          placeholder="Description"
          value={values.description}
          onChange={handleDescriptionInput}
          cols="30"
          rows="10"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        ></textarea>
      </div>
      <p className="note-date">{today}</p>
      <button
        className="note-delete add-note-delete"
        onClick={addToNotes}
        onMouseEnter={activateCursor}
        onMouseLeave={deactivateCursor}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default NewNote;
