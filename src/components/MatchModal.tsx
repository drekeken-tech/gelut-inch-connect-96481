import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MatchModalProps {
  profile: any;
  onClose: () => void;
}

export const MatchModal = ({ profile, onClose }: MatchModalProps) => {
  const navigate = useNavigate();

  if (!profile) return null;

  return (
    <Dialog open={!!profile} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-3xl border-2 border-primary/50 bg-gradient-to-b from-card to-background">
        <div className="flex flex-col items-center gap-6 py-6 text-center">
          {/* Animation */}
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/30"></div>
            <div className="relative text-8xl animate-pulse-glow">🔥</div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              SPARING MATCH!
            </h2>
            <p className="text-muted-foreground">
              Kamu dan <span className="font-bold text-foreground">{profile.name}</span> saling suka!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-3">
            <Button
              variant="hero"
              size="lg"
              onClick={() => {
                navigate('/matches');
                onClose();
              }}
            >
              Mulai Chat
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onClose}
            >
              Lanjut Swipe
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
