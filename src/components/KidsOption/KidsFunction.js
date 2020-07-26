import firebase from "firebase";
import { fire } from "../../config/FireBase";
import { validateData } from "../Validation";

export const addOptionData = (data, kidsData, cb) => {
  const validation = validateData(data, kidsData);
  const database = fire.firestore();
  if (validation) {
    database
      .collection("Options")
      .doc("cn0clrcGVWfzmDiLaHvW")
      .update({
        Kids: firebase.firestore.FieldValue.arrayUnion(data),
      })
      .then((res) => {
        cb(true, "Item Type Saved Successfully!");
      })
      .catch((err) => {
        cb(false, "Some Error Has Occured", err);
      });
  } else {
    cb(
      false,
      "Item Type is already present, kindly check the list in dropdown"
    );
  }
};

export const manipulateData = (data) => {
  let item = null;
  for (let index = 0; index < data.length; index++) {
    if (data[index].hasOwnProperty("Kids")) {
      data.forEach((element) => {
        item = element.Kids;
      });
    }
  }
  return item;
};
