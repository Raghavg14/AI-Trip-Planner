import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { GetPlacePhotoHelper } from "@/Service/GlobalPhotoAPI";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/Service/firebaseConfig";
import { useNavigate } from "react-router-dom";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

function InfoSection({ tripData }) {
  const [photoURL, setPhotoURL] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    tripData && GetPlacePhoto();
  }, [tripData]);

  const GetPlacePhoto = async () => {
    const URL = await GetPlacePhotoHelper(
      tripData?.userSelection?.location?.label
    );
    setPhotoURL(URL);
  };

  const DeleteTripHandler = async () => {
    setLoading(true);
    console.log(tripData?.id);
    await deleteDoc(doc(db, "AITrips", tripData?.id));
    navigate("/my-trips");
    setLoading(false);
  };

  return (
    <div>
      <img
        src={photoURL}
        className="h-[400px] w-full object-center rounded-xl "
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {tripData?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              📆 {tripData?.userSelection?.NoOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              🥂 {tripData?.userSelection?.NoOfPeoples}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md">
              💰 {tripData?.userSelection?.budget} budget
            </h2>
          </div>
        </div>
        <Button disabled={loading} onClick={DeleteTripHandler}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Delete Trip"
          )}
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
