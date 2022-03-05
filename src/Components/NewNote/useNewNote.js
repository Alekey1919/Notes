import { useState } from "react";

const useNewNote = ({ addNote }) => {
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

  const addToNotes = () => {
    if (values.title !== "" && values.description !== "") {
      let newNote = values;
      newNote.id = new Date().toLocaleDateString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      addNote(newNote);
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

  return {
    values,
    today,
    handleTitleInput,
    handleDescriptionInput,
    addToNotes,
  };
};

export default useNewNote;
