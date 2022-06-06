import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppProviderContext } from "../../integration/context/appProviderContext";

import { Grid, Card } from "@material-ui/core";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ImageUpload from "../shared/ImageUpload";
import { server } from "../../helpers/utils/constants";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import MapIcon from '@material-ui/icons/Map';
import PlaceDetails from "./helperComponents/PlaceDetails";

import "./userPlaces.css"

// import itemData from './itemData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: "20px",
  },
  imageList: {
    width: 1000,
    // bottom: '100px',
    // height: '100%'
  },
  icon: {
    color: "#db0a5e"
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
  },
  modalWrapper: {
    display: "flex",
    justifyContent: "center"
  }
}));

const UserPlaces = ({
  itemData,
  setDeletedAPlace = () => { },
  displayButtons = true,
  isFavourites = false,
}) => {
  const classes = useStyles();
  let navigate = useNavigate();
  const { actions } = useContext(AppProviderContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [placeToBeDeleted, setPlaceToBeDeleted] = useState();
  const [placeDetailsOpen, setPlaceDetailsOpen] = useState(false);
  const [placeDetails, setPlaceDetails] = useState();

  const onEditHandler = (placeId) => {
    navigate(`/places/edit/${placeId}`);
  };

  const onDeleteModalHandler = (place) => {
    setIsModalOpen(true);
    setPlaceToBeDeleted(place);
  };

  const onDetailsHandler = (place) => {
    setPlaceDetailsOpen(true);
    setPlaceDetails(place);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onDeleteHandler = async () => {
    if (isFavourites) {
      await actions.deletePlaceFromFavourites(placeToBeDeleted.id);
      setIsModalOpen(false);
      setDeletedAPlace(true);
      // navigate(`/places/myfavourites`);
    } else {
      await actions.deletePlace(placeToBeDeleted.id);
      setIsModalOpen(false);
      setDeletedAPlace(true);
      // navigate(`/places/myplaces`);
    }
  };

  return (
    <div className={classes.root}>
      <ImageList rowHeight={300} className={classes.imageList} id="mobile">
        {/* <ImageListItem key='Subheader' cols={2} style={{ height: 'auto' }}>
          <ImageUpload
            center
            id='image'
            onInput={inputHandler}
            errorText='Please provide an image.'
          />
        </ImageListItem> */}
        {itemData.map((item) => (
          <ImageListItem key={item.image}>
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
                  {displayButtons && (
                    <>
                      <IconButton
                        color="error"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => onEditHandler(item.id)}
                        className={classes.icon}
                      >
                        <CreateIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => onDeleteModalHandler(item)}
                        className={classes.icon}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                  {isFavourites && <IconButton
                    color="error"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => onDeleteModalHandler(item)}
                    className={classes.icon}
                  >
                    <DeleteIcon />
                  </IconButton>}
                </>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modalWrapper}
      >
        <Card className={classes.modal}>
          <Grid
            // className={classes.photoIcon}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <h3 id="simple-modal-title">Delete this place?</h3>
            </Grid>
            <Grid item>
              <h2 id="simple-modal-description">{placeToBeDeleted?.title}</h2>
            </Grid>
            <Grid item>
              <IconButton
                color="error"
                aria-label="upload picture"
                component="span"
                onClick={() => handleClose()}
              >
                <CloseIcon />
              </IconButton>
              <IconButton
                color="error"
                aria-label="upload picture"
                component="span"
                fontSize="large"
                onClick={() => onDeleteHandler()}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      <PlaceDetails isModalOpen={placeDetailsOpen} setIsModalOpen={setPlaceDetailsOpen} placeDetails={placeDetails} />
    </div>
  );
};

export default UserPlaces;
