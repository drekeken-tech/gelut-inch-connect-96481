// Check if Supabase environment variables are loaded
export const checkSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase configuration missing!', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      env: import.meta.env.MODE
    });
    return false;
  }
  
  console.log('✅ Supabase configuration loaded');
  return true;
};
