import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth } from "../firebase";

function Login() {
  useEffect(() => {
    let links = document.querySelectorAll(".linkaso");
    let cursor = document.getElementById("cursor");

    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        cursor.classList.add("cursor-on-link");
      });
      link.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-on-link");
      });
    });
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [recovery, setRecovery] = useState(false);

  const singIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((auth) => {
        closeModal();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleEmailInput = (e) => {
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handlePasswordInput = (e) => {
    setValues({
      ...values,
      password: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      // It successfully created a new user with email and password
      .then((auth) => {
        if (auth) {
          closeModal();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const openChangePassword = () => {
    setRecovery(true);
  };

  const changePassword = (e) => {
    e.preventDefault();
    let email = document.querySelector("#email").value;
    console.log(email);
    auth
      .sendPasswordResetEmail(email)
      .then(() => alert("Recovery mail sent"))
      .catch((err) => alert(err.message));
  };

  const closeChangePassword = () => {
    setRecovery(false);
  };

  const closeModal = () => {
    document.querySelector(".overlay").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".overlay").style.display = "none";
    }, 100);
  };

  if (recovery) {
    return (
      <div className="overlay">
        <div className="overlay-back linkaso" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </div>
        <div className="login">
          <form>
            <div className="linkaso back">
              <i
                className="fas fa-chevron-circle-left recovery-back"
                onClick={closeChangePassword}
              ></i>
            </div>
            <div className="login-inputs">
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={values.email}
                  onChange={handleEmailInput}
                  required
                />
              </div>
            </div>
            <div className="login-sign-in">
              <button className="linkaso" onClick={changePassword}>
                Send recovery mail
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay">
      <div className="overlay-back linkaso" onClick={closeModal}>
        <i className="fas fa-times"></i>
      </div>
      <div className="login">
        <form>
          <div className="login-inputs">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={handleEmailInput}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={values.password}
                onChange={handlePasswordInput}
                required
              />
            </div>
          </div>
          <div className="login-button">
            <button type="submit" className="linkaso" onClick={singIn}>
              Login
            </button>
            <button className="recovery linkaso" onClick={openChangePassword}>
              I forgot my password :c
            </button>
          </div>
          <div className="login-sign-in linkaso">
            <button onClick={register}>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
