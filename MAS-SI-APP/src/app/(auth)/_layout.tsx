import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
const UserAuthStack = () => {
    const { session } = useAuth();

    if  (session ) {
      return <Redirect href={'/(user)'} />;
    }
  
    return <Stack />;
}


export default UserAuthStack