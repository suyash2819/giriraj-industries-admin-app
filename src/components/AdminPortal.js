import React, { useState } from "react";
import { fire } from "../config/FireBase";
import "../CSS/AdminPortal.css";
import RenderForm from "./RenderForm";
import Button from "@material-ui/core/Button";

const AdminPortal = () => {
  const [ShowMenForm, setShowMenForm] = useState(false);
  const [ShowWomenForm, setShowWomenForm] = useState(false);
  const [ShowKidsForm, setShowKidsForm] = useState(false);
  const [ShowCovidForm, setShowCovidForm] = useState(false);

  const logout = () => {
    fire.auth().signOut();
  };

  const updateState = (category) => {
    if (category === "Men") {
      setShowMenForm(true);
    } else if (category === "Women") {
      setShowWomenForm(true);
    } else if (category === "Kids") {
      setShowKidsForm(true);
    } else if (category === "Covid") {
      setShowCovidForm(true);
    }
  };

  return (
    <>
      <div className="Heading">
        <h1>Men</h1>
        {ShowMenForm ? <RenderForm db="Men" /> : null}
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={() => updateState("Men")}
        >
          Add Item
        </Button>
      </div>
      <div className="Heading">
        <h1>Women</h1>
        {ShowWomenForm ? <RenderForm db="Women" /> : null}
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={() => updateState("Women")}
        >
          Add Item
        </Button>
      </div>
      <div className="Heading">
        <h1>Kids</h1>
        {ShowKidsForm ? <RenderForm db="Kids" /> : null}
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={() => updateState("Kids")}
        >
          Add Item
        </Button>
      </div>
      <div className="Heading">
        <h1>Covid</h1>
        {ShowCovidForm ? <RenderForm db="Covid" /> : null}
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={() => updateState("Covid")}
        >
          Add Item
        </Button>
      </div>
      <hr></hr>
      <center>
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={logout}
        >
          LogOut
        </Button>
      </center>
    </>
  );
};

export default AdminPortal;
