import firebase from "firebase";
import { fire } from "../../config/FireBase";
import { validateData } from "../Validation";

export const addOptionData = (data, mendata, cb) => {
  const validation = validateData(data, mendata);
  const database = fire.firestore();
  if (validation) {
    database
      .collection("Options")
      .doc("cn0clrcGVWfzmDiLaHvW")
      .update({
        Men: firebase.firestore.FieldValue.arrayUnion(data),
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
    if (data[index].hasOwnProperty("Men")) {
      data.forEach((element) => {
        item = element.Men;
      });
    }
  }
  return item;
};
