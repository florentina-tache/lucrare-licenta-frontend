import React, { useState, useEffect, useContext } from 'react';
import UserPlaces from './UserPlaces';

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

const AddedPlaces = () => {
  return <UserPlaces itemData={itemData} />;
};

export default AddedPlaces;
