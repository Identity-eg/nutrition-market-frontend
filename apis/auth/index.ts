import { useMutation } from '@tanstack/react-query';

import { forgotPassword, resetPassword } from 'features/auth/apis/auth';

// ##################### FORGOT PASSWORD #######################
export function useForgotPassword() {
	return useMutation({ mutationFn: forgotPassword });
}

// ##################### RESET PASSWORD #######################

export function useResetPassword() {
	return useMutation({ mutationFn: resetPassword });
}
