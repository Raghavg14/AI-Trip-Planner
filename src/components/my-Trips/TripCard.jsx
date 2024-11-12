import { GetPlacePhotoHelper } from "@/Service/GlobalPhotoAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TripCard({ trip }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const URL = await GetPlacePhotoHelper(trip?.userSelection?.location?.label);
    setPhotoURL(URL);
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoURL}
          className="rounded-xl h-[200px] w-[300px] object-fill"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.NoOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} budget.
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default TripCard;
