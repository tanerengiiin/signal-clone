"use client";
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  ChevronLeftIcon,
  ClockIcon,
  EyeDropperIcon,
  KeyIcon,
  LinkIcon,
  NoSymbolIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Button } from "../ui/button";
import { CHAT_DETAIL_NAV } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useChatContext } from "../chat-context-provider";

const ChatDetail = () => {
  const { openChatDetail, handleChatDetail } = useChatContext();
  return (
    <div
      className={`pb-4 border-l bg-primary-foreground h-full overflow-hidden transition-all ease-in-out duration-300  ${
        openChatDetail ? "opacity-100 max-w-96" : "opacity-0 max-w-0"
      }`}
    >
      <div className="w-96 h-full overflow-auto transition-all">
        <div className="p-4 bg-primary-foreground sticky top-0 z-20">
          <Button
            onClick={() => handleChatDetail()}
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-primary/5 dark:hover:bg-primary/10 text-primary/80"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
        </div>
        <div className="space-y-6 mt-4 px-4">
          <div className=" w-full flex flex-col items-center justify-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-blue-600/15 flex items-center justify-center">
              <UsersIcon className="w-12 h-12 text-blue-500" />
            </div>
            <div className="mt-4 font-semibold text-2xl text-center text-primary">
              Group
            </div>
            <div className="flex items-center gap-4 mt-6">
              {CHAT_DETAIL_NAV.map((item, index) => (
                <Button
                  key={index}
                  variant={"ghost"}
                  className="flex flex-col h-12 w-16 bg-primary/5 hover:bg-primary/10"
                >
                  <span>
                    <item.icon className="w-5 h-5" />
                  </span>
                  <span className="text-xs mt-1 leading-none">
                    {item.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 pb-2 px-4">
              <span>
                <ClockIcon className="w-5 h-5" />
              </span>
              <div className="flex-1">
                <div className="text-xs">Disappearing messages</div>
                <div className="mt-1 text-xs opacity-80">
                  When enabled, messages sent and received will disappear.
                </div>
              </div>
              <Select defaultValue="1">
                <SelectTrigger className="w-[72px] bg-background text-xs pl-2 pr-0.5 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1" className="!text-xs">
                    Off
                  </SelectItem>
                  <SelectItem value="2" className="!text-xs">
                    1 week
                  </SelectItem>
                  <SelectItem value="3" className="!text-xs">
                    8 hours
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
              <span>
                <EyeDropperIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 text-xs text-primary">Chat Color</div>
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
            </div>
            <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
              <span>
                <BellIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 text-xs text-primary">Notifications</div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="font-semibold text-sm pl-2">2 Members</div>
            <div className="flex flex-col gap-1 mt-2">
              <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
                <span className="w-7 h-7 bg-primary/5 flex items-center justify-center rounded-full">
                  <PlusIcon className="w-4 h-4" />
                </span>
                <div className="flex-1 text-xs text-primary">Add members</div>
              </div>
              <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
                <Avatar className="w-7 h-7 text-xs ">
                  <AvatarFallback className="bg-blue-600/15 text-blue-600 font-medium">
                    Y
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-xs text-primary">You</div>
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
              <span>
                <LinkIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 text-xs text-primary">Group link</div>
              <div className="opacity-75 text-xs">Off</div>
            </div>
            <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
              <span>
                <UsersIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 text-xs text-primary">
                Requests & Invites
              </div>
              <div className="opacity-75 text-xs">0</div>
            </div>
            <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
              <span>
                <KeyIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 text-xs text-primary">Permissions</div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="cursor-pointer flex items-center gap-3 min-h-10 px-4 hover:bg-primary/5 rounded-lg transition-all">
              <span>
                <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 text-xs text-primary">Leave group</div>
            </div>
            <div className="cursor-pointer text-rose-600 flex items-center gap-3 min-h-10 px-4 hover:bg-rose-500/10 rounded-lg transition-all">
              <span>
                <NoSymbolIcon className="w-5 h-5" />
              </span>
              <div className="flex-1 text-xs">Block Group</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
