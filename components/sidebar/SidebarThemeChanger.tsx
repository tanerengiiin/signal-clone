"use client";
import React from "react";
import { MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { SunIcon } from "@radix-ui/react-icons";
import SidebarButton from "./SidebarButton";

const SidebarThemeChanger = () => {
  const { setTheme, theme } = useTheme();
  const handleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };
  return (
    <SidebarButton
      onClick={handleTheme}
      tooltip={theme === "light" ? "Switch to Dark" : "Switch to Light"}
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-primary" />
      ) : (
        <SunIcon className="w-5 h-5 text-primary" />
      )}
    </SidebarButton>
  );
};

export default SidebarThemeChanger;
