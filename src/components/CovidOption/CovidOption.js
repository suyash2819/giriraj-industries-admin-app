import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { db } from "../../config/FireBase";
import OptionDisplay from "../OptionDIsplay";
import { addOptionData } from "./CovidFunction";
import { manipulateData } from "./CovidFunction";

const ItemTypeForm = (props) => {
  const { updateItemValue } = props;

  const handleOnChange = (e) => {
    updateItemValue(e.target.value);
  };
  return (
    <Input placeholder="Item Type" name="Item_Type" onChange={handleOnChange} />
  );
};

const CovidOptionDisplay = (props) => {
  const { getItemValue } = props;
  const [itemTypeDisplay, setItemTypeDisplay] = useState(false);
  const [getItemType, setItemType] = useState("");
  const [covidDate, setCovidData] = useState("");
  const [optionDisplay, setOptionDisplay] = useState(false);

  const itemTypeInputDisplay = () => {
    setItemTypeDisplay(true);
  };

  const saveItemType = (data) => {
    setItemType(data);
  };

  const handleItemChange = (e) => {
    getItemValue(e.target.value);
  };

  useEffect(() => {
    db.collection("Options").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let CovidItem = [];
      CovidItem = manipulateData(data);
      if (CovidItem === null) CovidItem = [];
      setCovidData(CovidItem);
      setOptionDisplay(true);
    });
  }, []);

  return (
    <>
      <NativeSelect name="Item_Type" onChange={handleItemChange}>
        {optionDisplay ? (
          <OptionDisplay data={covidDate}></OptionDisplay>
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
        onClick={() => addOptionData(getItemType)}
      >
        Finalize Item To Database
      </Button>
    </>
  );
};

export default CovidOptionDisplay;
