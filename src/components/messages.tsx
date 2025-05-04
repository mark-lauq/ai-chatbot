import type { Message } from "ai";
import { memo } from "react";
import clsx from "clsx";

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
          <b>{msg.role === "user" ? "User: " : "AI: "}</b>
          {msg.parts?.map((part, index) => {
            // text parts:
            if (part.type === "text") {
              return <div key={index}>{part.text}</div>;
            }
          })}
        </div>
      ))
    : "Empty chat messages :(";
}

export const Messages = memo(PureMessages);
