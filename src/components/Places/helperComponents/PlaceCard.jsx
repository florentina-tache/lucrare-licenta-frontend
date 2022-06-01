import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

import { server } from "../../../helpers/utils/constants";
import "./style.css";

// import itemData from './itemData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: 300,
    height: 200,
  },
  image: {
    boxSizing: "border-box",
    // flexShrink: 0,
    width: "100%",
  },
}));

const PlaceCard = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageListItem key={item.image}>
        <img src={`${server}${item.image}`} alt={item.title} />
        {console.log("!!!", item)}
        <ImageListItemBar
          title={item.title}
          subtitle={<span>by: {item.author}</span>}
        />
      </ImageListItem>
    </div>
  );
};

export default PlaceCard;
