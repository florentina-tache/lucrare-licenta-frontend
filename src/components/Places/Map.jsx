import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

const Map = ({ center }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAdexyhNBrYJwGMenI5UeVW2ENJ3mDdruc',
  });

  const [map, setMap] = React.useState(null);
  const zoom = 5;

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      //   onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <Marker position={center} />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);
