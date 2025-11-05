import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import heroImage from '@/assets/hero-splash.jpg';
import logoIcon from '@/assets/logo-icon.png';

const Welcome = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/discover');
    }
  }, [user, loading, navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/95"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 sm:gap-8 px-4 sm:px-6 text-center animate-slide-up">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <img 
            src={logoIcon} 
            alt="Gelut Inch" 
            className="h-20 w-20 sm:h-24 sm:w-24 animate-pulse-glow"
          />
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              GELUT INCH
            </h1>
            <p className="mt-2 text-base sm:text-lg text-muted-foreground font-semibold">
              Find Your Perfect Sparring Partner
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse flex-shrink-0"></div>
            <span>Match dengan fighter di sekitarmu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse delay-75 flex-shrink-0"></div>
            <span>Filter berdasarkan skill & weight class</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse delay-150 flex-shrink-0"></div>
            <span>Chat & atur jadwal sparring</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex w-full flex-col gap-3 mt-4">
          <Button 
            variant="hero" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/auth?mode=signup')}
          >
            Mulai Sekarang
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full"
            onClick={() => navigate('/auth?mode=login')}
          >
            Sudah Punya Akun
          </Button>
        </div>

        <p className="text-xs text-muted-foreground/60">
          Ready to throw punches? Let's match! 🥊
        </p>
      </div>
    </div>
  );
};

export default Welcome;
