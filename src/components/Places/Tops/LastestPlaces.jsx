import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppProviderContext } from "../../../integration/context/appProviderContext";

import PlaceCard from "../helperComponents/PlaceCard";

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

const LatestPlaces = ({
  itemData,
  setDeletedAPlace = () => {},
  displayButtons = true,
}) => {
  const classes = useStyles();
  const [places, setPlaces] = useState(null);

  const { actions } = useContext(AppProviderContext);

  const fetchLatestPlaces = async () => {
    const fetchedPlaces = await actions.fetchLatestPlaces();
    setPlaces(fetchedPlaces);
  };

  useEffect(() => {
    fetchLatestPlaces();
  }, []);

  useEffect(() => {
    console.log("ceva", places?.places);
  }, [places]);

  return (
    <div className={classes.root}>
      {places?.places && places.places.map((place) => (
        <PlaceCard item={place}/>
      ))}
    </div>
  );
};

export default LatestPlaces;
