import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Award, Scale, Flame, Target } from 'lucide-react';
import { StatCard } from '@/components/StatCard';

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

const ProfileDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      navigate('/discover');
    } finally {
      setLoading(false);
    }
  };

  const handleChallenge = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !profile) return;

      const { error } = await (supabase as any)
        .from('swipes')
        .insert({
          swiper_id: user.id,
          swiped_id: profile.id,
          direction: 'right',
        });

      if (error) throw error;

      toast({
        title: 'Challenge Sent!',
        description: 'Waiting for response...',
      });
      navigate('/discover');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] max-h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <div className="text-8xl">🥊</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        
        {/* Back Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {/* Gym Badge */}
        {profile.gym_club && (
          <div className="absolute top-4 right-4 px-4 py-2 bg-card/80 backdrop-blur-md rounded-full border border-border text-xs font-semibold">
            {profile.gym_club}
          </div>
        )}

        {/* Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-4xl font-black text-foreground mb-2">
            {profile.name}, {profile.age}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 pb-32">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Award}
            label="Experience"
            value={profile.experience_level}
          />
          <StatCard
            icon={Scale}
            label="Weight Class"
            value={profile.weight_class}
          />
          <StatCard
            icon={Flame}
            label="Total Matches"
            value="12"
          />
          <StatCard
            icon={Target}
            label="Win Rate"
            value="75%"
          />
        </div>

        {/* Bio Section */}
        {profile.bio && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Sparring Styles */}
        {profile.sparring_style && profile.sparring_style.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold">Sparring Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {profile.sparring_style.map((style) => (
                <span
                  key={style}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/30 text-sm font-semibold"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-6 left-0 right-0 px-6 flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 rounded-full"
          onClick={() => navigate(-1)}
        >
          Pass
        </Button>
        <Button
          size="lg"
          className="flex-1 rounded-full"
          onClick={handleChallenge}
        >
          Challenge Now
        </Button>
      </div>
    </div>
  );
};

const ProfileDetail = () => (
  <ProtectedRoute>
    <ProfileDetailContent />
  </ProtectedRoute>
);

export default ProfileDetail;
