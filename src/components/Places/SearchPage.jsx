import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";

import Map from "./Map";
import SearchBar from "./SearchBar";
import AlertMessage from "../shared/AlertMessage";
import UserPlaces from "./UserPlaces";

import { AppProviderContext } from "../../integration/context/appProviderContext";
import LatestPlaces from "./Tops/LastestPlaces";
import TopPlaces from "./Tops/TopPlaces";

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: "30px",
  },
}));

const SearchPage = () => {
  const { state, actions } = useContext(AppProviderContext);
  const [places, setPlaces] = useState(null);
  const [searchedPlace, setSearchedPlace] = useState(false);
  const classes = useStyles();

  // console.log(searchedPlace, places)

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
    } catch (err) { }
  };

  const getQuery = (query) => {
    // console.log(query);
    setSearchedPlace(true);
    getPlaces(query);
  };

  // useEffect(() => {
  //   console.log(places);
  // }, places);

  return (
    <>
      <LatestPlaces />
      <TopPlaces />
      <div className={classes.search}>
        <SearchBar getQuery={getQuery} />
      </div>

      {places?.place && (
        <UserPlaces itemData={places.place} displayButtons={false} />
      )}
      {!places?.place?.length && searchedPlace && <AlertMessage text="No places found!" />
      }
    </>
  );
};

export default SearchPage;
