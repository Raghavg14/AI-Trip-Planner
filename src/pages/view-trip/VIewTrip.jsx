import Hotels from "@/components/view-trip/Hotels";
import InfoSection from "@/components/view-trip/InfoSection";
import PlacesToVist from "@/components/view-trip/PlacesToVist";
import { db } from "@/Service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function VIewTrip() {
  const [tripData, setTripData] = useState();
  const { tripId } = useParams();

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  const getTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTripData(docSnap?.data());
    } else {
      console.log("No Trip Found");
      toast("No Trip Found", {
        action: { label: "🗙" },
      });
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InfoSection tripData={tripData} />
      <Hotels tripData={tripData} />
      <PlacesToVist tripData={tripData} />
    </div>
  );
}

export default VIewTrip;
