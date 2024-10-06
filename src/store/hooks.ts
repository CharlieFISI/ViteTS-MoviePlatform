import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, signIn, signOut, signUp } from '../store/userSlice';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const error = useSelector((state: RootState) => state.user.error);

  return {
    user,
    isLoading,
    error,
    signUp: (email: string, password: string) =>
      dispatch(signUp({ email, password })),
    signIn: (email: string, password: string) =>
      dispatch(signIn({ email, password })),
    signOut: () => dispatch(signOut()),
    getCurrentUser: () => dispatch(getCurrentUser())
  };
};
