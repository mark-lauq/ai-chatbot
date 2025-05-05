import type { Message } from "ai";
import { memo } from "react";
import clsx from "clsx";
import { Role } from "@/server/db/schema";

function PureMessages({ messages }: { messages: Message[] }) {
  return messages.length > 0
    ? messages.map((msg) => (
        <div
          key={msg.id}
          className={clsx({
            "whitespace-pre-wrap mb-4": true,
            "text-right": msg.role === "user",
          })}
        >
          <b>{msg.role === Role.User ? "User: " : "AI: "}</b>
          {msg.content}
        </div>
      ))
    : "Empty chat messages :(";
}

export const Messages = memo(PureMessages);
