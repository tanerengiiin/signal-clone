"use client";
import React from "react";
import { useTheme } from "next-themes";
import SidebarButton from "./SidebarButton";
import { SunIcon } from "@radix-ui/react-icons";

const SidebarThemeLight = () => {
  const { setTheme } = useTheme();
  return (
    <SidebarButton
      onClick={() => setTheme("light")}
      tooltip={"Switch to Light"}
    >
      <SunIcon className="w-5 h-5 text-primary" />
    </SidebarButton>
  );
};

export default SidebarThemeLight;
