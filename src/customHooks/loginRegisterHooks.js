import { useState } from "react";
import CONFIG_CONSTANTS from "../constants/configConstants";
import { useDispatch } from "react-redux";
import { loginOrRegister } from "../screens/Login/services/loginAction";
import { useHistory } from "react-router-dom";

/**
 * Reusable code for login and register logic.
 * @param {*} infinite
 * @returns
 */
export const LoginRegisterHooks = (action) => {
  let history = useHistory();
  let [state, setState] = useState({ errorMsg: "", email: "", password: "" });
  let dispatch = useDispatch();
  const onLoginRegister = (e) => {
    e.preventDefault();
    if (CONFIG_CONSTANTS.EMAIL_REGEX.test(state.email)) {
      dispatch(loginOrRegister({ ...state, action, history }));
    } else {
      setState((prevState) => ({
        ...prevState,
        errorMsg: "Email is not Valid",
      }));
    }
  };

  const onFormChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      errorMsg: "",
    }));
  };

  return [state, onLoginRegister, onFormChange];
};
