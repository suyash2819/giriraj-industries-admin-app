import React, { useState } from "react";
import { fire } from "../config/FireBase";
import "../CSS/AdminPortal.css";
import RenderForm from "./ItemDisplayForm";
import Button from "@material-ui/core/Button";
import { sections, frontItemCollection } from "./Data";

const initialFormValue = {
  [sections.men]: false,
  [sections.women]: false,
  [sections.kids]: false,
  [sections.covid]: false,
};

const AdminPortal = () => {
  const [showForms, setShowForms] = useState(initialFormValue);
  const [frontItemForm, setFrontItemForm] = useState(false);

  const sectionArray = [
    { title: sections.men, val: sections.men },
    { title: sections.women, val: sections.women },
    { title: sections.kids, val: sections.kids },
    { title: sections.covid, val: sections.covid },
  ];

  const logout = () => {
    fire.auth().signOut();
  };

  const updateState = (category) => {
    let obj = { ...showForms };
    obj[category] = true;
    setShowForms(obj);
  };
  const updateFrontItemState = () => {
    setFrontItemForm(true);
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
        <h4>Add Items For Front Page</h4>
        {frontItemForm ? <RenderForm db={frontItemCollection} /> : null}
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={() => updateFrontItemState()}
        >
          Add Front Page Item
        </Button>
        <hr></hr>
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
