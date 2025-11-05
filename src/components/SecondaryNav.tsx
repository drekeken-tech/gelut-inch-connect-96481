import { Home, UserPlus, MessageCircle, Video, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useLocation } from 'react-router-dom';

export const SecondaryNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/', label: 'Home', badge: null },
    { icon: UserPlus, path: '/discover', label: 'Friends', badge: 5 },
    { icon: MessageCircle, path: '/chat', label: 'Messages', badge: 3 },
    { icon: Video, path: '/matches', label: 'Videos', badge: null },
    { icon: Bell, path: '/profile', label: 'Notifications', badge: 12 },
    { icon: Menu, path: '/menu', label: 'Menu', badge: null },
  ];

  return (
    <div className="w-full bg-card/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Button
              key={item.path}
              variant="ghost"
              size="icon"
              className={`relative rounded-lg h-12 w-12 sm:w-16 ${
                isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
              onClick={() => navigate(item.path)}
            >
              <Icon className="h-6 w-6" />
              {item.badge && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 min-w-[20px] flex items-center justify-center p-0 px-1 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
