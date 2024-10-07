import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ToastProvider } from './components/ui/toast';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes';
import { store } from './store/store';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ToastProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </ToastProvider>
  );
};
