'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Weather } from '../../components/weather';

export default function Page() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isLoading } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput('');
  };

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-neutral-100">
      
      <header className="border-b border-neutral-800 bg-neutral-900 px-4 py-3 font-semibold">
        Generative UI POC
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow
                ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-900 text-neutral-100 border border-neutral-800'
                }`}
            >
              {message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>;
                }

                if (part.type === 'tool-displayWeather') {
                  switch (part.state) {
                    case 'input-available':
                      return (
                        <div key={index} className="text-xs text-neutral-400">
                          Loading weather...
                        </div>
                      );
                    case 'output-available':
                      return (
                        <div key={index} className="mt-2">
                          <Weather {...part.output} />
                        </div>
                      );
                    case 'output-error':
                      return (
                        <div key={index} className="text-red-400">
                          Error: {part.errorText}
                        </div>
                      );
                    default:
                      return null;
                  }
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-sm text-neutral-500">AI is typing...</div>
        )}
      </main>

      <form
        onSubmit={handleSubmit}
        className="border-t border-neutral-800 bg-neutral-900 p-4 flex gap-2"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
