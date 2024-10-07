import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  // Accedemos al contexto de autenticación
  const context = useContext(AuthContext);

  // Verificamos si el contexto está disponible
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
