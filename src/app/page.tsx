"use client";

import { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Messages } from "@/components/messages";
import { Chat } from "@/components/chat";
import { client } from "@/lib/api-client";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { messages, setMessages, input, setInput, append, stop, status } =
    useChat({
      api: "/api/agent",
      experimental_throttle: 100,
      onFinish: async ({ role, content }) => {
        try {
          await client.api.message.$post({
            form: {
              role,
              content,
            },
          });
        } catch (error) {
          console.error(error);
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });

  useEffect(() => {
    if (loading) {
      const fetchMessages = async () => {
        try {
          const data = await (await client.api.message.$get()).json();

          setMessages(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchMessages();
    }
  }, [loading, setLoading]);

  return (
    <div className="w-[640px] h-[100vh] m-auto py-8 flex flex-col items-center justify-between">
      <div className="w-full h-[80vh] mb-5 overflow-auto">
        {loading ? (
          <div className="text-gray-500 text-center">Loading...</div>
        ) : (
          <Messages messages={messages} />
        )}
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
