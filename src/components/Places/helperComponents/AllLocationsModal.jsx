import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { formatDate } from "../../../helpers/utils/utilFunctions";

import { Grid, Card } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import AllLocationsMap from "./AllLocationsMap";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    modal: {
        position: "absolute",
        width: 600,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #000",
        borderRadius: 5,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1),
        top: "20%",
        // left: "30%",
        justifyContent: 'center',
        alignItems: 'center',
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

const AllLocationsModal = ({ isModalOpen, setIsModalOpen, places }) => {
    const classes = useStyles();

    const handleClose = () => {
        setIsModalOpen(false);
    };
    const placesLocations = places.map(place => place.location)
    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            id={"simple-modal"}
            className={classes.modalWrapper}
        >
            <Card className={classes.modal}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    direction="column"
                >
                    <AllLocationsMap placesLocations={placesLocations} />
                </Grid>
            </Card>
        </Modal >
    )
}

export default AllLocationsModal;