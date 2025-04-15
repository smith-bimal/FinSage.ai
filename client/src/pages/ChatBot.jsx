/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router";

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

// Accept context as a prop
const ChatBot = ({ currentPage, userData }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your FinSage assistant. I can help with financial questions, investment advice, or explain financial concepts. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [fullResponse, setFullResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  // Load chat history on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('finSageChatHistory');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (e) {
        console.error('Error parsing saved messages:', e);
      }
    }
  }, []);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('finSageChatHistory', JSON.stringify(messages.slice(-20)));
    }
  }, [messages]);

  const handleSend = async (retryCount = 0) => {
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

      // Create conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Add the new user message
      conversationHistory.push({
        role: 'user',
        parts: [{ text: input.trim() }]
      });

      // Add context to prompt
      let contextPrompt = "You are FinSage, a helpful financial assistant. You only give short answers maximum 10 sentences.";

      if (currentPage === 'dashboard') {
        contextPrompt += " The user is currently viewing their financial dashboard.";
      } else if (currentPage === 'investments') {
        contextPrompt += " The user is looking at their investment portfolio.";
      }

      if (userData?.financialGoals) {
        contextPrompt += ` Their financial goals include: ${userData.financialGoals.join(', ')}.`;
      }

      const userPrompt = input.trim();
      const fullPrompt = `${contextPrompt}\n\nUser: ${userPrompt}`;

      const result = await model.generateContent({
        contents: conversationHistory,
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

      simulateTyping(text);
    } catch (error) {
      console.error('Error details:', error);

      // Retry logic for network issues
      if (retryCount < 2 && error.message?.includes('network')) {
        setTimeout(() => handleSend(retryCount + 1), 1000);
        return;
      }

      // Friendly error messages based on error type
      let errorMessage = "Something went wrong. Please try again.";
      if (error.message?.includes('quota')) {
        errorMessage = "We've hit our API limit. Please try again in a few minutes.";
      } else if (error.message?.includes('network')) {
        errorMessage = "Network connection issue. Please check your internet.";
      }

      setMessages(prev => [...prev, {
        text: `Error: ${errorMessage}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }

    setIsLoading(false);
  };

  const simulateTyping = (text) => {
    setIsTyping(true);
    setFullResponse(text);
    setTypingText('');

    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setTypingText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Add the complete message once typing is done
        const botMessage = {
          text,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString(),
        };

        setMessages(prev => [...prev, botMessage]);
      }
    }, 30); // Adjust speed as needed
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const navigateToPage = (path) => {
    navigate(path);
    setIsOpen(false); // Close chatbot after navigation
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600/70 to-blue-600/70 backdrop-blur-2xl text-white rounded-full p-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20 cursor-pointer hover:from-purple-700/70 hover:to-blue-700/70 transition duration-300 z-20"
        onClick={toggleChat}
        variants={chatBotVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            style={{
              WebkitBackdropFilter: 'blur(16px)',
              backdropFilter: 'blur(16px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
            }}
          >
            <motion.div
              className="p-3 bg-gradient-to-r from-purple-600/50 to-blue-600/50 backdrop-blur-xl rounded-t-lg border-b border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h3
                className="text-white text-sm font-semibold"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <div className="flex items-center space-x-2">
                  <img src="/logo.jpg" alt="FinSage" className="w-8 h-8 rounded-full" />
                  <span>FinSage Bot</span>
                </div>
              </motion.h3>
              <motion.button
                onClick={() => {
                  setMessages([{
                    text: "Chat history cleared. How can I help you today?",
                    sender: 'bot',
                    timestamp: new Date().toLocaleTimeString(),
                  }]);
                  localStorage.removeItem('finSageChatHistory');
                }}
                className="absolute top-3 right-3 text-white/50 hover:text-white/80"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </motion.button>
            </motion.div>

            <motion.div
              ref={chatContainerRef}
              className="h-[300px] overflow-y-auto overflow-x-hidden p-3 space-y-3 finsage-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
              }}
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
                    className={`max-w-[80%] p-2 rounded-lg backdrop-blur-xl shadow-lg ${message.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 text-white border border-white/10'
                      : 'bg-white/10 text-gray-200 border border-white/5'
                      }`}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    style={{
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                    }}
                  >
                    <p className="text-xs">{message.text}</p>
                    <span className="text-[10px] opacity-50 mt-1 block">
                      {message.timestamp}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="max-w-[80%] p-2 rounded-lg backdrop-blur-xl shadow-lg bg-white/10 text-gray-200 border border-white/5"
                    style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
                  >
                    <p className="text-xs">{typingText}<span className="animate-pulse">▌</span></p>
                  </motion.div>
                </motion.div>
              )}
              {messages.length === 1 && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {["How can I start investing?",
                      "What is compound interest?",
                      "How to build an emergency fund?",
                      "What's a good debt-to-income ratio?"
                    ].map((question, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          setInput(question);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="text-[10px] bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded-full border border-white/10 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="p-3 border-t border-white/10 backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0))',
              }}
            >
              <div className="flex space-x-2">
                <motion.input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 backdrop-blur-xl text-gray-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/50 border border-white/10"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                />
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  className="bg-gradient-to-r from-purple-600/50 to-blue-600/50 backdrop-blur-xl text-white text-xs px-3 py-2 rounded-lg hover:from-purple-700/50 hover:to-blue-700/50 border border-white/10"
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
