import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVist({ tripData }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-5">Places to Visit</h2>

      <div>
        {tripData?.tripData?.itinerary?.map((item, index) => (
          <div className="mt-5" key={index}>
            <h2 className="font-md text-lg">{item.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item?.plan?.map((place, index) => (
                <div key={index}>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place?.bestTime}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVist;
