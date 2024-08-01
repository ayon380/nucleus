"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, SendIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const hardcodedResponses = {
  hello: "Hello there!\n\nWelcome to our chat. How can I assist you today?",
  "how are you":
    "I'm functioning well, thank you for asking. How may I help you?",
  "what's the weather":
    "I'm sorry, but I don't have access to real-time weather information. You might want to check a weather app or website for the most up-to-date forecast.",
  "tell me a joke":
    "Why don't scientists trust atoms? Because they make up everything!",
  "list features":
    "Here are some of my features:\n\n- Markdown support\n- Animations\n- Streamlined UI with typing animation",
  default:
    "I'm not sure how to respond to that. Could you please rephrase or ask something else?",
};

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Welcome to Nucleus AI! You can ask me questions like:\n\n- Hello\n- How are you?\n- What's the weather?\n- Tell me a joke\n- List features",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const simulateTyping = async (text) => {
    setIsTyping(true);
    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].content = text.slice(0, i);
        return newMessages;
      });
    }
    setIsTyping(false);
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      const botResponse =
        hardcodedResponses[input.toLowerCase()] || hardcodedResponses.default;
      setMessages((prev) => [...prev, { type: "bot", content: "" }]);
      simulateTyping(botResponse);
    }, 500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-neutral-800 text-black dark:text-white ">
      <div className="flex sticky top-0 items-center justify-between p-4 dark:bg-neutral-800">
        <h1 className="text-xl font-bold">Nucleus AI</h1>
      </div>

      <div className="flex-grow p-4 rounded-xl space-y-4 bg-white overflow-auto dark:bg-black">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-neutral-500 dark:bg-neutral-800 text-white"
                    : "bg-gray-100 dark:bg-neutral-900"
                }`}
              >
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-neutral-900 p-3 rounded-full">
              <span className="animate-pulse">Typing...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="px-4 pt-4 pb-4 ">
        <div className="flex items-center bg-white dark:bg-black rounded-full overflow-hidden">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-white px-4 py-2 dark:text-white dark:bg-black text-base bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            className="dark:bg-gray-300 mr-1 hover:bg-blue-600 dark:text-black text-black bg-gray-100 p-2 rounded-full flex items-center justify-center"
          >
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
