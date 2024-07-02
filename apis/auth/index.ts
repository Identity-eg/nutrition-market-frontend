import { useMutation, useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import { request } from '../client';
import { useAuthStore } from '@/store/auth';
import { TUser } from '@/types/apis';

// ######################## Login ############################
export type TLoginResponse = {
  accessToken: string;
  user: TUser;
};

const login = async (user: { email: string; password: string }): Promise<TLoginResponse> => {
  const { data } = await request({
    url: '/auth/login',
    method: 'POST',
    data: user,
  });
  return data;
};

export function useLogin() {
  return useMutation({ mutationFn: login });
}

// ######################## Register ############################
const register = async (user: { name: string; email: string; password: string }): Promise<TLoginResponse> => {
  const { data } = await request({
    url: '/auth/register',
    method: 'POST',
    data: user,
  });
  return data;
};

export function useRegister() {
  return useMutation({ mutationFn: register });
}

// ######################## Refresh Token #####################
export const refreshAccessTokenFn = async () => {
  const { data } = await request({ url: 'auth/refresh', method: 'GET' });
  if (data) {
    const user = jwtDecode<TUser>(data.accessToken);
    useAuthStore.getState().authenticateUser({
      accessToken: data.accessToken,
      user,
    });
  }
  return data;
};

// ######################## LogOut ############################
const logout = async () => {
  const { data } = await request({ url: '/auth/logout' });
  return data;
};

export function useLogout() {
  const logOutUser = useAuthStore(state => state.logUserOut);
  return useMutation({
    mutationFn: logout,
    onSuccess: logOutUser,
  });
}

// ##################### FORGOT PASSWORD #######################
type TForgotPasswordResponse = {
  message: string;
};

const forgotPassword = async ({ email }: { email: string }): Promise<TForgotPasswordResponse> => {
  const { data } = await request({
    url: '/auth/forgot-password',
    method: 'POST',
    data: { email },
  });
  return data;
};

export function useForgotPassword() {
  return useMutation({ mutationFn: forgotPassword });
}

// ##################### RESET PASSWORD #######################
type TResetPasswordResponse = {
  message: string;
};

const resetPassword = async ({
  password,
  confirmPassword,
  token,
}: {
  password: string;
  confirmPassword: string;
  token: string;
}): Promise<TResetPasswordResponse> => {
  const { data } = await request({
    url: `/auth/reset-password/${token}`,
    method: 'POST',
    data: { password, confirmPassword },
  });
  return data;
};

export function useResetPassword() {
  return useMutation({ mutationFn: resetPassword });
}
