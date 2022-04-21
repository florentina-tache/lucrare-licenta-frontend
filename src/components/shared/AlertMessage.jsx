import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Alert from '@mui/material/Alert';

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: theme.spacing(3),
  },
}));

const AlertMessage = ({ text = 'Error' }) => {
  const classes = useStyles();

  return (
    text && (
      <Alert severity='error' className={classes.error}>
        {text}
      </Alert>
    )
  );
};

export default AlertMessage;
