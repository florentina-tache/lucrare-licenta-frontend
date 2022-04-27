import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ImageUpload from '../shared/ImageUpload';
import { server } from '../../helpers/utils/constants';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

// import itemData from './itemData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 1000,
    height: 1000,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const UserPlaces = ({ itemData }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  const onEditHandler = () => {
    navigate('/places/edit/:placeId');
  };

  return (
    <div className={classes.root}>
      <ImageList rowHeight={300} className={classes.imageList}>
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
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton
                  color='error'
                  aria-label='upload picture'
                  component='span'
                  onClick={onEditHandler}
                >
                  <CreateIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default UserPlaces;
