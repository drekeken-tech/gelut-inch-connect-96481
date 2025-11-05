import { Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const StatusUpdateBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-card border-b border-border">
      <div className="max-w-2xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-xl font-bold">
              🥊
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
          </div>

          {/* Input Field */}
          <button
            onClick={() => navigate('/upload')}
            className="flex-1 bg-muted/50 hover:bg-muted rounded-full px-4 py-2 text-left text-muted-foreground transition-colors"
          >
            Apa yang Anda pikirkan?
          </button>

          {/* Photo Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate('/upload')}
          >
            <Image className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
    </div>
  );
};
