'use server';

import { request } from "apis/client";
import { GetCompaniesReturnType } from "types/company";

export const getCompanies = async (): Promise<GetCompaniesReturnType> => {
	const data = await request({
		url: `/companies`,
		method: 'GET',
	});

	return data;
};