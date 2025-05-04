import type { Message } from "ai";
import { memo } from "react";

function PureMessages({ messages }: { messages: Message[] }) {
  return messages.length > 0
    ? messages.map((msg) => (
        <div key={msg.id} className="whitespace-pre-wrap mb-4">
          <b>{msg.role === "user" ? "User: " : "AI: "}</b>
          {msg.content}
        </div>
      ))
    : "Empty chat messages :(";
}

export const Messages = memo(PureMessages);
