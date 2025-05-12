import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  rol: string | null;
  setToken: (token: string | null) => void;
  setRol: (rol: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token'); // bijv. initialiseren vanuit localStorage
  });
  const [rol, setRol] = useState<string | null>(() => {
    console.log('Storage: ', localStorage.getItem('rol'));
    return localStorage.getItem('rol');
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    if (rol) {
      localStorage.setItem('rol', rol);
    } else {
      localStorage.removeItem('rol');
    }
  }, [token, rol]);
  console.log('AuthContext rol:', rol);
  return (
    <AuthContext.Provider value={{ token, rol, setToken, setRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};