import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";

import Map from "./Map";
import SearchBar from "./SearchBar";
import AlertMessage from "../shared/AlertMessage";
import UserPlaces from "./UserPlaces";

import { AppProviderContext } from "../../integration/context/appProviderContext";
import LatestPlaces from "./Tops/LastestPlaces";

const useStyles = makeStyles((theme) => ({
  favouriteButton: {
    width: "100px",
    height: "100px",
  },
  favouriteIcon: {
    width: "100px",
    height: "100px",
    display: "block",
  },
  buttonsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const SearchPage = () => {
  const { state, actions } = useContext(AppProviderContext);
  const [places, setPlaces] = useState(null);
  const classes = useStyles();

  let token = state.token;
  let decodedToken, userId;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

  const getPlaces = async (query) => {
    let fetchedPlaces;
    try {
      fetchedPlaces = await actions.fetchSearchedPlace(query);
      setPlaces(fetchedPlaces);
    } catch (err) {}
  };

  const getQuery = (query) => {
    console.log(query);
    getPlaces(query);
  };

  useEffect(() => {
    console.log(places);
  }, places);

  return (
    <>
      <LatestPlaces />
      <SearchBar getQuery={getQuery} />
      {places?.place ? (
        <UserPlaces itemData={places.place} displayButtons={false} />
      ) : (
        <AlertMessage text="No places found!" />
      )}
    </>
  );
};

export default SearchPage;
