'use Client';

import React, {
  ReactNode, createContext, useContext, useEffect, useState,
} from 'react';
import authApi from '@shared/api/authentication/authenticationApi';
import { type UserType } from '@shared/api/authentication/schemas';
import QueryHandler from '@shared/components/common/queryHandler/queryHandler';
import { queryClient } from '@shared/api/cavagoReactQueryProvider';
import { getToken } from '@shared/api/utils';
import Animations from '@shared/components/common/animations';
import { useRouter } from 'next/navigation';
import { Modal } from 'antd';

interface AuthenticationContextProps {
  user: UserType | undefined,
  isLoggedIn: boolean,
  onLogout: () => void;
  onLogin: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextProps | null>(null);

export function useAuthenticationContext() {
  const ctx = useContext(AuthenticationContext);

  if (!ctx) {
    throw new Error('to use auth hook wrap the parent with AuthenticationContextProvider');
  }

  return ctx;
}

export function AuthenticationContextProvider({ children }:
  { children: ReactNode }) {
  const initialState = {
    user: undefined,
    isLoggedIn: !!getToken(),
    onLogout,
    onLogin,
  };
  const [state, setState] = useState<AuthenticationContextProps>(initialState);
  const userQuery = authApi.getUser.useQuery(undefined, { enabled: state.isLoggedIn });
  const [isClient, setIsClient] = useState(false);
  const nav = useRouter();

  function onLogout() {
    localStorage.clear();
    setState((s) => ({ ...s, isLoggedIn: false }));
    userQuery.remove();
    queryClient.invalidateQueries();
    nav.push('/');
  }

  function onLogin() {
    setState((s) => ({ ...s, isLoggedIn: true }));
    queryClient.clear();
  }

  function set<Key extends keyof AuthenticationContextProps>(k: Key, v: AuthenticationContextProps[Key]) {
    setState((value: any) => ({ ...value, [k]: v }));
  }

  useEffect(() => {
    set('user', userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Animations name="cavagoLoader" style={{ width: 100, height: 100 }} />;
  }

  return (
    <QueryHandler
      queries={state.isLoggedIn ? [userQuery] : []}
      retryLabel="Logout"
      onRetry={onLogout}
    >
      <AuthenticationContext.Provider value={state}>
        {children}
      </AuthenticationContext.Provider>
    </QueryHandler>
  );
}

export function withAuth(WrappedComponent: React.ComponentType) {
  function Alert() {
    const nav = useRouter();

    return (
      <Modal open closable={false} cancelText="Back Home" okText="Login" onCancel={() => nav.push('/')} onOk={() => nav.push(`/authentication?next=${window.location.href}&query=true`)}>
        Please login to see this content
      </Modal>
    );
  }

  return function () {
    const auth = useAuthenticationContext();
    if (auth.isLoggedIn) {
      return <WrappedComponent />;
    }

    return (
      <Alert />
    );
  };
}
