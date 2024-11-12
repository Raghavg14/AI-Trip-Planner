import { chatSession } from "@/Service/AIModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/Service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import LogInDialog from "@/components/custom/LogInDialog";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSuccess = () => {
    GenerateTripHandler();
  };

  const GenerateTripHandler = async () => {
    if (formData?.NoOfDays > 14) {
      toast("Please enter days less than 14", {
        action: { label: "🗙" },
      });
      return;
    }
    if (
      !formData?.budget ||
      !formData?.location ||
      !formData?.NoOfDays ||
      !formData?.NoOfPeoples
    ) {
      toast("Please fill all the details", {
        action: { label: "🗙" },
      });
      return;
    }

    const user = localStorage.getItem("user");

    if (!user) {
      setOpenLoginDialog(true);
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{NoOfDays}", formData?.NoOfDays)
      .replace("{NoOfPeoples}", formData?.NoOfPeoples)
      .replace("{budget}", formData?.budget)
      .replace("{NoOfDays}", formData?.NoOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAITrip(result?.response?.text());
  };

  const SaveAITrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      id: docId,
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value), handleInputChange("location", value);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            onChange={(e) => {
              handleInputChange("NoOfDays", e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget == item.title && "shadow-lg border-black"
                }`}
                onClick={() => {
                  handleInputChange("budget", item.title);
                }}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelectTravelsList.map((item) => (
              <div
                key={item.id}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.NoOfPeoples == item.people &&
                  "shadow-lg border-black"
                }`}
                onClick={() => {
                  handleInputChange("NoOfPeoples", item.people);
                }}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" my-10 justify-end flex">
        <Button disabled={loading} onClick={GenerateTripHandler}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <LogInDialog
        openLoginDialog={openLoginDialog}
        setOpenLoginDialog={setOpenLoginDialog}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default CreateTrip;
