"use client";

import {useState, useRef, useEffect} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {toast} from "@/hooks/use-toast";
import {Icons} from "@/components/icons";
import {analyzeSentiment} from '@/ai/flows/analyze-sentiment';
import {generateGrokResponse} from '@/ai/flows/grok-response';

const aiName = 'AIAssistant';
const userAvatar = 'https://picsum.photos/id/237/48/48';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  sentiment?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the chat on new messages
    chatBottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {sender: 'user', text: input};
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const sentimentResult = await analyzeSentiment({text: input});
      userMessage.sentiment = sentimentResult.sentiment;

      let aiResponseText: string;
      //if (input.toLowerCase().includes('grok')) {
      {
        const grokResult = await generateGrokResponse({userInput: input});
        aiResponseText = grokResult.grokResponse;
      } //else {
        // Simulate AI response (replace with actual GenAI call)
        //aiResponseText = `Echo: ${input}`; // Replace with actual AI response
      //}

      // Simulate AI response (replace with actual GenAI call)
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          sender: 'ai',
          text: aiResponseText, // Replace with actual AI response
        };
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-secondary">
      <header className="bg-primary p-4 text-white text-center">
        <h1>Personal AI Companion</h1>
      </header>

      <main className="flex-1 p-4 overflow-y-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'ai' && (
              <Avatar className="mr-2">
                <AvatarImage src="https://picsum.photos/id/877/48/48" alt={aiName} />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`rounded-xl p-3 w-fit max-w-[60%] ${message.sender === 'user'
                ? 'bg-accent text-white'
                : 'bg-gray-200 text-gray-800'
                }`}
            >
              {message.text}
              {message.sender === 'user' && message.sentiment && (
                <div className="text-xs mt-1">Sentiment: {message.sentiment}</div>
              )}
            </div>
            {message.sender === 'user' && (
              <Avatar className="ml-2">
                <AvatarImage src={userAvatar} alt="User" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={chatBottomRef} />
      </main>

      <footer className="p-4 bg-gray-100">
        <div className="flex items-center space-x-2">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border-gray-300 focus:border-accent focus:ring-accent"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-accent text-white rounded-xl hover:bg-accent-dark focus:bg-accent-dark"
          >
            {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.arrowRight />}
            Send
          </Button>
        </div>
      </footer>
    </div>
  );
}
