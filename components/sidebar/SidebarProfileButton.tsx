"use client";
import Link from "next/link";
import React from "react";
import SidebarButton from "./SidebarButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

const SidebarProfileButton = () => {
  const { data: session } = useSession();
  return (
    <Link href="/profile">
      <SidebarButton tooltip="Profile">
        <Avatar className="w-6 h-6">
          <AvatarImage src={session?.user?.image || ''} />
          <AvatarFallback className="text-[10px]">CN</AvatarFallback>
        </Avatar>
      </SidebarButton>
    </Link>
  );
};

export default SidebarProfileButton;
