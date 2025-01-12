"use client";

import React, { useEffect } from "react";
import TextChatBotHeader from "@/components/custom/TextChatBotHeader";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { useChatContext } from "@/context/TextChatContext";

export default function TextBotLayOut({ children }) {
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null)
  const { sendMessage, chatHistory, activeBot, switchedBot } = useChatContext();
  const [userMessage, setUserMessage] = useState("");

  function submitForm(e) {
    e.preventDefault();
    sendMessage(userMessage);
    setUserMessage("");
  }

  useEffect(() => {
    if(chatContainerRef.current){
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  return (
    <div className="relative h-screen flex flex-col">
      {/* Chat Header */}
      <header className="p-2">
        <TextChatBotHeader></TextChatBotHeader>
      </header>

      {/* Chat Body */}
      <div
        className="h-full overflow-y-auto p-2 scroll-smooth
       w-full flex flex-col gap-2"
       ref={chatContainerRef}
      >
        {children}
      </div>

      {/* Input Field */}
      <div className="rounded-t-lg bg-neutral-900 pb-2 flex items-center">
        <InputField
          textareaRef={textareaRef}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          submitForm={submitForm}
        ></InputField>
      </div>
    </div>
  );
}

// User Input Field
function InputField({ textareaRef, userMessage, setUserMessage, submitForm }) {
  return (
    <form
      onSubmit={submitForm}
      className="w-full relative rounded-full flex flex-col"
    >
      <Textarea
        ref={textareaRef}
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Ask me anything..."
        className="resize-none bg-transparent overflow-y-auto tracking-wide outline-none ring-0 border-none focus:outline-none focus:ring-0 "
      ></Textarea>
      <div className="w-full flex items-center justify-end px-2">
        <button type="submit" className="bg-mainColur flex items-center justify-center h-10 w-10 rounded-full">
          <Image
            src="/sendChatIcon.svg"
            height={25}
            width={25}
            alt="Chat Icon"
            className=""
          ></Image>
        </button>
      </div>
    </form>
  );
}
