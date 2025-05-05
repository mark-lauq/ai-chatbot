"use client";

import {
  memo,
  // useEffect, useState
} from "react";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
// import { client } from "@/lib/api-client";
// import type { Chat } from "@/server/db/schema";

function PureAppSidebar() {
  // const [chats, setChats] = useState<Chat[]>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await (await client.api.chat.$get()).json();

  //       setChats(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Sidebar className="border-r-gray-200">
      <SidebarHeader className="font-bold">AI Chatbot</SidebarHeader>
    </Sidebar>
  );
}

export const AppSidebar = memo(PureAppSidebar);
