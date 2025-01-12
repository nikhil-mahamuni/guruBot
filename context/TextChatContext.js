"use client";

import { generateTextGeminiModel } from "@/services/gemini-bot";
import { createContext, useState, useContext } from "react";

// 1. Context Initialization
const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const botWelcomeMessages = {
    GeminiBot:
      "Welcome to Gemini Bot! 🤖✨ I am here to assist you with a variety of tasks.",
    GPTBot: "Hello! 👋 I am GPTBot. Let me know how I can help you today.",
    BardBot:
      "Greetings from BardBot! 🎤🎶 Ask me anything, and I'll do my best to assist.",
  };

  const [activeBot, setActiveBot] = useState("BardBot");

  const [chatHistory, setChatHistory] = useState([
    {
      role: "bot",
      content: botWelcomeMessages[activeBot],
      botUsed: activeBot,
    },
  ]);

  function switchedBot(userSelectedBot) {
    if (userSelectedBot !== activeBot) {
      setActiveBot(userSelectedBot);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "bot",
          content: botWelcomeMessages[userSelectedBot],
          botUsed: userSelectedBot,
        },
      ]);
    }
  }

  function clearChatHistory() {
    if (chatHistory.length === 1) return;
    setChatHistory([
      {
        role: "bot",
        content: botWelcomeMessages[activeBot],
        botUsed: activeBot,
      },
    ]);
  }

  function sendMessage(userMessage) {
    setChatHistory((prevHistories) => [
      ...prevHistories,
      { role: "user", content: userMessage },
      { role: "bot", content: "Thinking...", botUsed: activeBot },
    ]);

    generateTextGeminiModel(userMessage)
      .then((reply) => {
        setChatHistory((prevHistory) => [
          ...prevHistory.slice(0, -1),
          {
            role: "bot",
            content: reply.response.text(),
            botUsed: activeBot,
          },
        ]);
      })
      .catch(() => {
        setChatHistory((prevHistory) => [
          ...prevHistory.slice(0, -1),
          {
            role: "bot",
            content: `Sorry, ${activeBot} bot couldn't generate a response at the moment use other bot.`,
            botUsed: activeBot,
          },
        ]);
      });
  }

  return (
    <ChatContext.Provider
      value={{
        sendMessage,
        chatHistory,
        activeBot,
        setActiveBot,
        switchedBot,
        clearChatHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
