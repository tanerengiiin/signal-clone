"use client";
import React from "react";
import { MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import SidebarButton from "./SidebarButton";

const SidebarThemeDark = () => {
  const { setTheme } = useTheme();
  return (
    <SidebarButton
      onClick={() => setTheme("dark")}
      tooltip={"Switch to Dark"}
    >
      <MoonIcon className="w-5 h-5 text-primary" />
    </SidebarButton>
  );
};

export default SidebarThemeDark;
