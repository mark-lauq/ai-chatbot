import { memo, type ChangeEventHandler, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

function PureChat({
  value,
  handleInputChange,
  handleSubmit,
}: {
  value: string;
  handleInputChange: ChangeEventHandler<HTMLTextAreaElement>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Textarea
        autoFocus
        placeholder="Type your message here."
        value={value}
        onChange={handleInputChange}
      />
      <Button type="submit">Send</Button>
    </form>
  );
}

export const Chat = memo(PureChat);
