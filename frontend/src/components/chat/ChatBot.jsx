import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Trash2, Minimize2, Maximize2, Mic, ThumbsUp, ThumbsDown, Headphones } from 'lucide-react';
import { initialBotMessage, quickReplies, responses, keywordMap } from './chatbotData';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { ...initialBotMessage }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [suggestions, setSuggestions] = useState([
    ...quickReplies
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: textToSend,
      timestamp: new Date(),
      rating: null
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate typing
    simulateTyping();

    // Get bot response after typing delay
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

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 text-white rounded-full p-5 shadow-2xl transition-all duration-500 transform hover:scale-110 backdrop-blur-sm custom-shadow"
        >
          <MessageCircle className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"></div>
        </button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="relative bg-white border border-blue-200 shadow-xl rounded-full p-4 flex items-center justify-center hover:scale-110 transition-all duration-300 group min-w-[64px] min-h-[64px]"
          title="Restore Chat"
        >
          <Headphones className="h-7 w-7 text-blue-600" />
          <span className="sr-only">Restore Chat</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </button>
      </div>
    );
  }

  return (
    <>
      {!isMinimized && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300" />
      )}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out transform ${
        isMinimized ? 'w-80 h-16' : 'w-[28rem] h-[42rem]'
      } flex flex-col bg-white/95 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl custom-shadow`}
      >
        {/* Chat Header */}
        <div 
          className="text-white p-5 rounded-t-3xl flex items-center justify-between relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-300 shadow-lg"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="flex items-center space-x-4 relative z-10">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30 shadow-lg">
                {isMinimized ? <Headphones className="h-6 w-6 text-white" /> : <Bot className="h-6 w-6 text-white" />}
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="font-bold text-lg">EduWorld Assistant</span>
              <p className="text-sm opacity-90 font-medium">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 relative z-10">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-blue-500 bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              title="Minimize"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={clearChat}
              className="text-yellow-600 bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              title="Clear Chat"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-red-500 bg-red-100 hover:bg-red-200 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <div 
              className="flex-1 p-5 overflow-y-auto custom-scrollbar"
            >
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} group`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 shadow-md'
                      }`}>
                        {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`px-5 py-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-blue-200/40'
                          : 'bg-white text-gray-800 border border-gray-100 shadow-black/10'
                      }`}>
                        <div className="text-sm whitespace-pre-line leading-relaxed">{message.text}</div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs opacity-70 font-medium">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {message.type === 'bot' && (
                            <div className="flex items-center space-x-2 ml-3">
                              <button
                                onClick={() => handleRating(message.id, 'up')}
                                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                  message.rating === 'up' 
                                    ? 'text-green-600 bg-green-50' 
                                    : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                }`}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleRating(message.id, 'down')}
                                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                  message.rating === 'down' 
                                    ? 'text-red-600 bg-red-50' 
                                    : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                                }`}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Enhanced Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start group">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 flex items-center justify-center shadow-md animate-pulse">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-white border border-gray-100 px-5 py-4 rounded-2xl shadow-lg">
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          <span className="text-xs text-gray-500 ml-2 font-medium">Assistant is typing...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Quick Suggestions */}
            {suggestions.length > 0 && (
              <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-xs font-medium hover:from-blue-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105 shadow-sm border border-blue-200 backdrop-blur-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Input Area */}
            <form onSubmit={handleSubmit} className="p-5 bg-white rounded-b-3xl border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-5 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium transition-all duration-300 bg-gray-50 hover:bg-white shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-5 py-3 rounded-2xl hover:from-blue-600 hover:via-purple-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg disabled:shadow-none"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </>
        )}

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.05);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          }
        `}</style>
      </div>
    </>
  );
};

export default ChatBot;