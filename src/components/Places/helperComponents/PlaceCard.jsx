import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";

import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";

import { AppProviderContext } from "../../../integration/context/appProviderContext";
import { server } from "../../../helpers/utils/constants";

// import itemData from './itemData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: 300,
    height: 200,
    "& .MuiImageListItem-root": {
      flexShrink: "unset !important",
      top: "50%",
      width: "100%",
      position: "relative",
      transform: "translateY(-50%)",
    },
  },
  image: {
    boxSizing: "border-box",
    width: "100%",
  },
  favouriteIcon: {
    color: "#950740"
  },
  placeBar: {

  }
}));

const PlaceCard = ({ item }) => {
  const classes = useStyles();
  const { addToast } = useToasts();
  const { state, actions } = useContext(AppProviderContext);

  const addPlaceToFavourites = async (item) => {
    // console.log("placeId", placeDetails.id, placeDetails._id);
    try {
      const createdPlaceStatus = await actions.addNewPlace(
        {
          title: item.title,
          description: item.description,
          address: item.address,
          image: item.image,
        },
        "favourites",
        item._id,
      );

      if (createdPlaceStatus) {
        const { message, success } = createdPlaceStatus;

        addToast(message, {
          appearance: success ? "success" : "error",
          autoDismiss: true,
        });
      }
    } catch (err) {
      addToast(err, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className={classes.root}>
      <ImageListItem >
        <img src={`${server}${item.image}`} alt={item.title} />
        <ImageListItemBar
          title={item.title}
          subtitle={<span>{item.likes} likes</span>}
          actionIcon={
            <IconButton
              aria-label="add to favorites"
              className={classes.favouriteButton}
              onClick={() => addPlaceToFavourites(item)}
            >
              <FavoriteIcon className={classes.favouriteIcon} />
            </IconButton>
          }
          className={classes.placeBar}
        />
      </ImageListItem>
    </div>
  );
};

export default PlaceCard;
