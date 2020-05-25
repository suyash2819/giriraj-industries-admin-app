import React, { useState } from "react";
import fire from "../config/FireBase";
import AdminPortal from "./AdminPortal";
import SignIn from "./AdminLogin";
import { LinearProgress } from '@material-ui/core';

function Authenticate() {
  const showSignInState = 'showSignIn';
  const [user, setUser] = useState(null);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(showSignInState);
    }
  });


  if (!user) {
    return <LinearProgress  />
  }

  return <>{user === showSignInState ? <SignIn /> : <AdminPortal />}</>;
}

export default Authenticate;
