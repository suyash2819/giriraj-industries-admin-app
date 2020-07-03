import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import { db } from "../../config/FireBase";
import OptionDisplay from "../OptionDIsplay";
import { addOptionData } from "./KidsFunction";
import { manipulateData } from "./KidsFunction";

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

      let KidsItem = [];
      KidsItem = manipulateData(data);
      if (KidsItem === null) KidsItem = [];
      setKidsData(KidsItem);
      setOptionDisplay(true);
    });
  }, []);

  return (
    <>
      <NativeSelect name="Item_Type" onChange={handleItemChange}>
        {optionDisplay ? (
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
        onClick={() => addOptionData(getItemType)}
      >
        Finalize Item To Database
      </Button>
    </>
  );
};

export default KidsOptionDisplay;
