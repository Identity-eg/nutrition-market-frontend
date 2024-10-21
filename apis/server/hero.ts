import { request } from 'apis/client';
import { TImage, TPath } from 'types/image';

type GetImagesReturnType = {
	images: TImage[];
};

export const getHeroImages = async ({
	path,
}: {
	path: TPath;
}): Promise<GetImagesReturnType> => {
	const data = await request({
		url: `/images`,
		query: { path },
	});

	return data;
};
