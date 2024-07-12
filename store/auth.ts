import { TLoginResponse } from 'apis/server/auth';
import { TUser } from 'types/user';
import { create } from 'zustand';

type TAuthState = {
	accessToken: string | null;
	isAuthenticated: boolean;
	userData: TUser | null;
	authenticateUser: (data: TLoginResponse) => void;
	logUserOut: () => void;
};

export const useAuthStore = create<TAuthState>()(set => ({
	accessToken: null,
	isAuthenticated: false,
	userData: null,
	authenticateUser: (data: TLoginResponse) =>
		set(() => ({
			isAuthenticated: true,
			accessToken: data.accessToken,
			userData: data.user,
		})),
	logUserOut: () =>
		set(() => ({ accessToken: null, isAuthenticated: false, userData: null })),
}));

export const setAccessTokenToStore = (accessToken: string) =>
	useAuthStore.setState({ accessToken });

export const removeAccessTokenFromStore = () =>
	useAuthStore.setState({ accessToken: null });
