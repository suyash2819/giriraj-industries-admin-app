import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import fire, { storage } from "../config/FireBase";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const RenderForm = (props) => {
  const [itemType, setItem] = useState("");
  const [Description, setDesc] = useState("");
  const [Cost, setCost] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const classes = useStyles();
  const { db } = props;

  const addItem = (e) => {
    e.preventDefault();
    const database = fire.firestore();
    database
      .collection(db)
      .add({
        Item_Type: itemType,
        Cost: Cost,
        Description: Description,
        Image_url: imageUrl,
      })
      .then((item) => {
        alert("item saved");
        setCost("");
        setDesc("");
        setImageUrl("");
        setImage("");
        setItem("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setImageUrl(url);
            alert("Image saved");
          });
      }
    );
  };

  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={addItem}
      >
        <Input
          placeholder="Item Type"
          name="Item_Type"
          value={itemType}
          onChange={(e) => setItem(e.target.value)}
        />
        <br></br>

        <Input
          placeholder="Cost"
          name="Cost"
          value={Cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <br></br>
        <textarea
          placeholder="Description"
          name="Description"
          value={Description}
          onChange={(e) => setDesc(e.target.value)}
        />
        <br></br>
        <input
          accept="image/*"
          className={classes.image}
          name="image_url"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleUpload}
        >
          Upload Photo
        </Button>
        <br></br>
        <center>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </center>
      </form>
    </>
  );
};

export default RenderForm;
