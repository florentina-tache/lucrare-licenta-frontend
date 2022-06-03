import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppProviderContext } from "../../integration/context/appProviderContext";

import UserPlaces from "./UserPlaces";
import AlertMessage from "../shared/AlertMessage";

const AddedPlaces = ({ userId }) => {
  const { actions } = useContext(AppProviderContext);

  const [addedPlaces, setAddedPlaces] = useState(null);
  const [deletedAPlace, setDeletedAPlace] = useState(false);

  const getAddedPlaces = async () => {
    let places;
    try {
      places = await actions.fetchUserPlaces(userId, "added");
    } catch (err) {}
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
    <UserPlaces
      itemData={addedPlaces.places}
      setDeletedAPlace={setDeletedAPlace}
    />
  ) : (
    <AlertMessage text="No places found!" />
  );
};

export default AddedPlaces;
