import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "600px",
    height: "380px",
};

const AllLocationsMap = ({ placesLocations }) => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyAdexyhNBrYJwGMenI5UeVW2ENJ3mDdruc",
    });

    const [map, setMap] = React.useState(null);
    const zoom = 1;

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={placesLocations[0]}
            zoom={zoom}
            onUnmount={onUnmount}
        >
            <>
                {placesLocations.map((location) => {
                    return (
                        <Marker position={location} />
                    )
                })}
            </>
        </GoogleMap>
    ) : (
        <></>
    );
};

export default React.memo(AllLocationsMap);
