"use client";

import Image from "next/image";
import TextChatBotHeader from "@/components/custom/TextChatBotHeader";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import ChatBody from "@/components/custom/ChatBody";
import { Button } from "@/components/ui/button";
import { generateTextGeminiModel } from "@/services/gemini-bot";

function page() {
  const textareaRef = useRef(null);
  const scrollBody = useRef();
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([{role: "bot", data: 'Hiii 👋 how may I help you Today?'}])

  function handleInput(e) {
    const userMessage = e.target.value
    setInputValue(userMessage);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 80)}px`;
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    setChatHistory((prev) => [...prev, {role: 'user', data: inputValue.trim()}])  
    setChatHistory((prev) => [...prev, {role: 'bot', data: 'Thinking...'}])
    const result = await generateTextGeminiModel(inputValue)
    setInputValue('')
    if(result){
      setChatHistory((prev) => [...prev.filter(msg => msg.data !== 'Thinking...'), 
        {role: 'bot', data: result.response.text().trim()}])
    }
  }


  useEffect(() => {
    scrollBody.current.scrollTo({top: scrollBody.current.scrollHeight, behavior: 'smooth'})
  }, [chatHistory])
  return (
    <div className="relative h-screen flex flex-col gap-2">
      <header className="p-2">
        <TextChatBotHeader></TextChatBotHeader>
      </header>

      {/* Body */}
      <div 
      ref={scrollBody}
      className="h-full overflow-y-auto p-2 scroll-smooth
       w-full flex flex-col gap-2">
        <ChatBody chatHistory={chatHistory}></ChatBody>
      </div>

      {/* Input Field */}
      <div className="rounded-t-lg bg-neutral-900 pb-2 flex items-center">
        <form className="w-full relative rounded-full flex flex-col">
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInput}
            placeholder="Ask me anything..."
            className="resize-none bg-transparent overflow-y-auto tracking-wide outline-none ring-0 border-none focus:outline-none focus:ring-0 "
          ></Textarea>
          <div className="w-full flex items-center justify-end px-2">
            <Button 
            disabled={inputValue ? (false) : (true)}
            type="submit" 
            onClick={submitForm} 
            className="bg-mainColur">
              <Image
                src="sendChatIcon.svg"
                height={25}
                width={25}
                alt="Chat Icon"
              ></Image>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page;
