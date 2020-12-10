import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

export default function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((result) => {
            dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
            });

            localStorage.setItem("user", JSON.stringify(result.user));
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}
