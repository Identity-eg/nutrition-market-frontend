import { request } from 'apis/client';
import { TUser } from 'types/user';

export const getMe = async (): Promise<TUser> => {
	const data = await request({
		url: '/users/getMe',
		method: 'GET',
	});
	return data.user;
};
