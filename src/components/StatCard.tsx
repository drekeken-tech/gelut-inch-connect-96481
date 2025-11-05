import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export const StatCard = ({ icon: Icon, label, value, className }: StatCardProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-4 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm",
      className
    )}>
      <Icon className="h-6 w-6 text-primary mb-2" />
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
};
