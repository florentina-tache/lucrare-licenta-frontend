import React, { useState, useEffect, useContext } from "react";
import { AppBar, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import DrawerNav from "./DrawerNav";
import HeaderNav from "./HeaderNav";
import { AppProviderContext } from "../../integration/context/appProviderContext";
import { server } from "../../helpers/utils/constants";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#950740",
    paddingRight: "29px",
    paddingLeft: "30px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
}));

const Navbar = (props) => {
  let { state } = useContext(AppProviderContext);
  let token = state.token;
  const { header } = useStyles();
  let navigate = useNavigate();

  const [mobileView, setMobileView] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  let role, imageUrl, email;

  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
    // email = decoded.email;
    imageUrl = server + decodedToken.image;
    // role = decoded.role;
  } else token = null;

  let buttons = [];

  if (!token) {
    buttons = [
      {
        label: "Login",
        href: "/login",
        test: "login-link",
      },
      {
        label: "Sign Up",
        href: "/signup",
        test: "signup-link",
      },
    ];
  }

  if (token) {
    buttons = [
      {
        label: "Find place",
        href: "/",
      },
      {
        label: "New place",
        href: "/places/new",
      },
      {
        label: "My places",
        href: "/places/myplaces",
      },
      {
        label: "Favourites",
        href: "/places/myfavourites",
      },
      {
        label: "Search",
        href: "/search",
      },
    ];
  }

  if (token && role === "admin") {
    buttons = [
      {
        label: "Home",
        href: "/",
        test: "home-link",
      },
      {
        label: "Courses",
        href: "/courses",
        test: "courses-link",
      },
      {
        label: "Users",
        href: "/users",
        test: "users-link",
      },
      {
        label: "Create course",
        href: "/newcourse",
        test: "newcourse-link",
      },
    ];
  }

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    if (!state.token) {
      navigate("/login");
    }
  }, []);

  const handleDrawerOpen = () => setOpenDrawer(true);
  const handleDrawerClose = () => setOpenDrawer(false);

  return (
    <header data-test="header">
      <AppBar className={header} position="static" data-test="app-bar">
        {mobileView ? (
          <DrawerNav
            data-test="drawer-nav"
            buttons={buttons}
            token={token}
            imageUrl={imageUrl}
            email={email}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            openDrawer={openDrawer}
          />
        ) : (
          <HeaderNav
            data-test="header-nav"
            buttons={buttons}
            token={token}
            imageUrl={imageUrl}
            email={email}
          />
        )}
      </AppBar>
    </header>
  );
};

export default Navbar;
