import { GetPlacePhotoHelper } from "@/Service/GlobalPhotoAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HotelCardItem({ hotel }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const URL = await GetPlacePhotoHelper(hotel?.name);
    setPhotoURL(URL);
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoURL}
          className="rounded-xl h-[200px] w-[300px] object-fill"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.name}</h2>
          <h2 className="text-xs text-gray-500">📍 {hotel?.address}</h2>
          <h2 className="text-sm">🏷️ {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.ratings} </h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
