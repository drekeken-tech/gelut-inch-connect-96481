import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Heart, X, Zap, Search } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { MatchModal } from '@/components/MatchModal';
import { TabNavigation } from '@/components/TabNavigation';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  name: string;
  age: number;
  bio: string;
  experience_level: string;
  weight_class: string;
  gym_club: string;
  photos: string[];
  sparring_style: string[];
}

const DiscoverContent = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState('Recommended');

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get profiles user hasn't swiped on yet
      const { data: swipedIds } = await (supabase as any)
        .from('swipes')
        .select('swiped_id')
        .eq('swiper_id', user.id);

      const alreadySwipedIds = swipedIds?.map((s: any) => s.swiped_id) || [];

      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .neq('id', user.id)
        .eq('available', true)
        .not('id', 'in', `(${alreadySwipedIds.length > 0 ? alreadySwipedIds.join(',') : 'null'})`)
        .limit(20);

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction: 'left' | 'right' | 'up') => {
    if (currentIndex >= profiles.length) return;

    const currentProfile = profiles[currentIndex];
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Record swipe
      const { error } = await (supabase as any)
        .from('swipes')
        .insert({
          swiper_id: user.id,
          swiped_id: currentProfile.id,
          direction: direction,
        });

      if (error) throw error;

      // Check for match if right swipe
      if (direction === 'right' || direction === 'up') {
        const { data: mutualSwipe } = await (supabase as any)
          .from('swipes')
          .select('*')
          .eq('swiper_id', currentProfile.id)
          .eq('swiped_id', user.id)
          .eq('direction', 'right')
          .single();

        if (mutualSwipe) {
          setMatchedProfile(currentProfile);
        }
      }

      setCurrentIndex(prev => prev + 1);
    } catch (error: any) {
      console.error('Swipe error:', error);
    }
  };

  const currentProfile = profiles[currentIndex];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🥊</div>
            <h2 className="text-2xl font-bold">No more profiles</h2>
            <p className="text-muted-foreground">
              Check back later for new sparring partners!
            </p>
            <Button onClick={loadProfiles} variant="hero">
              Refresh
            </Button>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col safe-area-inset">
      {/* Header */}
      <div className="p-6 pb-4 space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">Find Your Perfect</h1>
            <h1 className="text-3xl font-black tracking-tight">Sparring Partner</h1>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={['Nearby', 'Recommended', 'All Fighters']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="flex-1 p-3 sm:p-4 pb-24 sm:pb-28">
        <div className="mx-auto max-w-md">
          {/* Card */}
          <div 
            className="relative h-[calc(100vh-350px)] max-h-[550px] min-h-[450px] animate-swipe-in cursor-pointer"
            onClick={() => navigate(`/profile/${currentProfile.id}`)}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-card to-card/50 backdrop-blur-sm border border-border overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Image placeholder */}
              <div className="h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <div className="text-8xl">🥊</div>
                
                {/* Gym Badge */}
                {currentProfile.gym_club && (
                  <div className="absolute top-4 right-4 px-3 py-1.5 bg-card/80 backdrop-blur-md rounded-full border border-border text-xs font-bold">
                    {currentProfile.gym_club}
                  </div>
                )}

                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/90 to-transparent">
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-3xl font-black leading-tight">
                        {currentProfile.name}, {currentProfile.age}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentProfile.gym_club || 'Independent Fighter'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">
                        {currentProfile.experience_level}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/30">
                        {currentProfile.weight_class}
                      </span>
                    </div>

                    {currentProfile.sparring_style && currentProfile.sparring_style.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {currentProfile.sparring_style.slice(0, 3).map((style) => (
                          <span key={style} className="px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground">
                            {style}
                          </span>
                        ))}
                      </div>
                    )}

                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full rounded-full mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/profile/${currentProfile.id}`);
                      }}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6">
            <Button
              size="icon"
              variant="outline"
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-destructive/50 hover:border-destructive hover:bg-destructive/20 active:scale-95 transition-transform"
              onClick={() => handleSwipe('left')}
            >
              <X className="h-7 w-7 sm:h-8 sm:w-8 text-destructive" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-secondary/50 hover:border-secondary hover:bg-secondary/20 active:scale-95 transition-transform"
              onClick={() => handleSwipe('up')}
            >
              <Zap className="h-9 w-9 sm:h-10 sm:w-10 text-secondary" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border-primary/50 hover:border-primary hover:bg-primary/20 active:scale-95 transition-transform"
              onClick={() => handleSwipe('right')}
            >
              <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
      <MatchModal 
        profile={matchedProfile} 
        onClose={() => setMatchedProfile(null)} 
      />
    </div>
  );
};

const Discover = () => (
  <ProtectedRoute>
    <DiscoverContent />
  </ProtectedRoute>
);

export default Discover;
