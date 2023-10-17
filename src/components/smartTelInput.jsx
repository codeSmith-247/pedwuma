import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Label, TextInput } from 'flowbite-react';
import { useLoadScript } from '@react-google-maps/api';
import axios from 'axios';
import Skeleton from "react-loading-skeleton";
import { telnumPrefixes, urls, read } from '../databank';
import Swal from 'sweetalert2';

const libraries = ['places'];


const SmartTelInput = () => {
  const navigate = useNavigate();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw', // Replace with your actual API key
    libraries,
  });

  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    if (isLoaded) {

      read.ipInfo().then( response => {

        const { lng, lat } = response;

        console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw`, response);
  
        axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBREjZAMtf-utlBXK1GTVkDdNNzYS3ZAiw`
        ).then(response => {
          if (response.data.results && response.data.results.length > 0) {
            const addressData = response.data.results[0];
            const countryCode = addressData.address_components.find(
                (component) => component.types.includes('country')
            )?.short_name;
            setLocationData({
              countryCode: countryCode,
              formattedAddress: addressData.formatted_address,
              phonePrefix: telnumPrefixes[countryCode],
              lng: lng,
              lat: lat,
            });
          }
        })

      });


    }
  }, [isLoaded, navigate]);

  if (loadError || !isLoaded) return (<Skeleton className="mt-2" height={50} />)

  return (
    <div>
      {locationData && (
        <div className="max-w-md">
            <div className="mb-2 block">
                <Label
                    htmlFor="number"
                    value="Tel Number"
                />
            </div>
            <TextInput
                addon={`+${locationData.phonePrefix}`}
                id="number"
                placeholder="559596543"
                name="number"
                required
            />
            <input type="hidden" name="address" value={locationData.formattedAddress} />
            <input type="hidden" name="lng" value={locationData.lng} />
            <input type="hidden" name="lat" value={locationData.lat} />
        </div>
      )}
    </div>
  );
};

export default SmartTelInput;
