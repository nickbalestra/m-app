import React from "react";
import { connect } from "react-redux";

import { doLogin } from "../../../stores/ducks/auth";
import { setEmail, setPassword } from "../../../stores/ducks/user";

const mapStateToProps = state => ({
  ...state.user,
  ...state.auth
});

const mapDispatchToProps = (dispatch, props) => ({
  handleSubmit({ email, password }) {
    return event => {
      event.preventDefault();
      dispatch(doLogin(email, password));
    };
  },
  handleInputChange({ target }) {
    switch (target.name) {
      case "email":
        return dispatch(setEmail(target.value));
      case "password":
        return dispatch(setPassword(target.value));
    }
  }
});

const Login = ({
  email,
  password,
  handleSubmit,
  handleInputChange,
  error,
  inProgress
}) => (
  <div className="Login">
    <div className="login-group">
      <form onSubmit={handleSubmit({ email, password })}>
        <label>
          <input
            name="email"
            onInput={handleInputChange}
            placeholder="email"
            value={email}
          />
        </label>
        <label>
          <input
            name="password"
            type="password"
            onInput={handleInputChange}
            placeholder="password"
            value={password}
          />
        </label>
        <button type="submit">Login</button>
        {error && <p className="msg">😞 Bad login information</p>}
        {inProgress && <p className="msg">....</p>}
      </form>
    </div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
