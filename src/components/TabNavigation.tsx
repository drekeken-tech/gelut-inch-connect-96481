import { cn } from '@/lib/utils';

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const TabNavigation = ({ tabs, activeTab, onTabChange, className }: TabNavigationProps) => {
  return (
    <div className={cn("flex gap-1 p-1 bg-muted/30 rounded-full w-fit", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
            activeTab === tab
              ? "bg-primary text-primary-foreground shadow-button"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
