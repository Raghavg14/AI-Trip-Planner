import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";

function LogInDialog({ openLoginDialog, setOpenLoginDialog, onLoginSuccess }) {
  const LoginHandler = useGoogleLogin({
    onSuccess: (response) => getUserInfo(response),
    onError: (error) => console.log(error),
  });

  const getUserInfo = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response?.data));
        setOpenLoginDialog(false);
        onLoginSuccess();
      });
  };
  return (
    <Dialog
      open={openLoginDialog}
      onOpenChange={(open) => setOpenLoginDialog(open)}
    >
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogHeader>
          <DialogDescription>
            <div>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">
                Securely Sign-in with Google
              </h2>
              <p>To generate trip please login</p>
            </div>
            <Button
              onClick={LoginHandler}
              className="w-full mt-5 flex gap-2 items-center"
            >
              <FcGoogle className="h-7 w-7" />
              Signin with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LogInDialog;
