import { StatusUpdateBar } from './StatusUpdateBar';
import { StoryHeader } from './StoryHeader';
import { Story } from './StoryHeader';

interface FacebookHeaderProps {
  stories: Story[];
}

export const FacebookHeader = ({ stories }: FacebookHeaderProps) => {
  return (
    <div className="w-full">
      <StatusUpdateBar />
      <div className="sticky top-0 z-30">
        <StoryHeader stories={stories} />
      </div>
    </div>
  );
};
