import React, { useState } from "react";
import { fire } from "../config/FireBase";
import { db } from "../config/FireBase";
import AdminPortal from "./AdminPortal";
import SignIn from "./AdminLogin";
import { LinearProgress } from "@material-ui/core";
function Authenticate() {
  const showSignInState = "showSignIn";
  const [loggedInUser, setUser] = useState(null);

  const checkForAdmin = (uid) => {
    return db
      .collection("Admin")
      .doc(uid)
      .get()
      .then((doc) => {
        return doc.data().admin;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      checkForAdmin(user.uid).then((isAdmin) => {
        if (isAdmin) {
          setUser(user);
        } else {
          setUser(showSignInState);
        }
      });
    } else {
      setUser(showSignInState);
    }
  });

  if (!loggedInUser) {
    return <LinearProgress />;
  }

  return <>{loggedInUser === showSignInState ? <SignIn /> : <AdminPortal />}</>;
}

export default Authenticate;
