export const ORDER_STATUS = [
	'pending',
	'processing',
	'shipping',
	'delivered',
	'canceled',
] as const;

export const IMAGES_PATHS = {
	hero: 'hero',
} as const;

export const SORT_OPTIONS = [
	{
		label: 'best selling',
		value: '-sold',
	},
	{
		label: 'best customer rating',
		value: '-averageRating',
	},
	{
		label: 'Alphabetically, A-Z',
		value: 'name',
	},
	{
		label: 'Alphabetically, Z-A',
		value: '-name',
	},
	{
		label: 'Price, Low To High',
		value: 'price',
	},
	{
		label: 'Price, High To Low',
		value: '-price',
	},
	{
		label: 'Date, New To Old',
		value: '-createdAt',
	},
	{
		label: 'Date, Old To New',
		value: 'createdAt',
	},
];
