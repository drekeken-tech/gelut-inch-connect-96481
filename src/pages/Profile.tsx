import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth, ProtectedRoute } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { ProfileCard } from '@/components/ProfileCard';
import { Settings, LogOut, Heart } from 'lucide-react';

// Dummy posts for current user
const userPosts = [
  {
    id: '1',
    content: 'My first sparring session was amazing! Can\'t wait for more.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
    likes: 15,
    timestamp: '3 days ago',
  },
  {
    id: '2',
    content: 'Training montage from this week! 💪 #FitnessGoals',
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&auto=format&fit=crop&q=80',
    likes: 28,
    timestamp: '1 week ago',
  },
];

const ProfileContent = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Profile</h1>
          </div>

          {/* Profile Card */}
          <div className="flex justify-center">
            <ProfileCard
              name={profile?.name || 'Fighter'}
              age={profile?.age}
              gender={profile?.gender}
              gym={profile?.gym_club}
              totalMatches={profile?.total_matches || 0}
              experienceLevel={profile?.experience_level || 'N/A'}
              weightClass={profile?.weight_class || 'N/A'}
              bio={profile?.bio}
              sparringStyles={profile?.sparring_style || []}
              onEdit={() => navigate('/profile-setup')}
              onChallenge={() => {}}
              onMessage={() => {}}
            />
          </div>

          {/* User Posts Section */}
          <div className="space-y-4 pt-6">
            <h2 className="text-xl font-bold">Postingan Saya</h2>
            <div className="grid grid-cols-2 gap-3">
              {userPosts.map((post) => (
                <div key={post.id} className="relative aspect-square rounded-lg overflow-hidden bg-card border border-border group cursor-pointer">
                  <img 
                    src={post.image} 
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center">
                      <Heart className="h-6 w-6 inline-block mb-1" />
                      <p className="text-sm font-semibold">{post.likes} likes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <Button 
              variant="destructive" 
              className="w-full gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

const Profile = () => (
  <ProtectedRoute>
    <ProfileContent />
  </ProtectedRoute>
);

export default Profile;
