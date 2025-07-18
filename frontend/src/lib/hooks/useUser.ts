import { useEffect, useState } from 'react';
import { STORAGE } from '@/lib/cookies';
import useAuth from '@/lib/hooks/useAuth';

const defaultUser: User = {
  id: '',
  name: '',
  email: '',
  password: '',
  role: '',
  createdAt: new Date(Date.now()).toISOString(),
  updatedAt: new Date(Date.now()).toISOString(),
};

export default function useUser() {
  const [user, setUser] = useState<User>(defaultUser);
  const { authenticated } = useAuth();

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem(STORAGE.USER) ?? '{}'));
  }, [authenticated]);

  return user;
}
