import firebase from "firebase";
import { fire } from "../../config/FireBase";

export const addOptionData = (data) => {
  const database = fire.firestore();
  database
    .collection("Options")
    .doc("cn0clrcGVWfzmDiLaHvW")
    .update({
      Women: firebase.firestore.FieldValue.arrayUnion(data),
    })
    .then((res) => {
      alert("Item Type Saved");
    });
};
export const manipulateData = (data) => {
  let item = null;
  for (let index = 0; index < data.length; index++) {
    if (data[index].hasOwnProperty("Women")) {
      data.forEach((element) => {
        item = element.Women;
      });
    }
  }
  return item;
};
