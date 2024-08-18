import React from "react";
import { Button } from "../ui/button";
import {
  Cog6ToothIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { SIDEBAR_TOP_NAV } from "@/lib/constants";
import Link from "next/link";
import ChatRow from "../chat/ChatRow";
import SidebarThemeChanger from "./SidebarThemeChanger";
import SidebarButton from "./SidebarButton";
import SidebarProfileButton from "./SidebarProfileButton";
import { Chat } from "@/lib/types";
import SidebarCreateChat from "./SidebarCreateChat";
import SignalLogo from "../signal-logo";

const Sidebar = async() => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getChats`,{
      cache:'no-cache'
    }
  ).then((res) => res.json());

  const chats:Chat[]=data.chats;
  return (
    <div className="w-72 lg:w-96 flex h-screen overflow-hidden bg-primary-foreground border-r">
      <nav className="w-14 lg:w-16 bg-red border-r py-4 px-2 flex flex-col justify-between overflow-auto">
        <ul className="flex flex-col items-center gap-2 w-full">
          <li className="py-1.5">
            <Link href={"/"}>
              <SignalLogo className="w-6 h-auto"/>
            </Link>
          </li>
          {SIDEBAR_TOP_NAV.map((item, index) => (
            <li key={item.id} className="w-full">
              <SidebarButton tooltip={item.label}>
                <item.icon className="w-5 h-5 text-primary" />
              </SidebarButton>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col items-center gap-2 w-full">
          <li className="w-full">
            <SidebarThemeChanger />
          </li>
          <li className="w-full">
            <SidebarButton tooltip="Settings">
              <Cog6ToothIcon className="w-5 h-5 text-primary" />
            </SidebarButton>
          </li>
          <li className="w-full">
            <SidebarProfileButton />
          </li>
        </ul>
      </nav>
      <div className="flex-1 pt-4 flex flex-col">
        <div className="flex items-center justify-between gap-2 px-2.5 lg:px-4">
          <h4 className="font-medium text-xl text-primary">Chats</h4>
          <div className="flex items-center gap-2">
            {/* <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:bg-primary/5 dark:hover:bg-primary/10 text-primary/80"
            >
              <PencilSquareIcon className="w-5 h-5" />
            </Button> */}
            <SidebarCreateChat/>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:bg-primary/5 dark:hover:bg-primary/10 text-primary/80"
            >
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="mt-4 px-2.5 lg:px-4">
          <div className="relative ">
            <MagnifyingGlassIcon className="top-1/2 left-2.5 -translate-y-1/2 absolute w-3.5 h-3.5 text-primary/50" />
            <input
              className="w-full bg-primary/5 dark:bg-primary/10 rounded-lg text-primary text-sm pr-4 pl-8 py-1 placeholder:text-primary/60 outline-none"
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1.5 flex-1 overflow-auto px-2.5 lg:px-4">
          {chats?.map((item: any, i: React.Key | null | undefined) => (
            <ChatRow key={i} item={item}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
