import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";

import { server } from "../../../helpers/utils/constants";

// import itemData from './itemData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 1000,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    top: "40%",
    left: "40%",
  },
}));

const PlaceCard = ({
  item,
  setDeletedAPlace = () => {},
  displayButtons = true,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageListItem key={item.image}>
        <img src={`${server}${item.image}`} alt={item.title} />
        <ImageListItemBar
          title={item.title}
          subtitle={<span>by: {item.author}</span>}
        />
      </ImageListItem>
    </div>
  );
};

export default PlaceCard;
