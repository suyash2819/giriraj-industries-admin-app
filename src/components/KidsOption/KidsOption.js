import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { db } from "../../config/FireBase";
import OptionDisplay from "../OptionDIsplay";
import { addOptionData } from "./KidsFunction";
import { manipulateData } from "./KidsFunction";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const ItemTypeForm = (props) => {
  const { updateItemValue } = props;

  const handleOnChange = (e) => {
    updateItemValue(e.target.value);
  };
  return (
    <Input placeholder="Item Type" name="Item_Type" onChange={handleOnChange} />
  );
};

const KidsOptionDisplay = (props) => {
  const { getItemValue } = props;
  const [itemTypeDisplay, setItemTypeDisplay] = useState(false);
  const [getItemType, setItemType] = useState("");
  const [kidsData, setKidsData] = useState("");
  const [viewOption, setOptionDisplay] = useState(false);
  const [showAlert, setShowAlert] = useState({
    success: null,
    message: null,
    show: false,
  });

  const alertMessageCallback = (success, message) => {
    setShowAlert({ success, message, show: true });
  };

  const itemTypeInputDisplay = () => {
    setItemTypeDisplay(true);
  };

  const saveItemType = (data) => {
    setItemType(data);
  };

  const handleItemChange = (e) => {
    getItemValue(e.target.value);
  };

  const handleAlertOnClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    db.collection("Options").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let kidsItem = [];
      kidsItem = manipulateData(data) || [];
      setKidsData(kidsItem);
      setOptionDisplay(true);
    });
  }, []);

  return (
    <>
      <NativeSelect name="Item_Type" onChange={handleItemChange}>
        {viewOption ? (
          <OptionDisplay data={kidsData}></OptionDisplay>
        ) : (
          <option>None</option>
        )}
      </NativeSelect>
      <FormHelperText>Item Type</FormHelperText>
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={itemTypeInputDisplay}
      >
        Add Item Type
      </Button>
      {itemTypeDisplay ? <ItemTypeForm updateItemValue={saveItemType} /> : null}
      <Button
        variant="contained"
        color="primary"
        component="span"
        onClick={() => addOptionData(getItemType, alertMessageCallback)}
      >
        Finalize Item To Database
      </Button>
      <Snackbar
        open={showAlert.show}
        autoHideDuration={4000}
        onClose={handleAlertOnClose}
      >
        {showAlert.success ? (
          <Alert severity="success" variant="filled">
            <strong>{showAlert.message}</strong>
          </Alert>
        ) : (
          <Alert severity="error" variant="filled">
            <strong>{showAlert.message}</strong>
          </Alert>
        )}
      </Snackbar>
    </>
  );
};

export default KidsOptionDisplay;
