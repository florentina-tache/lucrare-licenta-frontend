import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useToasts } from "react-toast-notifications";

import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import MapIcon from '@material-ui/icons/Map';
import PlaceDetails from "./PlaceDetails";

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
    marginBottom: "20px",
  },
  image: {
    boxSizing: "border-box",
    width: "100%",
  },
  icon: {
    color: "#db0a5e"
  },
  placeBar: {

  }
}));

const PlaceCard = ({ item }) => {
  const classes = useStyles();
  const { addToast } = useToasts();
  const { state, actions } = useContext(AppProviderContext);

  const [placeDetailsOpen, setPlaceDetailsOpen] = useState(false);
  const [placeDetails, setPlaceDetails] = useState();

  const onDetailsHandler = (place) => {
    setPlaceDetailsOpen(true);
    setPlaceDetails(place);
  };

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
            <>
              <IconButton
                color="error"
                aria-label="upload picture"
                component="span"
                onClick={() => onDetailsHandler(item)}
                className={classes.icon}
              >
                <MapIcon />
              </IconButton>
              <IconButton
                aria-label="add to favorites"
                className={classes.icon}
                onClick={() => addPlaceToFavourites(item)}
              >
                <FavoriteIcon className={classes.favouriteIcon} />
              </IconButton>
            </>
          }
          className={classes.placeBar}
        />
      </ImageListItem>
      <PlaceDetails isModalOpen={placeDetailsOpen} setIsModalOpen={setPlaceDetailsOpen} placeDetails={placeDetails} />
    </div>
  );
};

export default PlaceCard;
