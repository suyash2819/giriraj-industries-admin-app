import React, { useState } from "react";
import { fire } from "../config/FireBase";
import { db } from "../config/FireBase";
import AdminPortal from "./AdminPortal";
import SignIn from "./AdminLogin";
import { LinearProgress } from "@material-ui/core";
function Authenticate() {
  const showSignInState = "showSignIn";
  const [user, setUser] = useState(null);
  const [adminid, setAdminid] = useState();

  db.collection("Admin")
    .doc("BuBAGFQmzDqsYoo7uB9i")
    .get()
    .then((doc) => {
      setAdminid(doc.data().id);
    })
    .catch((err) => {
      console.log(err);
    });

  fire.auth().onAuthStateChanged((user) => {
    if (user && adminid === user.uid) {
      setUser(user);
    } else {
      setUser(showSignInState);
    }
  });

  if (!user) {
    return <LinearProgress />;
  }

  return <>{user === showSignInState ? <SignIn /> : <AdminPortal />}</>;
}

export default Authenticate;
