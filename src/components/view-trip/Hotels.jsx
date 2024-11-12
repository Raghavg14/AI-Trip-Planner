import React from "react";
import HotelCardItem from "./HotelCardItem";

function Hotels({ tripData }) {
  return (
    <div>
      <h2 className="font-bold font-xl my-5">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {tripData?.tripData?.hotelOptions?.map((hotel, index) => (
          <HotelCardItem hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
