import React, { useEffect, useState } from "react";
// import NotesList from "../Components/NotesList";
import Note from "../Components/Note";
import AddNote from "../Components/AddNote.js";
import "./Home.css";
import Login from "../Components/Login";
import Loading from "../images/Loading.gif";
import { auth, db } from "../firebase";

function Home() {
  const [loading, setLoading] = useState(true);

  // USER AUTH

  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  const handleAuthentication = () => {
    if (user && window.confirm("Are you sure you want to log out?")) {
      auth.signOut();
      setNotes([]);
    }
  };

  // GET NOTES

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        getNotes(user.email);
      } else {
        setLoading(false);
      }
    });
  }, [user]);

  const getNotes = (email) => {
    db.collection(email)
      .get()
      .then((res) => {
        const innerNotes = [];
        res.docs.forEach((note) => {
          innerNotes.push(note.data());
        });
        setNotes(innerNotes);
        setLoading(false);
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    setTimeout(() => {
      let links = document.querySelectorAll(".link");
      let cursor = document.getElementById("cursor");

      links.forEach((link) => {
        link.addEventListener("mouseover", () => {
          cursor.classList.add("cursor-on-link");
        });
        link.addEventListener("mouseout", () => {
          cursor.classList.remove("cursor-on-link");
        });
      });
    }, 200);
  }, [notes]);

  const openModal = () => {
    document.querySelector(".overlay").style.display = "block";
    setTimeout(() => {
      document.querySelector(".overlay").style.opacity = "1";
    }, 100);
  };

  // ADD / DELETE / UPDATE NOTE

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
    if (user) {
      console.log(newNote);
      db.collection(user.email)
        .doc()
        .set(newNote)
        .then((res) => console.log("Note added"))
        .catch((err) => alert(err.message));
    }
  };

  const deleteNote = (id) => {
    if (user) {
      db.collection(user.email)
        .where("id", "==", id)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs[0].ref.delete();
        })
        .catch((err) => console.log(err.message));
    }

    document.getElementById(id).style.display = "none";
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={Loading} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="home">
      {user ? (
        <div className="home-login logged">
          <div>
            Hi,
            <small className="user-name">
              {user?.email.substr(0, user.email.indexOf("@"))}
            </small>
          </div>
          <button onClick={handleAuthentication} className="log-out link">
            Log out
          </button>
        </div>
      ) : (
        <button className="home-login link" onClick={openModal}>
          Log In
        </button>
      )}

      <h1>Notes</h1>
      <div className="notes-list">
        {notes?.map((note, key) => {
          return (
            <Note
              key={key}
              title={note.title}
              description={note.description}
              id={note.id}
              date={note.date}
              deleteNote={deleteNote}
            />
          );
        })}
        <AddNote addNote={addNote} />
        <Login />
      </div>
    </div>
  );
}

export default Home;
