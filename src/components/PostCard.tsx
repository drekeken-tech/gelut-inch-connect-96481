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

  return (
    <div className="bg-card border-b border-border p-4 animate-fade-in">
      {/* Author Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-2xl">
            {post.author.avatar}
          </div>
          <div>
            <h3 className="font-bold text-sm">{post.author.name}</h3>
            <p className="text-xs text-muted-foreground">{post.author.gym}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-sm leading-relaxed mb-4">{post.content}</p>

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
    </div>
  );
};
