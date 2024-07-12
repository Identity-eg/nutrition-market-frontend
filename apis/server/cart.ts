import { request } from '../client';

export const getCart = async () => {
	try {
		const data = await request({
			url: '/carts',
			method: 'GET',
		});
		return data;
	} catch (err) {
		return { err: (err as Error).message };
	}
};
