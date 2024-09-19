import { supabase } from '@/src/lib/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthData = {
    session: Session | null;
    profile: any;
    loading: boolean;
  };
  
  const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
  });

  export default function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchSession = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
  
        setSession(session);
  
        setLoading(false);
      };
  
      fetchSession();
      supabase.auth.onAuthStateChange((event, session) => {
        fetchSession()
      });
    }, []);
  
    return (
      <AuthContext.Provider
        value={{ session, loading, profile }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export const useAuth = () => useContext(AuthContext);
