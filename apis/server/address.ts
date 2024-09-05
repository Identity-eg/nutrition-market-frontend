'use server';

import { actionClient } from 'apis/action-clients';
import { request } from 'apis/client';
import { TAddress } from 'types/address';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';
import { Tags } from 'types/tags';

const addAddressSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	phone: z.number(),
	additionalPhone: z.number(),
	governorate: z.string(),
	district: z.string(),
	street: z.string(),
	buildingNo: z.string(),
	floor: z.string(),
});

export const getUserAddresses = async (): Promise<TAddress[]> => {
	const data = await request({
		url: '/users/address',
		method: 'GET',
		next: { tags: [Tags.addresses] },
	});
	return data.addresses;
};

export const addAddress = actionClient.schema(addAddressSchema).action(
	async ({ parsedInput: addressData }) => {
		const data = await request({
			url: '/users/address',
			body: {
				...addressData,
			},
			method: 'POST',
		});
		return data;
	},
	{ onSettled: () => revalidateTag(Tags.addresses) }
);
