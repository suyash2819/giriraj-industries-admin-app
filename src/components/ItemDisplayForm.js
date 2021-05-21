import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { fire, storage } from "../config/FireBase";
import MenOptionDisplay from "./MenOption/MenOption";
import WomenOptionDisplay from "./WomenOption/WomenOption";
import CovidOptionDisplay from "./CovidOption/CovidOption";
import KidsOptionDisplay from "./KidsOption/KidsOption";
import { frontItemCollection } from "./Data";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    input: {
      width: 50,
    },
  },
}));

const SectionWiseRender = (props) => {
  const { db, getItemType } = props;
  if (db === "Men") {
    return <MenOptionDisplay getItemValue={getItemType}></MenOptionDisplay>;
  } else if (db === "Women") {
    return <WomenOptionDisplay getItemValue={getItemType}></WomenOptionDisplay>;
  } else if (db === "Kids") {
    return <KidsOptionDisplay getItemValue={getItemType}></KidsOptionDisplay>;
  } else if (db === "Covid") {
    return <CovidOptionDisplay getItemValue={getItemType}></CovidOptionDisplay>;
  }
};

const RenderForm = (props) => {
  const [itemType, setItem] = useState("");
  const [description, setDesc] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [itemName, setItemName] = useState("");
  const [addedOnFrontPage, setAddedOnFrontPage] = useState(false);

  const [sizeAvailability, setSizeAvailability] = useState({
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
    XXXL: false,
    "4XL": false,
    "5XL": false,
    "6XL": false,
    "7XL": false,
    "8XL": false,
    "9XL": false,
  });
  const [colorAvailability, setColorAvailability] = useState({
    red: false,
    black: false,
    yellow: false,
    gray: false,
    maroon: false,
    green: false,
    blue: false,
    navy: false,
    purple: false,
  });

  let sizes = [
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "XXXL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "8XL",
    "9XL",
  ];

  let colors = [
    "red",
    "black",
    "yellow",
    "gray",
    "maroon",
    "green",
    "blue",
    "navy",
    "purple",
  ];
  const classes = useStyles();
  const { db } = props;

  const addItem = (e) => {
    e.preventDefault();
    const database = fire.firestore();

    if (addedOnFrontPage) {
      database
        .collection(frontItemCollection)
        .add({
          Item_Type: itemType,
          Cost: cost,
          Description: description,
          Image_url: imageUrl,
          Sizes_Available: sizeAvailability,
          Color_Available: colorAvailability,
          Item_Name: itemName,
        })
        .then((item) => {})
        .catch((err) => {});
    }

    database
      .collection(db)
      .add({
        Item_Type: itemType,
        Cost: cost,
        Description: description,
        Image_url: imageUrl,
        Sizes_Available: sizeAvailability,
        Color_Available: colorAvailability,
        Item_Name: itemName,
      })
      .then((item) => {
        alert("item saved");
        setCost("");
        setDesc("");
        setImageUrl("");
        setImage("");
        setItem("");
        setItemName("");
        setSizeAvailability({
          S: false,
          M: false,
          L: false,
          XL: false,
          XXL: false,
          XXXL: false,
          "4XL": false,
          "5XL": false,
          "6XL": false,
          "7XL": false,
          "8XL": false,
          "9XL": false,
        });
        setColorAvailability({
          red: false,
          black: false,
          yellow: false,
          gray: false,
          maroon: false,
          green: false,
          blue: false,
          navy: false,
          purple: false,
        });
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
            setImageUrl(url);
            alert("Image saved");
          });
      }
    );
  };

  const getItemType = (item) => {
    setItem(item);
  };

  const handlesizeChange = (e) => {
    setSizeAvailability({
      ...sizeAvailability,
      [e.target.name]: e.target.checked,
    });
  };

  const handlecolorChange = (e) => {
    setColorAvailability({
      ...colorAvailability,
      [e.target.name]: e.target.checked,
    });
  };

  const handleAddedOnFrontPage = (e) => {
    setAddedOnFrontPage(e.target.checked);
  };
  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={addItem}
      >
        {db !== frontItemCollection ? (
          <SectionWiseRender db={db} getItemType={getItemType} />
        ) : (
          <Input
            placeholder="Item Type"
            name="Item Type"
            value={itemType}
            onChange={(e) => setItem(e.target.value)}
          />
        )}
        <br></br>
        <Input
          placeholder="Cost"
          name="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <Input
          placeholder="Item Name"
          name="Item_Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <br></br>
        <textarea
          placeholder="Description"
          name="Description"
          value={description}
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
        <h3>Availaibility Of Sizes For This Item</h3>
        {sizes.map((size) => (
          <>
            <FormControlLabel
              control={<Checkbox name={size} color="primary" />}
              checked={sizeAvailability[size]}
              onChange={handlesizeChange}
              label={size}
            />
          </>
        ))}
        <br></br>
        <h3>Availaibility Of color For This Item</h3>
        {colors.map((color) => (
          <>
            <FormControlLabel
              control={<Checkbox name={color} color="primary" />}
              checked={colorAvailability[color]}
              onChange={handlecolorChange}
              label={
                <div
                  name={color}
                  style={{
                    width: "20px",
                    height: "20px",
                    margin: "5px",
                    backgroundColor: color,
                    display: "inline-block",
                  }}
                ></div>
              }
            />
          </>
        ))}
        <br></br>
        <FormControlLabel
          control={<Checkbox name="" color="primary" />}
          checked={addedOnFrontPage}
          onChange={handleAddedOnFrontPage}
          label="To Be Added On The Front Page ?"
        />
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
