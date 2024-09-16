import { TProduct } from 'types/product';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from 'components/ui/table';

export function NutritionFacts({
	nutritionFacts,
}: {
	nutritionFacts: TProduct['nutritionFacts'];
}) {
	const mapperName = {
		amountPerServing: 'Amount Per Serving',
		dailyValue: 'Daily value (%)',
	};

	const ingColumns = Object.keys(nutritionFacts.ingredients[0]);

	return (
		<div>
			<p className='mb-4 typography-B18'>Nutrition Facts</p>
			<table className='w-full'>
				<tbody className='[&>*:nth-child(odd)]:bg-gray-20'>
					<tr className='border border-x-0 border-gray-50'>
						{ingColumns
							.filter(col => col !== '_id')
							.map(key => (
								<th
									key={key}
									className='p-1 text-start'>
									{mapperName[key as keyof typeof mapperName]}
								</th>
							))}
					</tr>
					{nutritionFacts.ingredients.map(ing => {
						return (
							<tr
								className='border border-x-0 border-gray-50'
								key={ing.name}>
								{Object.entries(ing)
									.filter(([col]) => col !== '_id')
									.map(([_, value]) => (
										<td
											className='p-2 typography-R14'
											key={value}>
											{value}
										</td>
									))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
		// <>
		// 	<p className='mb-4 typography-B18'>Nutrition Facts</p>
		// 	<Table>
		// 		<TableHeader>
		// 			<TableRow className='border-gray-50'>
		// 				<TableHead className=''></TableHead>
		// 				<TableHead className="typography-B18">Amount Per Serving</TableHead>
		// 				<TableHead className="typography-B18">Daily Value (%)</TableHead>
		// 			</TableRow>
		// 		</TableHeader>
		// 		<TableBody>
		// 			{nutritionFacts.ingredients.map(ing => (
		// 				<TableRow className='border-gray-50'>
		// 					<TableCell className='font-medium'>{ing.name}</TableCell>
		// 					<TableCell>{ing.amountPerServing}</TableCell>
		// 					<TableCell>{ing.dailyValue}</TableCell>
		// 				</TableRow>
		// 			))}
		// 		</TableBody>
		// 	</Table>
		// </>
	);
}

// <Table>
//   <TableCaption>Nutrition Facts</TableCaption>
//   <TableHeader>
//     <TableRow>
//       <TableHead className="w-[100px]">Invoice</TableHead>
//       <TableHead>Status</TableHead>
//       <TableHead>Method</TableHead>
//       <TableHead className="text-right">Amount</TableHead>
//     </TableRow>
//   </TableHeader>
//   <TableBody>
//     <TableRow>
//       <TableCell className="font-medium">INV001</TableCell>
//       <TableCell>Paid</TableCell>
//       <TableCell>Credit Card</TableCell>
//       <TableCell className="text-right">$250.00</TableCell>
//     </TableRow>
//   </TableBody>
// </Table>
