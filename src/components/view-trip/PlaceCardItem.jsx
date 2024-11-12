import { GetPlacePhotoHelper } from "@/Service/GlobalPhotoAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const URL = await GetPlacePhotoHelper(place?.name);
    setPhotoURL(URL);
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.name},${place?.address}`}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer ">
        <img
          src={photoURL}
          className="h-[200px] w-[300px] rounded-xl object-fill"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.name}</h2>
          <p className="text-sm text-gray-500">{place?.details}</p>
          <h2 className="mt-2">🕙 {place?.timeToTravel}</h2>
          <div className="flex gap-5 mt-2">
            <h2 className="p-1 px-3 bg-gray-200 rounded-xl text-gray-500 text-sm md:text-md">
              {place?.ticketPricing}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-xl text-gray-500 text-sm md:text-md">
              ⭐ {place?.ratings}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
