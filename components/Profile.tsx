"use client";
import {
  ArrowRightStartOnRectangleIcon,
  AtSymbolIcon,
  PencilIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Separator } from "./ui/separator";
import { signOut } from "next-auth/react";
const Profile = () => {
  return (
    <div>
      <div className="text-sm font-semibold text-primary">Profile</div>
      <div className="mt-4 w-20 h-20 mx-auto rounded-full bg-blue-600/20 dark:bg-blue-500/20 text-blue-600 text-xl flex items-center justify-center">
        Y
      </div>
      <div className="flex items-center justify-center mt-4">
        <button className="font-semibold text-primary bg-primary/5 hover:bg-primary/10 transition-all rounded-full px-2.5 py-1.5 text-xs">
          Edit photo
        </button>
      </div>
      <div className="mt-4">
        <div className="cursor-pointer flex items-center gap-3 min-h-10 px-2 hover:bg-primary/5 rounded-lg transition-all">
          <span>
            <UserIcon className="w-5 h-5" />
          </span>
          <div className="flex-1 text-xs text-primary">Your name</div>
        </div>
        <div className="cursor-pointer flex items-center gap-3 min-h-10 px-2 hover:bg-primary/5 rounded-lg transition-all">
          <span>
            <PencilIcon className="w-5 h-5" />
          </span>
          <div className="flex-1 text-xs text-primary">About</div>
        </div>
        <div className="mt-2 px-2 text-xs text-primary/75">
          Your profile and changes to it will be visible to people you message,
          contacts and groups.
        </div>
        <Separator className="mt-6 mb-3" />
        <div className="cursor-pointer flex items-center gap-3 min-h-10 px-2 hover:bg-primary/5 rounded-lg transition-all">
          <span>
            <AtSymbolIcon className="w-5 h-5" />
          </span>
          <div className="flex-1 text-xs text-primary">Username</div>
        </div>
        <div className="mt-2 px-2 text-xs text-primary/75">
          People can now message you using your optional username so you
          don&apos;t have to give out your phone number.
        </div>
        <Separator className="mt-4 mb-3" />
        <div
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="cursor-pointer flex items-center gap-3 min-h-10 px-2 hover:bg-rose-600/5 text-rose-500 rounded-lg transition-all"
        >
          <span>
            <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
          </span>
          <div className="flex-1 text-xs ">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
