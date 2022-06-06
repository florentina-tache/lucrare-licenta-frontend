import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { AppProviderContext } from "../../integration/context/appProviderContext";
import UsersList from "./UsersList";
import FavouritePlaces from "../Places/FavouritePlaces";
import AddedPlaces from "../Places/AddedPlaces";
import IconButton from "@mui/material/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Grid, Card } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  backIcon: {
    paddingRight: "10px",
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

const AdminDashboard = () => {
  const { state, actions } = useContext(AppProviderContext);
  const classes = useStyles();
  let navigate = useNavigate();
  const [action, setAction] = useState(null);
  const [userId, setUserId] = useState(null);
  const [users, setUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    const fetchedUsers = await actions.fetchUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    if (!isModalOpen) {
      fetchUsers();
    }
  }, [isModalOpen]);

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  const getUserAction = (userId, action) => {
    setUserId(userId);
    setAction(action);
    if (action === "deleteUser") {
      setIsModalOpen(true);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const onDeleteHandler = async () => {
    await actions.deleteUser(userId);
    setIsModalOpen(false);
    navigate(`/admin/users`);
  };

  const seePlaces = action === "seeFavourites" || action === "editAddedPlaces";

  return (
    <>
      {!seePlaces && <UsersList getUserAction={getUserAction} users={users} />}
      {seePlaces && (
        <IconButton
          aria-label="upload picture"
          component="span"
          onClick={() => {
            setAction(null);
          }}
        >
          <BackspaceIcon className={classes.backIcon} />
          Go back
        </IconButton>
      )}
      {action === "seeFavourites" && <FavouritePlaces userId={userId} isFavourites={false} />}
      {action === "editAddedPlaces" && <AddedPlaces userId={userId} />}
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
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
              <h3 id="simple-modal-title">Delete this user?</h3>
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
    </>
  );
};

export default AdminDashboard;
