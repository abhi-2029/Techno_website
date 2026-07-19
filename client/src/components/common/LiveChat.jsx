/**
 * CARD Technocrats & Engineers LLP - Reusable Shared UI Component
 * 
 * Senior Developer Notes:
 * - Global design token element promoting codebase consistency.
 * - Designed with vanilla CSS/Tailwind parameters for portability.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

export default function LiveChat() {
  // Local state container managing interactive view variables
  const [isOpen, setIsOpen] = useState(false);
  // Local state container managing interactive view variables
  const [messages] = useState([
    { id: 1, text: 'Hello! 👋 Welcome to CARD Technocrats. How can we help you today?', sender: 'bot', time: 'Just now' },
  ]);
  // Local state container managing interactive view variables
  const [input, setInput] = useState('');

  return (
    <>
      {/* Chat bubble trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 3, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[10.5rem] right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-primary-600 flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow duration-300"
            aria-label="Open live chat"
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
            {/* Notification dot */}
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-dark-950 flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">1</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[480px] max-h-[70vh] bg-dark-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">CARD Support</p>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <XMarkIcon className="w-4 h-4 text-white" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-primary-500 text-white rounded-br-md'
                        : 'bg-white/5 text-dark-200 border border-white/5 rounded-bl-md'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-white/60' : 'text-dark-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm text-dark-50 placeholder-dark-500 bg-white/[0.03] border border-white/[0.08] focus:border-primary-500/50 outline-none transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white flex-shrink-0"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[10px] text-dark-600 text-center mt-2">
                Powered by CARD Technocrats
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
