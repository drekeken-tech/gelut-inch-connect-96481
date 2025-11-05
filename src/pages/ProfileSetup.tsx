import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, ProtectedRoute } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Checkbox } from '@/components/ui/checkbox';

const ProfileSetupContent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    gym_club: '',
    experience_level: '',
    weight_class: '',
    bio: '',
    sparring_style: [] as string[],
  });

  const sparringStyles = [
    { id: 'light', label: 'Light Sparring' },
    { id: 'technical', label: 'Technical' },
    { id: 'full-contact', label: 'Full Contact' },
  ];

  const handleStyleToggle = (styleId: string) => {
    setFormData(prev => ({
      ...prev,
      sparring_style: prev.sparring_style.includes(styleId)
        ? prev.sparring_style.filter(s => s !== styleId)
        : [...prev.sparring_style, styleId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({
          name: formData.name,
          age: parseInt(formData.age),
          gender: formData.gender,
          gym_club: formData.gym_club,
          experience_level: formData.experience_level,
          weight_class: formData.weight_class,
          bio: formData.bio,
          sparring_style: formData.sparring_style,
          available: true,
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: 'Profil berhasil disimpan!',
        description: 'Sekarang Anda bisa mulai mencari sparring partner.',
      });
      navigate('/discover');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Gagal menyimpan profil',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 pb-24">
      <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Setup Profile</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Lengkapi profil Anda untuk mulai mencari sparring partner
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-11 sm:h-12"
                placeholder="Mike Tyson"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Umur *</Label>
                <Input
                  id="age"
                  type="number"
                  min="16"
                  max="70"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  className="h-11 sm:h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  required
                >
                  <SelectTrigger className="h-11 sm:h-12">
                    <SelectValue placeholder="Pilih gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Pria</SelectItem>
                    <SelectItem value="female">Wanita</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gym_club">Gym / Club</Label>
              <Input
                id="gym_club"
                value={formData.gym_club}
                onChange={(e) => setFormData({ ...formData, gym_club: e.target.value })}
                className="h-11 sm:h-12"
                placeholder="Champion Boxing Gym"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="experience_level">Level Pengalaman *</Label>
                <Select
                  value={formData.experience_level}
                  onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
                  required
                >
                  <SelectTrigger className="h-11 sm:h-12">
                    <SelectValue placeholder="Pilih level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="pro">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight_class">Weight Class *</Label>
                <Select
                  value={formData.weight_class}
                  onValueChange={(value) => setFormData({ ...formData, weight_class: value })}
                  required
                >
                  <SelectTrigger className="h-11 sm:h-12">
                    <SelectValue placeholder="Pilih kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flyweight">Flyweight (&lt;52kg)</SelectItem>
                    <SelectItem value="bantamweight">Bantamweight (52-55kg)</SelectItem>
                    <SelectItem value="featherweight">Featherweight (55-59kg)</SelectItem>
                    <SelectItem value="lightweight">Lightweight (59-64kg)</SelectItem>
                    <SelectItem value="welterweight">Welterweight (64-69kg)</SelectItem>
                    <SelectItem value="middleweight">Middleweight (69-76kg)</SelectItem>
                    <SelectItem value="light-heavyweight">Light Heavyweight (76-85kg)</SelectItem>
                    <SelectItem value="heavyweight">Heavyweight (&gt;85kg)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Sparring Style *</Label>
              <div className="flex flex-col gap-3">
                {sparringStyles.map((style) => (
                  <div key={style.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={style.id}
                      checked={formData.sparring_style.includes(style.id)}
                      onCheckedChange={() => handleStyleToggle(style.id)}
                    />
                    <label
                      htmlFor={style.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {style.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Ceritakan sedikit tentang diri Anda dan pengalaman sparring..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            variant="hero" 
            size="lg" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Mulai Cari Partner'}
          </Button>
        </form>
      </div>
    </div>
  );
};

const ProfileSetup = () => (
  <ProtectedRoute>
    <ProfileSetupContent />
  </ProtectedRoute>
);

export default ProfileSetup;
