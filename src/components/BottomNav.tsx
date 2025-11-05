import { Home, MessageCircle, User, Flame } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Flame, label: 'Discover', path: '/discover' },
    { icon: MessageCircle, label: 'Matches', path: '/matches' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom px-4 pb-4">
      <div className="mx-auto max-w-md bg-card/95 backdrop-blur-lg border border-border rounded-[30px] shadow-[5px_5px_10px_rgba(0,0,0,0.2)] p-2">
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  'flex items-center gap-2 transition-all duration-500 rounded-[30px] px-3 py-2 min-w-[70px] justify-center font-semibold text-sm',
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-[5px_5px_10px_rgba(0,0,0,0.116)]' 
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className={cn(
                  'h-[25px] w-[25px] transition-transform duration-[1.5s]',
                  isActive && 'rotate-[250deg]'
                )} />
                {isActive && <span className="text-xs">{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
