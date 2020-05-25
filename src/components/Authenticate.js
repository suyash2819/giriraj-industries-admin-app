import React, { useState } from "react";
import fire from "../config/FireBase";
import AdminPortal from "./AdminPortal";
import SignIn from "./AdminLogin";

function Authenticate() {
  const [user, setUser] = useState(null);

  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });

  return <>{user ? <AdminPortal /> : <SignIn />}</>;
}

export default Authenticate;
