import React from "react";
import "./Login.css";
import useLogin from "./useLogin";

const Login = ({
  isOverlayActive,
  closeModal,
  activateCursor,
  deactivateCursor,
  setUser,
}) => {
  const {
    values,
    recovery,
    singIn,
    handleEmailInput,
    handlePasswordInput,
    register,
    openChangePassword,
    changePassword,
    closeChangePassword,
  } = useLogin({ closeModal, setUser });

  if (recovery) {
    return (
      <div className="overlay recovery">
        <div className="overlay-back" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </div>
        <div className="login">
          <form>
            <div className="back">
              <i
                className="fas fa-chevron-circle-left recovery-back"
                onClick={closeChangePassword}
                onMouseEnter={activateCursor}
                onMouseLeave={deactivateCursor}
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
              <button
                onClick={changePassword}
                onMouseEnter={activateCursor}
                onMouseLeave={deactivateCursor}
              >
                Send recovery mail
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`overlay ${isOverlayActive ? "active" : ""}`}>
      <div
        className="overlay-back"
        onClick={closeModal}
        onMouseEnter={activateCursor}
        onMouseLeave={deactivateCursor}
      >
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
            <button
              type="submit"
              onClick={singIn}
              onMouseEnter={activateCursor}
              onMouseLeave={deactivateCursor}
            >
              Login
            </button>
            <button
              className="recovery"
              onClick={openChangePassword}
              onMouseEnter={activateCursor}
              onMouseLeave={deactivateCursor}
            >
              I forgot my password :c
            </button>
          </div>
          <div
            className="login-sign-in"
            onMouseEnter={activateCursor}
            onMouseLeave={deactivateCursor}
          >
            <button onClick={register}>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
