'use server';

import { request } from 'apis/client';
import { GetCompaniesReturnType, TCompany } from 'types/company';

export const getCompanies = async (): Promise<GetCompaniesReturnType> => {
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
