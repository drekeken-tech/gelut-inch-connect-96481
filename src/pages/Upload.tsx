import { useState } from 'react';
import { ProtectedRoute } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Image, Video, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const UploadContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handlePost = () => {
    if (!content.trim() && !selectedFile) {
      toast({
        title: 'Error',
        description: 'Please add some content or media to your post',
        variant: 'destructive',
      });
      return;
    }

    // TODO: Implement actual post creation
    toast({
      title: 'Post Created!',
      description: 'Your post has been shared with the community',
    });
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-background safe-area-inset">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-black">Create Post</h1>
        </div>
        <Button size="sm" className="rounded-full" onClick={handlePost}>
          Post
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-2xl">
            🥊
          </div>
          <div>
            <h3 className="font-bold text-sm">You</h3>
            <p className="text-xs text-muted-foreground">Posting to Fighter Community</p>
          </div>
        </div>

        {/* Text Input */}
        <Textarea
          placeholder="What's on your mind? Share your training progress, challenges, or tips..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] text-base resize-none border-0 focus-visible:ring-0 p-0"
        />

        {/* Preview */}
        {previewUrl && (
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full max-h-[400px] object-cover"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 rounded-full h-8 w-8"
              onClick={handleRemoveFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Media Upload Buttons */}
        <div className="flex gap-3 p-4 border border-border rounded-2xl">
          <label className="flex-1">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2 rounded-full"
              asChild
            >
              <span>
                <Image className="h-4 w-4" />
                Photo
              </span>
            </Button>
          </label>

          <label className="flex-1">
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2 rounded-full"
              asChild
            >
              <span>
                <Video className="h-4 w-4" />
                Video
              </span>
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
};

const Upload = () => (
  <ProtectedRoute>
    <UploadContent />
  </ProtectedRoute>
);

export default Upload;
