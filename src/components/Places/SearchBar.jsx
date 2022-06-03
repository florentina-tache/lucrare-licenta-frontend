import React, { useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { alpha, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import { AppProviderContext } from "../../integration/context/appProviderContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "LightGray",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    align: "right",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "25vw",
  },
}));

export default function SearchBar({ getQuery = () => { } }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(null);
  const { state, actions } = useContext(AppProviderContext);

  const submitHandler = (e) => {
    e.preventDefault();
    getQuery(searchValue);
  };

  return (
    <div className={classes.root}>
      <Toolbar>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          spacing={24}
        >
          <Grid item></Grid>
          <Grid item>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form className={classes.form} onSubmit={submitHandler}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
                <Button type="submit" variant="contained">
                  search
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}
