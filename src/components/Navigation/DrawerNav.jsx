import React from 'react';
import {
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Box,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// import * as authActions from "../../actions/authActions";

const useStyles = makeStyles((theme) => ({
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left',
  },
  avatarSmall: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(7),
  },
  drawerContainer: {
    flex: 2,
    padding: '20px 30px',
  },
  drawerBox: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerProfile: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

const DrawerNav = (props) => {
  //   const history = useNavigate();
  const { avatarSmall, drawerProfile, logo, drawerBox, drawerContainer } =
    useStyles();
  const {
    token,
    imageUrl,
    email,
    buttons,
    handleDrawerOpen,
    handleDrawerClose,
    openDrawer,
  } = props;

  const logout = () => {
    // dispatch(authActions.logout());
    // history.push('/');
  };

  const Applogo = (
    <Typography
      data-test='app-logo'
      variant='h6'
      component='h1'
      className={logo}
    >
      FINDER
    </Typography>
  );

  const displayProfileMobile = (
    <Box display='flex' flexDirection='column' className={drawerProfile}>
      <Avatar
        data-test='user-avatar'
        alt='User image'
        src={imageUrl}
        className={avatarSmall}
      />
      <Typography data-test='user-email'>{email}</Typography>
      <Button
        data-test='logout-button'
        variant='outlined'
        color='primary'
        onClick={logout}
      >
        Log out
      </Button>
    </Box>
  );

  const getDrawerChoices = () => {
    return buttons.map(({ label, href, test }) => {
      return (
        <Link
          data-test={test}
          {...{
            component: RouterLink,
            to: href,
            color: 'inherit',
            style: { textDecoration: 'none' },
            key: label,
          }}
        >
          <MenuItem>{label}</MenuItem>
        </Link>
      );
    });
  };

  return (
    <Toolbar variant='dense' data-test='drawer-nav'>
      <IconButton
        data-test='menu-button'
        {...{
          edge: 'start',
          color: 'inherit',
          'aria-label': 'menu',
          'aria-haspopup': 'true',
          onClick: handleDrawerOpen,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        data-test='drawer'
        {...{
          anchor: 'left',
          open: openDrawer,
          onClose: handleDrawerClose,
        }}
      >
        <Box
          data-test='drawer-box'
          display='flex'
          flexDirection='column'
          className={drawerBox}
        >
          <Box className={drawerContainer}>{getDrawerChoices()}</Box>
          {token && displayProfileMobile}
        </Box>
      </Drawer>
      <div>{Applogo}</div>
    </Toolbar>
  );
};

export default DrawerNav;
