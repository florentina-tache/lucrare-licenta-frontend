import React, { useState, useEffect, useContext } from "react";
import Moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { useToasts } from "react-toast-notifications";
import { formatDate } from "../../helpers/utils/utilFunctions";

import Place from "./Place";
import Map from "./Map";
import SearchBar from "./SearchBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { AppProviderContext } from "../../integration/context/appProviderContext";
import AlertMessage from "../shared/AlertMessage";

import "./places.css"

const useStyles = makeStyles((theme) => ({
  root: {
    '@media(minWidth: 780px)': {
      display: 'inline',
      backgroundColor: 'red',
    }
  },
  favouriteButton: {
    width: "100px",
    height: "100px",
    color: "#950740"
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
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    marginBottom: "50px",
  },
}));

const Places = () => {
  const { state, actions } = useContext(AppProviderContext);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [noPlaceFound, setNoPlaceFound] = useState(false);
  const { addToast } = useToasts();
  const classes = useStyles();

  // const formatDate = Moment(placeDetails?.date).format("DD-MM-YYYY");
  const formatedDate = formatDate(placeDetails?.date)

  let token = state.token;
  let decodedToken, userId;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

  const getRandomPlace = async (placeId = "1") => {
    let place;
    try {
      place = await actions.fetchRandomPlace(placeId);
    } catch (err) { }
    console.log("place", place)
    if (!place || place.succes === false || place.message === "Did not find any new places.") {
      setNoPlaceFound(true)
      setPlaceDetails(null)
    } else {
      setPlaceDetails(place.place);
    }
  };

  const closedPlace = async (placeId) => {
    try {
      return await actions.updatePlaceToNotDisplay(placeId);
    } catch (err) { }
  };

  useEffect(() => {
    getRandomPlace();
  }, []);

  const displayAnotherPlace = () => {
    getRandomPlace(placeDetails._id);
  };

  const addPlaceToFavourites = async () => {
    try {
      const createdPlaceStatus = await actions.addNewPlace(
        {
          title: placeDetails.title,
          description: placeDetails.description,
          address: placeDetails.address,
          image: placeDetails.image,
        },
        "favourites",
        placeDetails._id
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
    getRandomPlace(); //?wait
  };

  return (
    <>
      {placeDetails && (
        <Grid container className={"root"}>
          <Grid item xs={6} className={"card"}>
            <Place
              title={placeDetails.title}
              image={placeDetails.image}
              description={placeDetails.description}
              date={formatedDate}
            />
          </Grid>
          <Grid item xs={6} className={classes.buttonsContainer}>
            <Grid container className={classes.buttons}>
              <div>
                <IconButton
                  aria-label="add to favorites"
                  className={classes.favouriteButton}
                  onClick={() => addPlaceToFavourites()}
                >
                  <FavoriteIcon className={classes.favouriteIcon} />
                </IconButton>
              </div>
              <div>
                <IconButton
                  aria-label="add to favorites"
                  className={classes.favouriteButton}
                  onClick={() => displayAnotherPlace()}
                >
                  <CloseIcon className={classes.favouriteIcon} />
                </IconButton>
              </div>
            </Grid>
            <Grid container className={classes.buttonsContainer}>
              <Map center={placeDetails.location} />
            </Grid>
          </Grid>
        </Grid>
      )}
      {noPlaceFound && (
        <AlertMessage text={"No more places to display!"} />
      )}
    </>
  );
};

export default Places;
