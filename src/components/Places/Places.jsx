import React, { useState, useEffect, useContext } from "react";
import Moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { useToasts } from "react-toast-notifications";

import Place from "./Place";
import Map from "./Map";
import SearchBar from "./SearchBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { AppProviderContext } from "../../integration/context/appProviderContext";

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
  const { addToast } = useToasts();
  const classes = useStyles();

  const formatDate = Moment(placeDetails?.date).format("DD-MM-YYYY");

  let token = state.token;
  let decodedToken, userId;
  if (token) {
    decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

  const getRandomPlace = async () => {
    let place;
    try {
      place = await actions.fetchRandomPlace(userId);
    } catch (err) {}
    setPlaceDetails(place.place);
  };

  useEffect(() => {
    getRandomPlace();
  }, []);

  const displayAnotherPlace = () => {
    getRandomPlace();
  };

  const addPlaceToFavourites = async () => {
    console.log("placeId", placeDetails.id, placeDetails._id);
    try {
      const createdPlaceStatus = await actions.addNewPlace(
        {
          title: placeDetails.title,
          description: placeDetails.description,
          address: placeDetails.address,
          image: placeDetails.image,
        },
        userId,
        placeDetails._id,
        "favourites"
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
    <>
      {placeDetails && (
        <Grid container>
          <Grid item xs={6}>
            <Place
              title={placeDetails.title}
              image={placeDetails.image}
              description={placeDetails.description}
              date={formatDate}
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
    </>
  );
};

export default Places;
