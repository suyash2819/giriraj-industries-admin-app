import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Orders from "./Orders";
import Authenticate from "./Authenticate";
import { fire } from "../config/FireBase";
import { db } from "../config/FireBase";

const Navigate = () => {
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
  useEffect(() => {
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
  });

  return (
    <>
      <Route
        exact
        path="/"
        render={() => <Authenticate loggedInUser={loggedInUser} />}
      />
      <Route exact path="/orders" component={Orders} />
    </>
  );
};
export default Navigate;
