import React from "react";
import { Button, ButtonProps } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SidebarButtonProps = ButtonProps & {
  tooltip?: string;
};


const SidebarButton: React.FC<SidebarButtonProps> = ({
  className,
  tooltip,
  children,
  ...props
}) => {
  return !tooltip ? (
    <Button
      size={"icon"}
      variant={"ghost"}
      className={`hover:bg-primary/5 dark:hover:bg-primary/10 w-full h-9 ${className}`}
      {...props}
    >
      {children}
    </Button>
  ) : (
    <TooltipProvider delayDuration={200} skipDelayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            className={`hover:bg-primary/5 dark:hover:bg-primary/10 w-full h-9 ${className}`}
            {...props}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarButton;
