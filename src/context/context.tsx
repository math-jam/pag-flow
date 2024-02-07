// context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  data: any[];
  prevData: any[];
}

interface AppContextProps {
  state: AppState;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<AppState>>;
}

const initialState: AppState = {
  data: [],
  prevData: [],
};

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ state, loading, setLoading, setData: setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useDataContext deve ser usado dentro de um DataProvider');
  }
  return context;
};
