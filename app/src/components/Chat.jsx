import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, push, onValue } from 'firebase/database';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  console.log('Chat loaded')

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data from Firebase:", data);
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      await push(ref(db, 'messages'), {
        text: input,
        timestamp: Date.now(),
      });
      setInput('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Realtime Chat</h1>
      <div className="border p-2 h-64 overflow-y-auto bg-gray-100 rounded mb-2">
        {messages.map((msg, index) => (
          <div key={index} className="p-1 border-b">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button 
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;