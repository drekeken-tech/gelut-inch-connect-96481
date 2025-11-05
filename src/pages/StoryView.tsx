import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';

// Import dummy stories (will be shared)
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
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Eko Pratama',
    userAvatar: '🥋',
    mediaUrl: 'https://images.unsplash.com/photo-1583473848882-f9a5bc7fd2ee?w=600&auto=format&fit=crop&q=80',
    mediaType: 'image' as const,
    timestamp: '2 hari lalu',
    viewed: false,
  },
];

const StoryView = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Find the starting index
  const startIndex = dummyStories.findIndex((s) => s.id === storyId);

  useEffect(() => {
    if (!api) return;

    // Set initial slide
    if (startIndex !== -1) {
      api.scrollTo(startIndex);
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, startIndex]);

  const handlePrevious = () => {
    api?.scrollPrev();
  };

  const handleNext = () => {
    if (current === dummyStories.length - 1) {
      navigate('/home');
    } else {
      api?.scrollNext();
    }
  };

  const currentStory = dummyStories[current];

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-primary/20 to-accent/20">
              {currentStory?.userAvatar}
            </div>
            <div>
              <p className="font-semibold text-white">{currentStory?.userName}</p>
              <p className="text-xs text-white/70">{currentStory?.timestamp}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Progress bars */}
        <div className="flex gap-1 mt-4">
          {dummyStories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className={`h-full bg-white rounded-full transition-all duration-300 ${
                  index < current ? 'w-full' : index === current ? 'w-1/2' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Story Content */}
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent className="h-full">
          {dummyStories.map((story) => (
            <CarouselItem key={story.id} className="h-full">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={story.mediaUrl}
                  alt={story.userName}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation areas */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-start pl-4"
        disabled={current === 0}
      >
        {current > 0 && (
          <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </div>
        )}
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-0 bottom-0 w-1/3 z-10 flex items-center justify-end pr-4"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <ChevronRight className="w-6 h-6 text-white" />
        </div>
      </button>
    </div>
  );
};

export default StoryView;
