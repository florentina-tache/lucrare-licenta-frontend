import React, { useState, useEffect, useContext } from 'react';

import Place from './Place';

import { AppProviderContext } from '../../integration/context/appProviderContext';

const Places = () => {
  const { actions } = useContext(AppProviderContext);
  const [placeDetails, setPlaceDetails] = useState(null);

  const getRandomPlace = async () => {
    let place;
    try {
      place = await actions.fetchRandomPlace();
    } catch (err) {}
    setPlaceDetails(place.place);
  };

  useEffect(() => {
    getRandomPlace();
  }, []);

  useEffect(() => {}, [placeDetails]);
  return (
    <>
      {placeDetails && (
        <Place
          title={placeDetails.title}
          image={placeDetails.image}
          description={placeDetails.description}
        />
      )}
    </>
  );
};

export default Places;
