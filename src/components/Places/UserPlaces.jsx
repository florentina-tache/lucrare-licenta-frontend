import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

// import itemData from './itemData';

const itemData = [
  {
    img: 'https://www.impact.ro/wp-content/uploads/2021/12/New-York.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://www.impact.ro/wp-content/uploads/2021/12/New-York.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://www.impact.ro/wp-content/uploads/2021/12/New-York.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://www.impact.ro/wp-content/uploads/2021/12/New-York.jpg',
    title: 'Image',
    author: 'author',
  },
  {
    img: 'https://www.impact.ro/wp-content/uploads/2021/12/New-York.jpg',
    title: 'Image',
    author: 'author',
  },
];

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

const UserPlaces = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={300} className={classes.imageList}>
        <ImageListItem key='Subheader' cols={2} style={{ height: 'auto' }}>
          <ListSubheader component='div'>December</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title} />
            <ImageListItemBar
              title={item.title}
              subtitle={<span>by: {item.author}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${item.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
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
