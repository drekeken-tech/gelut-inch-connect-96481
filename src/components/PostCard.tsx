import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Swords } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    gym: string;
  };
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  userId: string;
}

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const MAX_CAPTION_LENGTH = 150;
  const needsTruncation = post.content.length > MAX_CAPTION_LENGTH;

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleChallenge = () => {
    navigate(`/profile/${post.userId}`);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${post.userId}`);
  };

  return (
    <div className="bg-card border-b border-border p-4 animate-fade-in">
      {/* Author Header */}
      <div className="flex items-start justify-between mb-3">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <h3 className="font-bold text-sm hover:underline">{post.author.name}</h3>
            <p className="text-xs text-muted-foreground">{post.author.gym}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="text-sm leading-relaxed mb-4">
        {needsTruncation && !showFullCaption ? (
          <>
            {post.content.slice(0, MAX_CAPTION_LENGTH)}...{' '}
            <button
              onClick={() => setShowFullCaption(true)}
              className="text-primary font-semibold hover:underline"
            >
              lihat selengkapnya
            </button>
          </>
        ) : (
          post.content
        )}
      </div>

      {/* Post Image (if exists) */}
      {post.image && (
        <div className="mb-4 rounded-xl overflow-hidden">
          <img src={post.image} alt="Post" className="w-full" />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3 pb-3 border-b border-border/50">
        <span>{likeCount} likes</span>
        <span>{post.comments} comments</span>
        <span>{post.shares} shares</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-3">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex-1 gap-2 rounded-full",
            liked && "text-primary"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("h-4 w-4", liked && "fill-primary")} />
          <span className="text-xs font-semibold">Like</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 gap-2 rounded-full"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs font-semibold">Comment</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 gap-2 rounded-full"
        >
          <Share2 className="h-4 w-4" />
          <span className="text-xs font-semibold">Share</span>
        </Button>
      </div>

      {/* Challenge Button */}
      <Button
        size="sm"
        className="w-full rounded-full gap-2"
        onClick={handleChallenge}
      >
        <Swords className="h-4 w-4" />
        Ajak Gelut Orang Ini
      </Button>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
          <div className="flex gap-2">
            <img 
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
              alt="Your avatar"
              className="h-8 w-8 rounded-full object-cover"
            />
            <input
              type="text"
              placeholder="Tulis komentar..."
              className="flex-1 bg-muted/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex gap-2">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                alt="Commenter"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-xs">Dedi Kurniawan</p>
                <p className="text-muted-foreground">Mantap bro! Keep up the good work 💪</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
