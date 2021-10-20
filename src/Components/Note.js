import React, { useState } from "react";
import "./Note.css";
import "./AddNote.css";
import { db, auth } from "../firebase";

function Note(props) {
  const handleDelete = () => {
    props.deleteNote(props.id);
  };

  // UPDATE

  const [values, setValues] = useState({
    title: "",
    description: "",
    date: "",
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

  const displayToggler = () => {
    document.getElementById(props.id).childNodes[0].style.display = "none";
    document.getElementById(props.id).childNodes[1].style.display = "none";
    document.getElementById(props.id).childNodes[3].style.display = "flex";
    document.getElementById(props.id).childNodes[4].style.display = "flex";
    document.getElementById(props.id).childNodes[5].style.display = "block";
    document.getElementById(props.id).childNodes[6].style.display = "block";
    document.getElementById(props.id).childNodes[7].style.display = "none";
    document.getElementById(props.id).childNodes[8].style.display = "none";
  };

  const displayTogglerCancel = () => {
    document.getElementById(props.id).childNodes[0].style.display = "block";
    document.getElementById(props.id).childNodes[1].style.display = "block";
    document.getElementById(props.id).childNodes[3].style.display = "none";
    document.getElementById(props.id).childNodes[4].style.display = "none";
    document.getElementById(props.id).childNodes[5].style.display = "none";
    document.getElementById(props.id).childNodes[6].style.display = "none";
    document.getElementById(props.id).childNodes[7].style.display = "block";
    document.getElementById(props.id).childNodes[8].style.display = "block";
  };

  const handleUpdate = (e) => {
    displayToggler();
    let parentNode = document.getElementById(props.id);

    // TITLE & DESCRIPTION & DATE //

    let titleNode = parentNode.childNodes[0];
    let titleText = titleNode.innerText;
    let descriptionText = parentNode.childNodes[1].innerText;
    let date = new Date().toLocaleDateString(undefined, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setValues({ title: titleText, description: descriptionText, date: date });

    // BUTTONS //

    // Cancel

    parentNode.childNodes[5].addEventListener("click", () => {
      displayTogglerCancel();
    });

    // Update

    parentNode.childNodes[6].addEventListener("click", () => {
      parentNode.childNodes[0].innerText =
        parentNode.childNodes[3].firstChild.value;
      parentNode.childNodes[1].innerText =
        parentNode.childNodes[4].firstChild.value;
      parentNode.childNodes[2].innerText = date;
      displayTogglerCancel();

      auth.onAuthStateChanged((user) => {
        if (user) {
          db.collection(user.email)
            .where("id", "==", props.id)
            .get()
            .then((querySnapshot) => {
              querySnapshot.docs[0].ref.update({
                title: parentNode.childNodes[3].firstChild.value,
                description: parentNode.childNodes[4].firstChild.value,
                date: date,
              });
            })
            .catch((err) => console.log(err.message));
        }
      });
    });
  };

  return (
    <div className="note" id={props.id}>
      <h1 className="note-title">{props.title}</h1>
      <p className="note-description">{props.description}</p>
      <p className="note-date">{props.date}</p>
      <div className="add-note-title original ">
        <input
          type="text"
          placeholder="Title"
          value={values.title}
          onChange={handleTitleInput}
          required
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
        />
      </div>
      <div className="add-note-description original">
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
      <button className="note-cancel-update link none">
        <i className="fas fa-times"></i>
      </button>
      <button className="note-do-update link none">
        <i className="fas fa-check"></i>
      </button>
      <button className="note-update link" onClick={handleUpdate}>
        <i className="fas fa-pen-fancy"></i>
      </button>
      <button className="note-delete link" onClick={handleDelete}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  );
}

export default Note;
