import { useMutation } from '@tanstack/react-query';

import {
	forgotPassword,
	login,
	logout,
	register,
	resetPassword,
} from 'apis/server/auth';

// ######################## Login ############################
export function useLogin() {
	return useMutation({ mutationFn: login });
}

// ######################## Register ############################
export function useRegister() {
	return useMutation({ mutationFn: register });
}

// ######################## LogOut ############################
export function useLogout() {
	return useMutation({
		mutationFn: logout,
	});
}

// ##################### FORGOT PASSWORD #######################
export function useForgotPassword() {
	return useMutation({ mutationFn: forgotPassword });
}

// ##################### RESET PASSWORD #######################

export function useResetPassword() {
	return useMutation({ mutationFn: resetPassword });
}

