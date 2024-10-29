export type TIncludes<T extends Record<string, any>> = Partial<{
	[Key in keyof T]: Extract<
		T[Key] extends Array<Record<string, any>>
			? keyof T[Key][number]
			: keyof T[Key],
		string
	>[];
}>;
