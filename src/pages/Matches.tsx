import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { MessageCircle, Filter } from 'lucide-react';
import { TabNavigation } from '@/components/TabNavigation';
import { Button } from '@/components/ui/button';

interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  profile: {
    id: string;
    name: string;
    age: number;
    experience_level: string;
  };
}

const MatchesContent = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await (supabase as any)
        .from('matches')
        .select(`
          *,
          user1:profiles!matches_user1_id_fkey(id, name, age, experience_level),
          user2:profiles!matches_user2_id_fkey(id, name, age, experience_level)
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedMatches = data?.map((match: any) => ({
        ...match,
        profile: match.user1_id === user.id ? match.user2 : match.user1
      })) || [];

      setMatches(formattedMatches);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col safe-area-inset">
      <div className="flex-1 p-4 sm:p-6 pb-24">
        <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Your Matches</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {matches.length} sparring partner{matches.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Tab Navigation */}
          <TabNavigation
            tabs={['All', 'Recent', 'Favorites']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {matches.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🥊</div>
              <h2 className="text-lg sm:text-xl font-bold mb-2">Belum ada match</h2>
              <p className="text-sm sm:text-base text-muted-foreground px-4">
                Mulai swipe untuk cari sparring partner!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {matches.map((match) => (
                <button
                  key={match.id}
                  onClick={() => navigate(`/chat/${match.id}`)}
                  className="flex flex-col p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-card transition-all active:scale-[0.98] text-left"
                >
                  <div className="h-32 w-full rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-4xl mb-3">
                    🥊
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-base truncate">
                      {match.profile.name}, {match.profile.age}
                    </h3>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                      {match.profile.experience_level}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>Tap to message</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

const Matches = () => (
  <ProtectedRoute>
    <MatchesContent />
  </ProtectedRoute>
);

export default Matches;
