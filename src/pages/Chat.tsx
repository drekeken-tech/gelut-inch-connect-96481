import { useState, useEffect, useRef } from 'react';
import { ProtectedRoute } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

const ChatContent = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [otherUser, setOtherUser] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMatchAndMessages();
    subscribeToMessages();
  }, [matchId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadMatchAndMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setCurrentUserId(user.id);

      // Load match and other user profile
      const { data: match } = await (supabase as any)
        .from('matches')
        .select(`
          *,
          user1:profiles!matches_user1_id_fkey(id, name, age),
          user2:profiles!matches_user2_id_fkey(id, name, age)
        `)
        .eq('id', matchId)
        .single();

      if (match) {
        const otherProfile = match.user1_id === user.id ? match.user2 : match.user1;
        setOtherUser(otherProfile);
      }

      // Load messages
      const { data: msgs } = await (supabase as any)
        .from('messages')
        .select('*')
        .eq('match_id', matchId)
        .order('created_at', { ascending: true });

      setMessages(msgs || []);
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `match_id=eq.${matchId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await (supabase as any)
        .from('messages')
        .insert({
          match_id: matchId,
          sender_id: user.id,
          content: newMessage.trim(),
        });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col safe-area-inset">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 sm:gap-4 border-b border-border bg-card/95 backdrop-blur-lg p-3 sm:p-4">
        <button onClick={() => navigate('/matches')} className="flex-shrink-0">
          <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
          🥊
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-sm sm:text-base truncate">
            {otherUser?.name || 'Loading...'}
          </h2>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message) => {
          const isMine = message.sender_id === currentUserId;
          return (
            <div
              key={message.id}
              className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] sm:max-w-[70%] rounded-2xl px-3 sm:px-4 py-2 ${
                  isMine
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="border-t border-border bg-card p-3 sm:p-4">
        <div className="mx-auto flex max-w-2xl gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ketik pesan..."
            className="h-11 sm:h-12 flex-1"
          />
          <Button type="submit" size="icon" variant="hero" className="h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0">
            <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

const Chat = () => (
  <ProtectedRoute>
    <ChatContent />
  </ProtectedRoute>
);

export default Chat;
