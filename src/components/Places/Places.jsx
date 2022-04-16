import React, { useState, useEffect, useContext } from 'react';

import Place from './Place';

import { AppProviderContext } from '../../integration/context/appProviderContext';

const Places = () => {
  const { actions } = useContext(AppProviderContext);
  const [placeDetails, setPlaceDetails] = useState(null);

  const getPlaceId = async (placeId) => {
    let place;
    try {
      place = await actions.fetchRandomPlace();
    } catch (err) {}
    // console.log(place);
    setPlaceDetails(place.place);
    return place;
  };

  useEffect(() => {
    const place = getPlaceId('624354e2a34189196dbaf09c');
  }, []);

  useEffect(() => {
    // console.log(placeDetails);
  }, [placeDetails]);
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
