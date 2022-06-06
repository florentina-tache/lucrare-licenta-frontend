import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { formatDate } from "../../../helpers/utils/utilFunctions";

import { Grid, Card } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "@material-ui/core/Modal";
import Map from "../Map";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #000",
        borderRadius: 5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1),
        top: "20%",
    },
    title: {
        height: '50px',
    },
    infoLine: {
        height: '40px',
    },
    lastInfoLine: {
        height: '40px',
        marginBottom: '10px',
    },
    modalWrapper: {
        display: "flex",
        justifyContent: "center"
    }
}));

const PlaceDetails = ({ isModalOpen, setIsModalOpen, placeDetails }) => {
    const classes = useStyles();

    const handleClose = () => {
        setIsModalOpen(false);
    };
    return (
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
                    <Grid item className={classes.title}>
                        <h1 >{placeDetails?.title}</h1>
                    </Grid>
                    <Grid item className={classes.infoLine}>
                        <h3 >{placeDetails?.description}</h3>
                    </Grid>
                    <Grid item className={classes.infoLine}>
                        <h3 >Creation date: {formatDate(placeDetails?.date)}</h3>
                    </Grid>
                    <Grid item className={classes.lastInfoLine}>
                        <h3 >Address: {placeDetails?.address}</h3>
                    </Grid>
                    <Map center={placeDetails?.location} />
                </Grid>
            </Card>
        </Modal>
    )
}

export default PlaceDetails;