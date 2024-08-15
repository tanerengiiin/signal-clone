"use client";
import { CHAT_ACTION_NAV } from "@/lib/constants";
import { FaceSmileIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useChatContext } from "../chat-context-provider";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";
import { v4 as uuid } from "uuid";
import { Message } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
const ChatAction = () => {
  const pathname=usePathname();
  const { data: { messages } = {}, error, mutate } = useSWR("/api/getMessages/"+pathname.split('/').pop(), fetcher);
  const { data: session } = useSession();
  const { repliedMessage, handleRepliedMessage } = useChatContext();
  const { theme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [value]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).id !== "openEmojiPickerButton"
      ) {
        setOpenEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleEmojiPicker = () => {
    setOpenEmojiPicker((prev) => !prev);
  };
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      value.trim().length > 0 &&
      event.key === "Enter" &&
      session?.user?.email
    ) {
      event.preventDefault();
      setValue("");
      const id = uuid();
      const message: Message = {
        id,
        message: value,
        created_at: Date.now(),
        username: session?.user?.name || "",
        profilePic: session?.user?.image || "",
        email: session?.user?.email,
      };
      const uploadMessageToUpstash = async () => {
        const data = await fetch("/api/addMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: pathname.split('/').pop(),
            message,
          }),
        }).then((res) => res.json());
        return [data.message, ...messages!];
      };

      await mutate(uploadMessageToUpstash, {
        optimisticData: [message, ...messages!],
        rollbackOnError: true,
      });
    }
  };
  if (!session) return null;
  return (
    <div className="sticky bottom-0 z-20 px-5 pb-4 pt-3 bg-background ">
      {repliedMessage ? (
        <div className="relative flex bg-blue-600/40 dark:bg-blue-600/30 rounded-t-lg rounded-b-sm mb-3 overflow-hidden transition-all">
          <button
            onClick={() => handleRepliedMessage()}
            className="absolute top-2 right-2 bg-blue-950/20 dark:bg-blue-300/20 dark:hover:bg-blue-300/30 hover:bg-blue-950/30 text-blue-950/85 dark:text-blue-50/85 rounded-full w-5 h-5 flex items-center justify-center transition-all"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
          <div className="w-[4px] bg-blue-700"></div>
          <div className="flex-1 flex flex-col gap-1 text-sm pl-2.5 pr-2 pt-2.5 pb-1">
            <span className="font-semibold text-blue-950 dark:text-blue-50">
              {repliedMessage.username}
            </span>
            <span className="text-blue-950/85 dark:text-blue-50/85">
              {repliedMessage.message}
            </span>
          </div>
        </div>
      ) : null}
      <div className="flex items-end gap-2">
        <div ref={emojiPickerRef} className="relative mb-0.5">
          <Button
            onClick={toggleEmojiPicker}
            id="openEmojiPickerButton"
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-primary/5 dark:hover:bg-primary/10 text-primary"
          >
            <FaceSmileIcon className="w-5 h-5" />
          </Button>
          <div
            className={`absolute bottom-full -translate-y-4 transition-all ${
              openEmojiPicker ? "opacity-100" : "opacity-0"
            }`}
          >
            <EmojiPicker
              open={openEmojiPicker}
              theme={theme as Theme}
              lazyLoadEmojis
              onEmojiClick={(val) => setValue((prev) => prev + val.emoji)}
              className="shadow-lg"
            />
          </div>
        </div>
        <textarea
          ref={textareaRef}
          placeholder="Message"
          className="flex-1 resize-none rounded-2xl bg-primary/5 dark:bg-primary/10 outline-none px-3.5 py-2 text-primary text-sm placeholder:text-primary/75 min-h-9 max-h-40"
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <ul className="flex items-center gap-2 mb-0.5">
          {CHAT_ACTION_NAV.map((item, index) =>
            item.id === "microphone" && value ? null : (
              <li key={index}>
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="hover:bg-primary/5 dark:hover:bg-primary/10 text-primary"
                >
                  <item.icon className="w-5 h-5" />
                </Button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ChatAction;
