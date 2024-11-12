import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.id", "places.displayName", "places.photos"],
  },
};

const GetPlacePhotoDetails = (data) => axios.post(BASE_URL, data, config);

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

export const GetPlacePhotoHelper = async (placeName) => {
  const data = {
    textQuery: placeName,
  };
  let PhotoURL;

  await GetPlacePhotoDetails(data).then((res) => {
    PhotoURL = PHOTO_REF_URL.replace(
      "{NAME}",
      res?.data?.places[0]?.photos[1]?.name ||
        res?.data?.places[0]?.photos[0]?.name
    );
  });
  return PhotoURL;
};
