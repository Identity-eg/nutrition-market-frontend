'use server';

import { request } from 'apis/request';
import type {
	TGetCompaniesReturn,
	TCompany,
} from 'features/products/types/company';

export const getCompanies = async (): Promise<TGetCompaniesReturn> => {
	const data = await request({
		url: `/companies`,
		method: 'GET',
	});

	return data;
};

export const getSingleCompany = async ({
	companyId,
}: {
	companyId: string;
}): Promise<TCompany> => {
	const data = await request({
		url: `/companies/${companyId}`,
		method: 'GET',
	});

	return data.company;
};
