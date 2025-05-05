"use client";

import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/messages";
import { Chat } from "@/components/chat";

export default function Home() {
  const { messages, status, input, setInput, append, stop } = useChat({
    api: "/api/agent",
  });

  return (
    <div className="w-[640px] h-[100vh] m-auto py-8 flex flex-col items-center justify-between">
      <div className="w-full h-[80vh] mb-5 overflow-auto">
        <Messages messages={messages} />
      </div>
      <div className="w-full h-[20vh]">
        <Chat
          value={input}
          setInput={setInput}
          status={status}
          append={append}
          stop={stop}
        />
      </div>
    </div>
  );
}
