"use client";
import React from "react";
import SidebarButton from "./SidebarButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { DialogTrigger, Dialog, DialogContent } from "../ui/dialog";
import Profile from "../Profile";

const SidebarProfileButton = () => {
  const { data: session } = useSession();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarButton tooltip="Profile">
          <Avatar className="w-6 h-6">
            <AvatarImage src={session?.user?.image || ''} />
            <AvatarFallback className="text-[10px]">CN</AvatarFallback>
          </Avatar>
        </SidebarButton>
      </DialogTrigger>
      <DialogContent className="w-[22rem] p-4 !rounded-lg">
        <Profile/>
      </DialogContent>
    </Dialog>
  );
};

export default SidebarProfileButton;
