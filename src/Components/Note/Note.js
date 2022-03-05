import React, { forwardRef } from "react";
import "./Note.css";
import useNote from "./useNote";

const Note = forwardRef(
  (
    {
      title,
      description,
      id,
      date,
      deleteNote,
      activateCursor,
      deactivateCursor,
    },
    ref
  ) => {
    const {
      values,
      isEditActive,
      handleDelete,
      handleTitleInput,
      handleDescriptionInput,
      handleUpdate,
      handleEdit,
    } = useNote({ deleteNote, id, title, description, date });

    return (
      <div className="note" id={id} ref={ref}>
        {!isEditActive ? (
          <>
            <h1 className="note-title">{title}</h1>
            <p className="note-description">{description}</p>
            <button
              className="note-update"
              onMouseEnter={activateCursor}
              onMouseLeave={deactivateCursor}
              onClick={() => handleEdit(false)}
            >
              <i className="fas fa-pen-fancy"></i>
            </button>
            <button
              className="note-delete "
              onClick={handleDelete}
              onMouseEnter={activateCursor}
              onMouseLeave={deactivateCursor}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </>
        ) : (
          <>
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
            <button
              className="note-cancel-update"
              onClick={() => handleEdit(false)}
              onMouseEnter={activateCursor}
              onMouseLeave={deactivateCursor}
            >
              <i className="fas fa-times"></i>
            </button>
            <button
              className="note-do-update"
              onClick={handleUpdate}
              onMouseEnter={activateCursor}
              onMouseLeave={deactivateCursor}
            >
              <i className="fas fa-check"></i>
            </button>
          </>
        )}

        <p className="note-date">{values.date}</p>
      </div>
    );
  }
);

export default Note;
