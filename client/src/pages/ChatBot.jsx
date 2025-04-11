import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the API with environment variable
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const chatBotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      staggerChildren: 0.07
    }
  },
  exit: { 
    opacity: 0, 
    y: 30, 
    scale: 0.95,
    transition: { 
      duration: 0.2,
      ease: "easeOut" 
    }
  }
};

const messageVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input.trim(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      // Add safety settings and proper prompt formatting
      const prompt = input.trim();
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      });

      const response = await result.response;
      const text = response.text();

      const botMessage = {
        text: text,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error details:', error);
      const errorMessage = {
        text: `Error: ${error.message || "Something went wrong. Please try again."}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-4 shadow-lg cursor-pointer hover:from-purple-700 hover:to-blue-700 transition duration-300 z-20"
        onClick={toggleChat}
        variants={chatBotVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-96 bg-gray-900 border border-purple-600 rounded-lg shadow-lg z-10 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <motion.div 
              className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h3 
                className="text-white font-semibold"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                FinBot
              </motion.h3>
            </motion.div>

            <motion.div 
              ref={chatContainerRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  layout
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <motion.div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-800 text-gray-200'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-50 mt-1 block">
                      {message.timestamp}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-800 text-gray-200 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-purple-600 rounded-full"
                          animate={{
                            y: ["0%", "-50%", "0%"],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: delay,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              className="p-4 border-t border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-2">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700"
                >
                  Send
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
