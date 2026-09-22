import React, { useState } from 'react';
import { MessageSquareIcon, XIcon, SendIcon } from 'lucide-react';

export function ChatWidget({ userType }: { userType: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can we help you today?', sender: 'support', time: '10:00 AM' }
  ]);

  // Only show the chat widget if user is logged in
  if (!userType) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: message, sender: 'user', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMessage('');
    
    // Mock auto-reply response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text: 'Thanks for reaching out! A support representative will be with you shortly.', sender: 'support', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-transform hover:scale-105 z-[100] ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquareIcon className="h-6 w-6" />
        <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[100] flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-primary p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquareIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold leading-tight">CloudServe Support</h3>
                <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                  <span className="h-2 w-2 bg-green-400 rounded-full"></span> Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10">
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-4 h-80 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 ${msg.sender === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button type="submit" disabled={!message.trim()} className="h-10 w-10 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors">
              <SendIcon className="h-4 w-4 ml-1" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
