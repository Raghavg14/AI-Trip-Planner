import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import LogInDialog from "./LogInDialog";

function Header() {
  const navigate = useNavigate();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogoClick = () => {
    navigate("/");
  };

  const LogoutHandler = () => {
    googleLogout();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img
        className="cursor-pointer"
        src="/logo.svg"
        alt="Logo"
        onClick={handleLogoClick}
      />
      {user ? (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => navigate("/create-trip")}
          >
            Create Trip
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => navigate("/my-trips")}
          >
            My Trips
          </Button>
          <Popover>
            <PopoverTrigger>
              <img
                src={user?.picture}
                className="h-[35px] w-[35px] rounded-full"
              />
            </PopoverTrigger>
            <PopoverContent>
              <p className="cursor-pointer" onClick={LogoutHandler}>
                Logout
              </p>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <>
          <Button onClick={() => setOpenLoginDialog(true)}>Sign in</Button>
          <LogInDialog
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
            onLoginSuccess={() => {
              window.location.reload();
            }}
          />
        </>
      )}
    </div>
  );
}

export default Header;
