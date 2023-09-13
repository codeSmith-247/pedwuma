import { useState, useRef } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

// eslint-disable-next-line react/prop-types
function LocationInput({ onSelectLocation, lat = 0, lng = 0 , location, ...props}) {

const [center, setCenter] = useState({ lat: parseFloat(lat), lng: parseFloat(lng), location: location });

const autocompleteRef = useRef(null);



const onPlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();

    if (place.geometry) {
    const selectedAddress = place.formatted_address;
    setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        location: selectedAddress,
    });

    onSelectLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        location: selectedAddress,
    });
    }
};

const libraries = ['places'];

const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: 'AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw',
  libraries: libraries,
});

if(isLoaded)
return (
    <>
      <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceSelected}
      >
          <input
          className={`w-full h-full p-2 px-5 ring-0 hover:border-green-400 hover:ring-0 outline-none min-h-[60px] search-box bg-white border-2 border-green-400 rounded-md shadow-lg mb-5`}
          type="text"
          placeholder="Enter an address"
          onChange={(e) => setCenter({...center, location: e.target.value })}
          value={center?.location}
          {...props}
          />
      </Autocomplete>
          <input type="hidden" value={center.lat} name="lat" />
          <input type="hidden" value={center.lng} name="lng" />
      
    </>
);
else return "Loading..."
}

export default LocationInput;

