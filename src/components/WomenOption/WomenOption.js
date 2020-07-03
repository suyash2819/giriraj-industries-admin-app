import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import OptionDisplay from "../OptionDIsplay";
import { addOptionData } from "./WomenFunction";
import { manipulateData } from "./WomenFunction";
import { db } from "../../config/FireBase";

const ItemTypeForm = (props) => {
  const { updateItemValue } = props;

  const handleOnChange = (e) => {
    updateItemValue(e.target.value);
  };
  return (
    <Input placeholder="Item Type" name="Item_Type" onChange={handleOnChange} />
  );
};

const WomenOptionDisplay = (props) => {
  const { getItemValue } = props;
  const [itemTypeDisplay, setItemTypeDisplay] = useState(false);
  const [getItemType, setItemType] = useState("");
  const [womenData, setwomenData] = useState("");
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
      let WomenItem = [];
      WomenItem = manipulateData(data);
      if (WomenItem === null) WomenItem = [];
      setwomenData(WomenItem);
      setOptionDisplay(true);
    });
  }, []);

  return (
    <>
      <NativeSelect name="Item_Type" onChange={handleItemChange}>
        {optionDisplay ? (
          <OptionDisplay data={womenData}></OptionDisplay>
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

export default WomenOptionDisplay;
