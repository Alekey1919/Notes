import React from "react";
import Note from "../../Components/Note/Note";
import NewNote from "../../Components/NewNote/NewNote";
import "./Home.css";
import Login from "../../Components/Login/Login";
import Loading from "../../images/Loading.gif";
import useHome from "./useHome";
import { connect } from "react-redux";
import { act } from "@testing-library/react";

const Home = ({ notes }) => {
  const {
    user,
    isLoading,
    isOverlayActive,
    isCursorOnLink,
    cursorStyles,
    handleAuthentication,
    openModal,
    closeModal,
    addToNotes,
    deleteFromNotes,
    addToRefs,
    activateCursor,
    deactivateCursor,
    handleSetUser,
  } = useHome(notes);

  if (isLoading) {
    return (
      <div className="loading">
        <img src={Loading} alt="Loading" />
      </div>
    );
  }

  return (
    <div className="home">
      <div
        style={cursorStyles}
        className={`cursor ${isCursorOnLink ? "cursor-on-link" : ""}`}
      ></div>
      {user ? (
        <div className="home-login logged">
          <div>
            Hi,
            <small className="user-name">
              {user?.email.substr(0, user.email.indexOf("@"))}
            </small>
          </div>
          <button
            onClick={handleAuthentication}
            className="log-out"
            onMouseEnter={activateCursor}
            onMouseLeave={deactivateCursor}
          >
            Log out
          </button>
        </div>
      ) : (
        <button
          className="home-login"
          onClick={openModal}
          onMouseEnter={activateCursor}
          onMouseLeave={deactivateCursor}
        >
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
              deleteNote={deleteFromNotes}
              activateCursor={activateCursor}
              deactivateCursor={deactivateCursor}
              ref={addToRefs}
            />
          );
        })}
        <NewNote
          addNote={addToNotes}
          activateCursor={activateCursor}
          deactivateCursor={deactivateCursor}
        />
        <Login
          isOverlayActive={isOverlayActive}
          closeModal={closeModal}
          activateCursor={activateCursor}
          deactivateCursor={deactivateCursor}
          setUser={handleSetUser}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state,
  };
};

export default connect(mapStateToProps)(Home);
