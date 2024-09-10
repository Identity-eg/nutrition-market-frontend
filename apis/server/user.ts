import { request } from 'apis/client';
import { TUser } from 'types/user';

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
