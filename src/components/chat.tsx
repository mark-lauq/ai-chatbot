import { memo, useMemo } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Message, CreateMessage } from "@ai-sdk/react";
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

  const handleAppend = () => {
    if (!value) {
      return;
    }

    append({
      role: "user",
      content: value,
    });
    // reset input value
    setInput("");
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
