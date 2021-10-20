import React, { useState } from "react";
import "./AddNote.css";

function AddNote(props) {
  const today = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [values, setValues] = useState({
    title: "",
    description: "",
    date: today,
    id: "",
  });

  const handleTitleInput = (e) => {
    setValues({
      ...values,
      title: e.target.value,
    });
  };

  const handleDescriptionInput = (e) => {
    setValues({
      ...values,
      description: e.target.value,
    });
  };

  // ADD NOTE

  const addNote = () => {
    if (values.title !== "" && values.description !== "") {
      let newNote = values;
      newNote.id = new Date().toLocaleDateString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      props.addNote(newNote);
      setValues({
        title: "",
        description: "",
        date: today,
        id: "",
      });
    } else {
      alert("You need to complete both entries");
    }
  };

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
      <button className="note-delete add-note-delete link" onClick={addNote}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}

export default AddNote;
