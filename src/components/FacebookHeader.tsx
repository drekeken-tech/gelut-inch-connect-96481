import { Button } from '@/components/ui/button';
import { Plus, Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Story } from './StoryHeader';

interface FacebookHeaderProps {
  stories: Story[];
}

export const FacebookHeader = ({ stories }: FacebookHeaderProps) => {
  const navigate = useNavigate();

  const handleStoryClick = (storyId: string) => {
    navigate(`/story/${storyId}`);
  };

  return (
    <div className="w-full bg-card">
      {/* Sticky Top Bar with Logo and Actions */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl">🥊</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block">GELUT INCH</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
              onClick={() => navigate('/upload')}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stories Section - Scrollable */}
      <div className="overflow-x-auto hide-scrollbar bg-card/95 backdrop-blur-lg border-b border-border">
        <div className="flex gap-3 p-4 min-w-max">
          {/* Create Story Card */}
          <button
            onClick={() => navigate('/upload')}
            className="relative w-[120px] h-[200px] rounded-2xl overflow-hidden group flex-shrink-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:scale-105 transition-transform duration-300">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-lg">
                +
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-card/90 backdrop-blur-sm p-3 border-t border-border">
                <span className="text-xs font-semibold text-foreground block text-center">Buat Cerita</span>
              </div>
            </div>
          </button>

          {/* Stories */}
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => handleStoryClick(story.id)}
              className={`relative w-[120px] h-[200px] rounded-2xl overflow-hidden group flex-shrink-0 ${
                story.viewed ? 'ring-2 ring-border' : 'ring-3 ring-primary'
              }`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundImage: `url(${story.mediaUrl})` }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Unread Badge */}
              {!story.viewed && story.unreadCount && story.unreadCount > 0 && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg">
                  {story.unreadCount}
                </div>
              )}
              
              {/* User Avatar */}
              <div className={`absolute top-2 left-2 w-10 h-10 rounded-full flex items-center justify-center ${
                story.viewed ? 'ring-2 ring-border' : 'ring-3 ring-primary'
              }`}>
                <img 
                  src={story.userAvatar}
                  alt={story.userName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              {/* User Name */}
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-white font-semibold text-sm drop-shadow-lg line-clamp-2">
                  {story.userName}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
