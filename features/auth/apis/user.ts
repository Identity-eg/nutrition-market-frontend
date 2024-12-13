import { request } from 'apis/request';
import type { TUser } from 'features/auth/types/user';

export const getMe = async (): Promise<TUser | undefined> => {
	try {
		const data = await request({
			url: '/users/getMe',
			method: 'GET',
		});
		return data.user;
	} catch (error) {
		return undefined;
	}
};
