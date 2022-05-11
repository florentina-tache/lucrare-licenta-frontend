import React, { useState, useEffect, useContext } from 'react';

import Place from './Place';

import { AppProviderContext } from '../../integration/context/appProviderContext';

const Places = () => {
  const { state, actions } = useContext(AppProviderContext);
  const [placeDetails, setPlaceDetails] = useState(null);

  let token = state.token;

  const getRandomPlace = async () => {
    let place;
    try {
      place = await actions.fetchRandomPlace(token);
    } catch (err) {}
    setPlaceDetails(place.place);
  };

  useEffect(() => {
    getRandomPlace();
  }, []);

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
