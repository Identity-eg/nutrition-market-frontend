'use server';

import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { flattenValidationErrors } from 'next-safe-action';
import { actionClient } from 'apis/action-clients';
import { request } from 'apis/request';
import type { TAddress } from 'features/addresses/types/address';
import { TTags } from 'constants/revalidate-tags';

export const getUserAddresses = async (): Promise<TAddress[]> => {
	const data = await request({
		url: '/addresses',
		method: 'GET',
		next: { tags: [TTags.addresses] },
	});
	return data.addresses;
};

const addAddressSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	phone: z.coerce.number({
		invalid_type_error: 'Phone is required',
	}),
	additionalPhone: z.coerce.number({
		invalid_type_error: 'Additional phone is required',
	}),
	governorate: z.string().min(1, 'Governorate is required'),
	city: z.string().min(1, 'City is required'),
	street: z.string().min(1, 'Street is required'),
	buildingNo: z.string().min(1, 'Building number is required'),
	floor: z.string().optional(),
});

export const addAddress = actionClient
	.metadata({ actionName: 'add-address-action' })
	.schema(addAddressSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action<{ address: TAddress }>(
		async ({ parsedInput: addressData }) => {
			const data = await request({
				url: '/addresses',
				body: {
					...addressData,
				},
				method: 'POST',
			});
			return data;
		},
		{ onSettled: async () => revalidateTag(TTags.addresses) }
	);

const updateAddressSchema = z
	.object({
		firstName: z.string(),
		lastName: z.string(),
		email: z.string().email('Please enter a valid email address'),
		phone: z.coerce.number(),
		additionalPhone: z.coerce.number(),
		governorate: z.string(),
		city: z.string(),
		street: z.string(),
		buildingNo: z.string(),
		floor: z.string(),
	})
	.partial()
	.extend({ addressId: z.string().min(1, 'Please provide address id') });
export const updateAddress = actionClient
	.metadata({ actionName: 'update-address-action' })
	.schema(updateAddressSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { addressId, ...addressDate } }) => {
			const data = await request({
				url: `/addresses/${addressId}`,
				body: {
					...addressDate,
				},
				method: 'PATCH',
			});
			return data;
		},
		{ onSettled: async () => revalidateTag(TTags.addresses) }
	);
