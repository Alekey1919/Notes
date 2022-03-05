import { useState } from "react";
import { db, auth } from "../../firebase";
import { updateNote } from "../../Helper/Actions/actions";
import { useDispatch } from "react-redux";

const useNote = ({ deleteNote, id, title, description, date }) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    deleteNote(id);
  };

  const newDate = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleEdit = (wasUpdated) => {
    if (isEditActive && !wasUpdated) {
      setValues({ title, description, date });
    } else {
      setValues({ ...values, date: newDate });
    }
    setIsEditActive((curr) => !curr);
  };

  // UPDATE

  const [values, setValues] = useState({
    title,
    description,
    date,
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

  const handleUpdate = () => {
    dispatch(
      updateNote({
        title: values.title,
        description: values.description,
        date: values.date,
        id,
      })
    );

    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection(user.email)
          .where("id", "==", id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs[0].ref.update({
              title: values.title,
              description: values.description,
              date: newDate,
            });
          })
          .catch((err) => console.error(err.message));
      }
    });

    handleEdit(true);
  };

  return {
    values,
    isEditActive,
    handleDelete,
    handleTitleInput,
    handleDescriptionInput,
    handleUpdate,
    handleEdit,
  };
};

export default useNote;
