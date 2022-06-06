import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppProviderContext } from "../../integration/context/appProviderContext";
import { makeStyles } from "@material-ui/core/styles";

import UserPlaces from "./UserPlaces";
import AlertMessage from "../shared/AlertMessage";
import AllLocationsModal from "./helperComponents/AllLocationsModal";
import MapIcon from '@material-ui/icons/Map';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  backIcon: {
    paddingRight: "10px",
  },
}));

const AddedPlaces = ({ userId }) => {
  const { actions } = useContext(AppProviderContext);
  const classes = useStyles();

  const [addedPlaces, setAddedPlaces] = useState(null);
  const [deletedAPlace, setDeletedAPlace] = useState(false);
  const [mapIsOpen, setMapIsOpen] = useState(false);

  const getAddedPlaces = async () => {
    let places;
    try {
      places = await actions.fetchUserPlaces("added");
    } catch (err) { }
    setAddedPlaces(places);
    setDeletedAPlace(false);
  };

  useEffect(() => {
    getAddedPlaces();
  }, []);

  useEffect(() => {
    if (deletedAPlace) {
      getAddedPlaces();
    }
  }, [deletedAPlace]);

  return addedPlaces?.places ? (
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
      <AllLocationsModal isModalOpen={mapIsOpen} setIsModalOpen={setMapIsOpen} places={addedPlaces.places} />
      <UserPlaces
        itemData={addedPlaces.places}
        setDeletedAPlace={setDeletedAPlace}
      />
    </>
  ) : (
    <AlertMessage text="No places found!" />
  );
};

export default AddedPlaces;
