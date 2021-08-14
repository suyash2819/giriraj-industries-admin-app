import React, { useEffect, useState } from "react";
import AdminPortal from "./AdminPortal";
import SignIn from "./AdminLogin";
import { LinearProgress } from "@material-ui/core";

function Authenticate(props) {
  const { loggedInUser } = props;

  if (!loggedInUser) {
    return <LinearProgress />;
  }

  return <>{loggedInUser === "showSignIn" ? <SignIn /> : <AdminPortal />}</>;
}

export default Authenticate;
