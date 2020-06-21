import React, { useState } from "react";
import { fire } from "../config/FireBase";
import "../CSS/AdminPortal.css";
import RenderForm from "./ItemDisplayForm";
import Button from "@material-ui/core/Button";
import { sections } from "./data";

const initialFormValue = {
  [sections.men]: false,
  [sections.women]: false,
  [sections.kids]: false,
  [sections.covid]: false,
};

const AdminPortal = () => {
  const [showForms, setShowForms] = useState(initialFormValue);
  const sectionArray = [
    { title: sections.men, val: sections.men },
    { title: sections.women, val: sections.women },
<<<<<<< HEAD
    { title: sections.kids, val: sections.kids },
    { title: sections.covid, val: sections.covid },
=======
     { title: sections.kids, val: sections.kids },
    { title: sections.covid, val: sections.covid },
    { title: "Kids", val: sections.kids },
    { title: "Covid", val: sections.covid },
>>>>>>> 6633f9aa368ed41d4827c5dda2b7b379cc02f1a5
  ];

  const logout = () => {
    fire.auth().signOut();
  };

  const updateState = (category) => {
    let obj = { ...showForms };
    obj[category] = true;
    console.log(obj);
    setShowForms(obj);
  };

  return (
    <>
      {sectionArray.map((section, index) => {
        return (
          <div className="Heading" key={index}>
            <h1>{section.title}</h1>
            {showForms[section.val] ? <RenderForm db={section.val} /> : null}
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={() => updateState(section.val)}
            >
              Add Item
            </Button>
          </div>
        );
      })}
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
