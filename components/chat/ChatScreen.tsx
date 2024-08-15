"use client";
import React, { useEffect, useState } from "react";
import ChatSender from "./ChatSender";
import ChatReceiver from "./ChatReceiver";
import { UsersIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { Message } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { clientPusher } from "@/pusher";

const messages = [
  {
    user_id: "1",
    id: "1",
    message: "Selam, nasılsın?",
    time: "11:39 AM",
  },
  {
    user_id: "2",
    id: "2",
    message: "Selam! İyiyim, sen nasılsın?",
    time: "11:40 AM",
  },
  {
    user_id: "1",
    id: "3",
    message: "Ben de iyiyim, teşekkürler. Bugün neler yaptın?",
    time: "11:42 AM",
  },
  {
    user_id: "2",
    id: "4",
    message: "Sabah bir toplantım vardı.",
    time: "11:43 AM",
  },
  {
    user_id: "2",
    id: "5",
    message: "Şimdi biraz çalışıyorum.",
    time: "11:44 AM",
  },
  {
    user_id: "2",
    id: "6",
    message: "Sonra da bir sunum hazırlamam gerekiyor.",
    time: "11:45 AM",
  },
  {
    user_id: "1",
    id: "7",
    message: "Yoğun bir gün gibi görünüyor!",
    time: "11:46 AM",
  },
  {
    user_id: "1",
    id: "8",
    message: "Ben de yeni bir projeye başladım.",
    time: "11:47 AM",
  },
  {
    user_id: "1",
    id: "9",
    message: "Bugün onun üzerinde çalışıyorum.",
    time: "11:48 AM",
  },
  {
    user_id: "2",
    id: "10",
    message: "Hangi proje? Merak ettim.",
    time: "11:49 AM",
  },
  {
    user_id: "1",
    id: "11",
    message: "Yeni bir web uygulaması geliştirmeye başladık.",
    time: "11:50 AM",
  },
  {
    user_id: "1",
    id: "12",
    message: "Henüz başındayız, ama çok heyecan verici.",
    time: "11:51 AM",
  },
  {
    user_id: "2",
    id: "13",
    message: "Kulağa harika geliyor! Ne tür bir uygulama?",
    time: "11:52 AM",
  },
  {
    user_id: "1",
    id: "14",
    message:
      "Bir proje yönetim aracı, kullanıcıların iş süreçlerini daha iyi yönetmelerini sağlamak istiyoruz.",
    time: "11:54 AM",
  },
  {
    user_id: "2",
    id: "15",
    message: "Gerçekten ilginç. Hangi teknolojileri kullanıyorsunuz?",
    time: "11:56 AM",
  },
  {
    user_id: "1",
    id: "16",
    message: "React ve TypeScript ile geliştirme yapıyoruz.",
    time: "11:58 AM",
  },
  {
    user_id: "1",
    id: "17",
    message: "Backend tarafında ise Node.js kullanıyoruz.",
    time: "11:59 AM",
  },
  {
    user_id: "2",
    id: "18",
    message: "Güzel seçimler, başarılar dilerim!",
    time: "12:01 PM",
  },
  {
    user_id: "1",
    id: "19",
    message:
      "Teşekkürler! Yardımcı olabileceğin bir şey olursa mutlaka haber veririm.",
    time: "12:03 PM",
  },
  {
    user_id: "2",
    id: "20",
    message: "Tabii ki, her zaman hazırım!",
    time: "12:05 PM",
  },
  {
    user_id: "1",
    id: "21",
    message: "Bu arada, hafta sonu için planların var mı?",
    time: "12:07 PM",
  },
  {
    user_id: "2",
    id: "22",
    message: "Henüz bir plan yapmadım, senin var mı?",
    time: "12:09 PM",
  },
  {
    user_id: "1",
    id: "23",
    message: "Biraz doğa yürüyüşü yapmayı düşünüyorum.",
    time: "12:11 PM",
  },
  {
    user_id: "1",
    id: "24",
    message: "Belki sen de katılmak istersin?",
    time: "12:12 PM",
  },
  {
    user_id: "2",
    id: "25",
    message: "Harika olur! Hangi parkta?",
    time: "12:13 PM",
  },
  {
    user_id: "1",
    id: "26",
    message: "Belgrad Ormanı'nda düşünüyorum, sabah erken saatlerde.",
    time: "12:15 PM",
  },
  {
    user_id: "2",
    id: "27",
    message: "Tamam, kesinlikle gelirim. Hangi saatte buluşuyoruz?",
    time: "12:17 PM",
  },
  {
    user_id: "1",
    id: "28",
    message: "Sabah 7'de orada olmayı planlıyorum.",
    time: "12:18 PM",
  },
  {
    user_id: "2",
    id: "29",
    message: "Anlaştık, sabırsızlanıyorum!",
    time: "12:19 PM",
  },
];

const ChatScreen = () => {
  const pathname = usePathname();
  const {
    data: { messages } = {},
    error,
    mutate,
  } = useSWR<{ messages: Message[] }>(
    "/api/getMessages/" + pathname.split("/").pop(),
    fetcher
  );
  const { data: session } = useSession();
  const [orderedMessages, setOrderedMessages] = useState<Message[]>();
  useEffect(() => {
    const sortedMessages = messages?.sort((a, b) => {
      return a.created_at - b.created_at;
    });
    setOrderedMessages(sortedMessages);
  }, [messages]);
  useEffect(() => {
    const channel = clientPusher.subscribe(pathname.split("/").pop()!);
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((message) => message.id === data.id)) return;
      await mutate(
        () => fetcher("/api/getMessages/" + pathname.split("/").pop()),
        {
          optimisticData: { messages: [data, ...(messages || [])] },
          rollbackOnError: true,
        }
      );
    });

    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages, mutate, pathname]);
  return (
    <div className="px-5 flex-1 flex flex-col transition-all">
      <div className="pt-8 pb-20 w-full flex items-center justify-center">
        <div>
          <div className="w-32 h-32 rounded-full bg-blue-600/15 flex items-center justify-center">
            <UsersIcon className="w-12 h-12 text-blue-500" />
          </div>
          <div className="mt-4 font-semibold text-2xl text-center text-primary">
            Group
          </div>
        </div>
      </div>
      {orderedMessages?.map((item, index) =>
        session?.user?.email === item.email ? (
          <ChatSender
            key={index}
            nextId={messages?.[index + 1]?.email}
            prevId={messages?.[index - 1]?.email}
            item={item}
          />
        ) : (
          <ChatReceiver
            key={index}
            nextId={messages?.[index + 1]?.email}
            prevId={messages?.[index - 1]?.email}
            item={item}
          />
        )
      )}
    </div>
  );
};

export default ChatScreen;
