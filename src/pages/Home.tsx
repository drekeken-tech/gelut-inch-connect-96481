import { useState } from 'react';
import { ProtectedRoute } from '@/hooks/useAuth';
import { BottomNav } from '@/components/BottomNav';
import { PostCard } from '@/components/PostCard';
import { FacebookHeader } from '@/components/FacebookHeader';
import { useNavigate } from 'react-router-dom';

// Dummy stories data
const dummyStories = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Ahmad Saputra',
    userAvatar: '🥊',
    mediaUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image' as const,
    timestamp: '2 jam lalu',
    viewed: false,
    unreadCount: 3,
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Budi Santoso',
    userAvatar: '🥋',
    mediaUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image' as const,
    timestamp: '5 jam lalu',
    viewed: false,
    unreadCount: 2,
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Siti Rahman',
    userAvatar: '🥊',
    mediaUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image' as const,
    timestamp: '1 hari lalu',
    viewed: false,
    unreadCount: 1,
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Eko Pratama',
    userAvatar: '🥋',
    mediaUrl: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image' as const,
    timestamp: '2 hari lalu',
    viewed: true,
  },
];

// Dummy posts data
const dummyPosts = [
  {
    id: '1',
    author: {
      name: 'Ahmad Saputra',
      avatar: '🥊',
      gym: 'Beast Mode Gym',
    },
    content: 'Just finished an intense sparring session! Looking for more partners to practice with. Who\'s up for a challenge?',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop&q=80',
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: '2 hours ago',
    userId: 'user1',
  },
  {
    id: '2',
    author: {
      name: 'Budi Santoso',
      avatar: '🥋',
      gym: 'Dragon Warrior Dojo',
    },
    content: 'Training hard for the upcoming tournament! 💪 Remember: technique over power, always.',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&auto=format&fit=crop&q=80',
    likes: 45,
    comments: 12,
    shares: 7,
    timestamp: '5 hours ago',
    userId: 'user2',
  },
  {
    id: '3',
    author: {
      name: 'Siti Rahman',
      avatar: '🥊',
      gym: 'Elite Fight Club',
    },
    content: 'New personal record today! 100 consecutive jabs without breaking form. Consistency is key! 🔥',
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=600&auto=format&fit=crop&q=80',
    likes: 67,
    comments: 15,
    shares: 10,
    timestamp: '1 day ago',
    userId: 'user3',
  },
  {
    id: '4',
    author: {
      name: 'Eko Pratama',
      avatar: '🥋',
      gym: 'Thunder Kickboxing',
    },
    content: 'Anyone want to spar this weekend? I\'m free Saturday morning. Let\'s train together and push our limits!',
    image: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=600&auto=format&fit=crop&q=80',
    likes: 31,
    comments: 9,
    shares: 4,
    timestamp: '2 days ago',
    userId: 'user4',
  },
];

const HomeContent = () => {
  const [posts] = useState(dummyPosts);

  return (
    <div className="flex min-h-screen flex-col safe-area-inset bg-background">
      {/* Facebook-Style Header */}
      <FacebookHeader stories={dummyStories} />

      {/* Feed */}
      <div className="flex-1 pb-24">
        <div className="mx-auto max-w-2xl">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

const Home = () => (
  <ProtectedRoute>
    <HomeContent />
  </ProtectedRoute>
);

export default Home;
