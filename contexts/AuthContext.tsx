import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  token: string | null;

  loading: boolean;

  login: (
    token: string
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadToken =
      async () => {
        const saved =
          await SecureStore.getItemAsync(
            "token"
          );

        setToken(saved);

        setLoading(false);
      };

    void loadToken();
  }, []);

  const login = async (
    newToken: string
  ) => {
    await SecureStore.setItemAsync(
      "token",
      newToken
    );

    setToken(newToken);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(
      "token"
    );

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de AuthProvider"
    );
  }

  return context;
};
