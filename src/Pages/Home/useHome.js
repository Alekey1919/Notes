import { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firebase";
import { addNote, deleteNote, clearStore } from "../../Helper/Actions/actions";
import { useDispatch } from "react-redux";

const useHome = (notes) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isCursorOnLink, setIsCursorOnLink] = useState(false);
  const [cursorStyles, setCursorStyles] = useState();
  const refs = useRef([]);
  const dispatch = useDispatch();

  // CHECK

  let touch = matchMedia("(hover: none)").matches;

  useEffect(() => {
    window.addEventListener("resize", () => {
      touch = matchMedia("(hover: none)").matches;
    });

    window.addEventListener("mousemove", (e) => {
      if (!touch) {
        let x = e.clientX;
        let y = e.clientY;
        setCursorStyles({ left: `${x - 10}px`, top: `${y - 10}px` });
      }
    });
  }, []);

  // USER AUTH

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const handleAuthentication = () => {
    if (user && window.confirm("Are you sure you want to log out?")) {
      auth.signOut();
      dispatch(clearStore());
    }
  };

  // GET NOTES

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getNotes(user.email);
      } else if (localStorage.getItem("notes")) {
        dispatch(addNote(JSON.parse(localStorage.getItem("notes"))));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const getNotes = (email) => {
    db.collection(email)
      .get()
      .then((res) => {
        const innerNotes = [];
        res.docs.forEach((note) => {
          innerNotes.push(note.data());
        });
        setIsLoading(false);
        dispatch(addNote([...notes, ...innerNotes]));
      })
      .catch((err) => alert(err.message));
  };

  const activateCursor = () => {
    setIsCursorOnLink(true);
  };

  const deactivateCursor = () => {
    setIsCursorOnLink(false);
  };

  // HANDLING SIGN-IN MODAL

  const openModal = () => {
    setIsOverlayActive(true);
  };

  const closeModal = () => {
    setIsOverlayActive(false);
  };

  // ADD / DELETE / UPDATE NOTE

  const addToNotes = (newNote) => {
    dispatch(addNote([...notes, newNote]));
    if (user) {
      db.collection(user.email)
        .doc()
        .set(newNote)
        .then((res) => console.log("Note added"))
        .catch((err) => alert(err.message));
    } else {
      localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
    }
  };

  const deleteFromNotes = (id) => {
    dispatch(deleteNote(id));
    if (user) {
      db.collection(user.email)
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs[0].ref.delete();
        })
        .catch((err) => console.error(err.message));
    } else {
      localStorage.setItem(
        "notes",
        JSON.stringify(notes.filter((note) => note.id !== id))
      );
    }
  };

  // ADD TO REFS

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // SET USER

  const handleSetUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    if (!user && notes.length >= 1) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  return {
    user,
    isLoading,
    isOverlayActive,
    cursorStyles,
    isCursorOnLink,
    handleAuthentication,
    openModal,
    closeModal,
    addToNotes,
    deleteFromNotes,
    addToRefs,
    activateCursor,
    deactivateCursor,
    handleSetUser,
  };
};

export default useHome;
