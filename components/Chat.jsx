"use client";
import { generateChatResponse } from "@/utils/action";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

function Chat() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      console.log(data);
      if (!data) {
        toast.error("Something went wrong...");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role === "user" ? "你:" : "ChatGPT:";
          const backgroundColor =
            role === "user" ? "bg-base-200" : "bg-base-100";
          return (
            <div
              key={index}
              className={`${backgroundColor} flex py-6 -mx-6 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">{content}</p>
            </div>
          );
        })}
        {isPending ? <span className="loading"></span> : null}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message GeniusGPT"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onInput={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            disabled={isPending}
            className="btn btn-primary join-item"
            type="submit"
          >
            {isPending ? "Please wait..." : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default Chat;
