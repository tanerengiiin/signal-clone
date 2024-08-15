"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
const ProfileModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const handleOpenChange = (val: boolean) => {
    if (!val) {
      if (
        window.history.state.__PRIVATE_NEXTJS_INTERNALS_TREE[1].children[0] ===
        "profile"
      ) {
        router.push("/");
        return;
      }
      router.back();
    }
  };
  return (
    <Dialog open={true} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[22rem] p-4 !rounded-lg">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
