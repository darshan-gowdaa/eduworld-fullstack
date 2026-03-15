import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Trash2, Minimize2, Maximize2, ThumbsUp, ThumbsDown, Headphones } from 'lucide-react';
import { initialBotMessage, quickReplies, responses, keywordMap } from './chatbotData';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([{ ...initialBotMessage }]);
  const [inputMessage, setInputMessage] = useState('');
  const [suggestions, setSuggestions] = useState([...quickReplies]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getSmartResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [mainKeyword, synonyms] of Object.entries(keywordMap)) {
      if (synonyms.some(synonym => lowerMessage.includes(synonym))) {
        return responses[mainKeyword];
      }
    }

    if (/(hi|hello|hey)/i.test(lowerMessage)) {
      return {
        text: `Hello! 👋 Great to see you interested in EduWorld! I'm here to help you with any questions about our programs, admissions, or campus life. What would you like to know?`,
        suggestions: ['Course information', 'Admission process', 'Fee structure', 'Campus facilities']
      };
    }

    if (/thank(s| you)?/i.test(lowerMessage)) {
      return {
        text: `You're very welcome! 😊 I'm glad I could help. If you have any more questions about EduWorld, feel free to ask. We're here to support your educational journey!`,
        suggestions: ['More information', 'Contact admissions', 'Schedule visit', 'Apply now']
      };
    }

    return {
      text: `I'd be happy to help you with that! 🤔 I can provide information about courses, admissions, fees, scholarships, campus facilities, and much more. What specific aspect of EduWorld would you like to explore?`,
      suggestions: ['Course information', 'Admission process', 'Fee structure', 'Campus facilities']
    };
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000 + Math.random() * 1000);
  };

  const handleSendMessage = (messageText = null) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: textToSend,
      timestamp: new Date(),
      rating: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    simulateTyping();

    setTimeout(() => {
      const response = getSmartResponse(textToSend);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: response.text,
        timestamp: new Date(),
        rating: null
      };

      setMessages(prev => [...prev, botMessage]);
      setSuggestions(response.suggestions || quickReplies);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleRating = (messageId, rating) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ));
  };

  const clearChat = () => {
    setMessages([{ ...initialBotMessage }]);
    setSuggestions(quickReplies);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && !isMinimized && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="group relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-6 w-6" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Bubble */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setIsMinimized(false)}
              className="bg-background border border-border shadow-md rounded-full p-4 flex items-center justify-center hover:bg-secondary transition-all active:scale-95 group"
            >
              <Headphones className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full"></div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[26rem] h-[40rem] max-h-[85vh] flex flex-col bg-background rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-secondary/40 border-b border-border p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">EduWorld Assistant</h3>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={clearChat}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                  title="Minimize"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {message.type === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0 mb-1">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    
                    <div className="flex flex-col space-y-1">
                      <div className={`px-4 py-2.5 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-secondary text-foreground rounded-bl-sm border border-border/50'
                      }`}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</div>
                      </div>
                      
                      <div className={`flex items-center space-x-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'} px-1`}>
                        <span className="text-[10px] text-muted-foreground font-medium">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        {message.type === 'bot' && (
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => handleRating(message.id, 'up')}
                              className={`p-1 rounded hover:bg-secondary transition-colors ${message.rating === 'up' ? 'text-primary' : 'text-muted-foreground'}`}
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleRating(message.id, 'down')}
                              className={`p-1 rounded hover:bg-secondary transition-colors ${message.rating === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-end max-w-[80%] flex-row">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0 mb-1">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm border border-border/50">
                      <div className="flex space-x-1.5 items-center justify-center h-4">
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-px" />
            </div>

            {/* Quick Suggestions */}
            {suggestions.length > 0 && !isTyping && (
              <div className="px-4 py-3 bg-background border-t border-border overflow-x-auto scx-hide shrink-0">
                <div className="flex flex-nowrap space-x-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-3 py-1.5 shrink-0 bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-full text-xs font-medium transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-secondary/30 border-t border-border shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full pl-4 pr-12 py-3 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="absolute right-1.5 p-2 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scx-hide::-webkit-scrollbar {
          display: none;
        }
        .scx-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ChatBot;