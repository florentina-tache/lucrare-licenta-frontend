import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppProviderContext } from "../../../integration/context/appProviderContext";

import PlaceCard from "../helperComponents/PlaceCard";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  subtitle: {
    margin: "20px 0 20px",
  },
}));

const TopPlaces = ({ }) => {
  const classes = useStyles();
  const [places, setPlaces] = useState(null);

  const { actions } = useContext(AppProviderContext);

  const fetchLikedPlaces = async () => {
    const fetchedPlaces = await actions.fetchLikedPlaces();
    setPlaces(fetchedPlaces);
  };

  useEffect(() => {
    fetchLikedPlaces();
  }, []);

  // useEffect(() => {
  //   console.log("ceva", places?.places);
  // }, [places]);

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        align="center"
        className={classes.subtitle}
      >
        Most liked places
      </Typography>
      <div className={classes.root}>
        {places?.places &&
          places.places.map((place) => <PlaceCard key={`${place.image}${Math.random()}`} item={place} />)}
      </div>
    </>
  );
};

export default TopPlaces;
