import React, { useContext } from 'react';
import {
  Toolbar,
  Button,
  Typography,
  makeStyles,
  Box,
  Avatar,
} from '@material-ui/core';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppProviderContext } from '../../integration/context/appProviderContext';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: '#039154',
    paddingRight: '29px',
    paddingLeft: '30px',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  logo: {
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
  menuButton: {
    fontWeight: 550,
    size: '18px',
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 12,
  },
}));

const HeaderNav = ({ token = null, buttons, email, imageUrl }) => {
  const { actions } = useContext(AppProviderContext);
  const { logo, menuButton, profile, avatarSmall, text, toolbar } = useStyles();
  let navigate = useNavigate();

  const logout = () => {
    actions.logout();
    navigate('/login');
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

  const getMenuButtons = () => {
    return buttons.map(({ label, href, test }) => {
      return (
        <Button
          data-test={test}
          {...{
            key: label,
            color: 'inherit',
            to: href,
            component: RouterLink,
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const displayProfile = (
    <Box className={profile}>
      <Avatar
        data-test='user-avatar'
        alt='User image'
        src={imageUrl}
        className={avatarSmall}
      />
      <Typography data-test='user-email' className={text}>
        {email}
      </Typography>
      <Button
        data-test='logout-button'
        onClick={logout}
        color='inherit'
        className={menuButton}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <Toolbar className={toolbar} variant='dense' data-test='header-nav'>
      {Applogo}
      <div>{getMenuButtons()}</div>
      {token && displayProfile}
    </Toolbar>
  );
};
export default HeaderNav;
