import { memo, useMemo } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Message, CreateMessage } from "@ai-sdk/react";
import { client } from "@/lib/api-client";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

function PureChat({
  value,
  setInput,
  status,
  append,
  stop,
}: {
  value: string;
  setInput: Dispatch<SetStateAction<string>>;
  status: "submitted" | "streaming" | "ready" | "error";
  append: (
    message: Message | CreateMessage,
  ) => Promise<string | null | undefined>;
  stop: () => void;
}) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleAppend = async () => {
    if (!value) {
      return;
    }

    const body = {
      role: "user" as const,
      content: value,
    };

    try {
      // Save to DB
      const res = await client.api.message.$post({ form: body });
      if (!res.ok) {
        return;
      }
      // Chat to AI
      append(body);
      // Reset input value
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  const loading = useMemo(
    () => ["submitted", "streaming"].includes(status),
    [status],
  );

  return (
    <div className="flex flex-col gap-4">
      <Textarea
        autoFocus
        placeholder="Type your message here."
        value={value}
        onChange={handleChange}
      />
      {!loading ? (
        <Button onClick={handleAppend}>Send</Button>
      ) : (
        <Button variant="destructive" onClick={stop}>
          Stop
        </Button>
      )}
    </div>
  );
}

export const Chat = memo(PureChat);
