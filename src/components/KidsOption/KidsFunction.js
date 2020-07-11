import firebase from "firebase";
import { fire } from "../../config/FireBase";

export const addOptionData = (data, cb) => {
  const database = fire.firestore();
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
