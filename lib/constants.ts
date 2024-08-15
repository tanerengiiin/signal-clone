import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
  GifIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  PaperClipIcon,
  PhoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
export const SIDEBAR_TOP_NAV = [
  {
    id: "chats",
    icon: ChatBubbleOvalLeftIcon,
    label: "Chats",
  },
  {
    id: "calls",
    icon: PhoneIcon,
    label: "Calls",
  },
];

export const CHAT_TOPBAR_NAV = [
  {
    id: "video",
    icon: VideoCameraIcon,
    label: "Video",
  },
  {
    id: "phone",
    icon: PhoneIcon,
    label: "Phone",
  },
  {
    id: "search",
    icon: MagnifyingGlassIcon,
    label: "Search",
  },
  {
    id: "more",
    icon: EllipsisHorizontalIcon,
    label: "More",
  },
];

export const CHAT_ACTION_NAV = [
  {
    id: "sticker",
    icon: GifIcon,
    label: "Sticker",
  },
  {
    id: "microphone",
    icon: MicrophoneIcon,
    label: "Microphone",
  },
  {
    id: "attach",
    icon: PaperClipIcon,
    label: "Attach",
  },
];

export const CHAT_DETAIL_NAV = [
  {
    id: "video",
    icon: VideoCameraIcon,
    label: "Video",
  },
  {
    id: "mute",
    icon: BellIcon,
    label: "Mute",
  },
  {
    id: "search",
    icon: MagnifyingGlassIcon,
    label: "Search",
  },
];
