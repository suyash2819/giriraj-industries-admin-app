import React, { useState } from "react";
import fire from "../config/FireBase";
import "../CSS/AdminPortal.css";
import RenderForm from "./RenderForm";

const AdminPortal = () => {
  const [showmenform, setShowMenForm] = useState(false);
  const [showwomenform, setShowWomenForm] = useState(false);
  const [showkidsform, setShowKidsForm] = useState(false);
  const [showcovidform, setShowCovidForm] = useState(false);

  const logout = () => {
    fire.auth().signOut();
  };

  const changeState = (category) => {
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
        {showmenform ? <RenderForm db="Men" /> : null}
        <button className="btn btn-primary" onClick={() => changeState("Men")}>
          Add Item
        </button>
      </div>
      <div className="Heading">
        <h1>Women</h1>
        {showwomenform ? <RenderForm db="Women" /> : null}
        <button
          className="btn btn-primary"
          onClick={() => changeState("Women")}
        >
          Add Item
        </button>
      </div>
      <div className="Heading">
        <h1>Kids</h1>
        {showkidsform ? <RenderForm db="Kids" /> : null}
        <button className="btn btn-primary" onClick={() => changeState("Kids")}>
          Add Item
        </button>
      </div>
      <div className="Heading">
        <h1>Covid</h1>
        {showcovidform ? <RenderForm db="Covid" /> : null}
        <button
          className="btn btn-primary"
          onClick={() => changeState("Covid")}
        >
          Add Item
        </button>
      </div>
      <hr></hr>
      <center>
        <button className="btn btn-primary" onClick={logout}>
          LogOut
        </button>
      </center>
    </>
  );
};

export default AdminPortal;
