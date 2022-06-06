import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppProviderContext } from "../../integration/context/appProviderContext";
import { makeStyles } from "@material-ui/core/styles";

import AlertMessage from "../shared/AlertMessage";
import UserPlaces from "./UserPlaces";
import AllLocationsModal from "./helperComponents/AllLocationsModal";
import MapIcon from '@material-ui/icons/Map';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  backIcon: {
    paddingRight: "10px",
  },
}));

const FavouritePlaces = ({ userId, isFavourites = true }) => {
  // const classes = useStyles();
  const { actions } = useContext(AppProviderContext);
  const classes = useStyles();

  const [favouritePlaces, setFavouritePlaces] = useState(null);
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const [deletedAPlace, setDeletedAPlace] = useState(false);

  const getFavouritePlaces = async () => {
    let places;
    try {
      places = await actions.fetchUserPlaces("favourites");
    } catch (err) { }
    setFavouritePlaces(places);
    setDeletedAPlace(false);
  };

  useEffect(() => {
    getFavouritePlaces();
  }, []);

  useEffect(() => {
    if (deletedAPlace) {
      getFavouritePlaces();
    }
  }, [deletedAPlace]);

  return (<>
    {favouritePlaces?.places ? (
      <>
        <IconButton
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setMapIsOpen(true);
          }}
        >
          <MapIcon className={classes.backIcon} />
          See on map
        </IconButton>
        <AllLocationsModal isModalOpen={mapIsOpen} setIsModalOpen={setMapIsOpen} places={favouritePlaces.places} />
        <UserPlaces itemData={favouritePlaces.places} setDeletedAPlace={setDeletedAPlace}
          displayButtons={false} isFavourites={isFavourites} />
      </>
    ) : (
      <AlertMessage text="No places found!" />
    )}
  </>)
};

export default FavouritePlaces;
